import React from 'react';
import FlightItem from './FlightItem'
import HotelItem from './HotelItem'
import ActivityItem from './ActivityItem'
import { editBool, getEdit } from './Helper/HelperMethods'
import Loading from './Loading'

class Itinerary extends React.Component {
  state = {
    trip: null
  }

  componentDidMount() {
    let tripID = window.sessionStorage.getItem('tripID')
    // if (this.state.trip && this.state.trip.id == tripID) {
    //   console.log("TRIP IS FINE. TRIP:")
    //   console.log(this.state.trip)
    //   return
    // } else {
      fetch(`http://localhost:3000/trips/${tripID}`)
      .then(resp => resp.json())
      .then(trip => {
        window.sessionStorage.setItem('trip',JSON.stringify(trip))
        this.setState({ trip: trip })
        console.log("HEY HAD TO REPLACE TRIP:")
        console.log(trip)
      })
    // }
  }
  
  render() {
    if (this.state.trip) {
      let trip = this.state.trip
      return (
        <div className="itinerary">
            <div className="itinerary-title"><div>Trip to {trip.destination_city_name}</div> <button onClick={() => window.location='/trips'}>View All Trips</button></div>
            {(this.props.edit || editBool()) ? 
              <button onClick={this.props.toggleEdit}>Save Changes To Trip</button>
            : <div className="itinerary-buttons">
                <button onClick={this.props.toggleEdit}>Edit Trip</button>
                <button>Print Trip</button>
                <button>Email Trip</button>
                <button trip-id={trip.id} onClick={this.props.deleteItinerary}>Delete Trip</button>
              </div>}
            <div className="itinerary-info">
              <div>{trip.num_people} people</div>
              <div>{trip.start_date} - {trip.end_date}</div>
              <div>Budget: ${trip.budget}</div>
              <div className="last">estimated cost: {}</div>
            </div>
            <div className="itinerary-bookings">
              {trip.flights && trip.flights.length > 0 ? 
              <div className="itinerary-col">
                <p>Flights</p>
                {this.state.edit || editBool(getEdit()) ? 
                  <button className="change" onClick={()=>window.location="/flight-selection"}>Change Flight</button>
                  :null}
                <FlightItem key={trip.flights[0].id} flight={trip.flights[0]} direction="depart"/>
                {this.state.edit || editBool(getEdit()) ? 
                  <button className="change" onClick={()=>window.location="/return-flight-selection"}>Change Flight</button>
                  :null}
                <FlightItem key={trip.flights[1].id} flight={trip.flights[1]} direction="return"/>
              </div>
              : null}
              {trip.hotels && trip.hotels.length > 0 ?
              <div className="itinerary-col">
                <p>Hotel</p>
                {this.state.edit || editBool(getEdit()) ? 
                  <button onClick={() => window.location='/hotel-selection'}>Change Hotel</button> 
                  : null}
                <HotelItem key={trip.hotels[0].id} hotel={trip.hotels[0]} />
              </div>              
              : null}
              {trip.activities && trip.activities.length > 0 ?
              <div className="itinerary-col">
                <p>Activities</p>
                {this.state.edit || editBool(getEdit()) ? 
                  <button className="change" onClick={()=>window.location="/activity-selection"}>Reselect Activities</button>
                : null}
                {trip.activities.map(activity => <ActivityItem key={activity.id} activity={activity} />)}
              </div>
              : null}
          </div>
        </div>
      )
    } else {
      return(
        <Loading />
      )
    }
  }
}

export default Itinerary;