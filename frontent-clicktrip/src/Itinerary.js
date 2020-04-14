import React from 'react';
import FlightItem from './FlightItem'
import HotelItem from './HotelItem'
import ActivityItem from './ActivityItem'
import { editBool } from './Helper/HelperMethods'

class Itinerary extends React.Component {
  state = {
    trip: (window.sessionStorage.getItem('trip') ? JSON.parse(window.sessionStorage.getItem('trip')) : null)
  }

  componentDidMount() {
    let tripID = window.sessionStorage.getItem('tripID')
    if (this.state.trip && this.state.trip.id == tripID) {
      return
    } else {
      fetch(`http://localhost:3000/trips/${tripID}`)
      .then(resp => resp.json())
      .then(trip => {
        window.sessionStorage.setItem('trip',JSON.stringify(trip))
        this.setState({ trip: trip })
        console.log(trip)
      })
    }
  }
  
  render() {
    let trip = this.state.trip
    if (trip && (this.props.edit || editBool())) {
      return(
        <div>
        <p>Trip to {trip.city}</p>
        <div><button onClick={this.props.toggleEdit}>Save Changes To Trip</button></div>
        <div><p>{trip.num_people} people | {trip.start_date} - {trip.end_date} | ${trip.budget}</p>
        <p>estimated cost: {}</p>
        </div>
        <div>
          <p>Flights</p>
          {trip.flights.length > 0 ? 
          <div>
            <button onClick={()=>window.location="/flight-selection"}>Change Departing Flight</button> Depart: <FlightItem key={trip.flights[0].id} flight={trip.flights[0]}/>
            <button onClick={()=>window.location="/return-flight-selection"}>Change Return Flight</button> Return: <FlightItem key={trip.flights[1].id} flight={trip.flights[1]}/>
          </div>
          : 'no flights'}
        </div>
        <div>
          <p>Hotel</p>
          <button onClick={() => window.location='/hotel-selection'}>Change Hotel</button>
          {trip.hotels.length > 0 ?
          <HotelItem hotel={trip.hotels[0]} />
          : 'no hotels'}
        </div>
        <div>
          <p>Activities</p>
          <button onClick={()=>window.location="/activity-selection"}>Reselect Activities</button>
          {trip.activities.length > 0 ?
          trip.activities.map(activity => <ActivityItem key={activity.id} activity={activity} />)
          : 'no activities'}
        </div>
      </div>
      )
    } else if (trip) {
      window.sessionStorage.setItem('edit',0)
      return (
        <div>
            <p>Trip to {trip.city}</p> <button onClick={() => window.location='/trips'}>back to all trips</button>
            <div><button onClick={this.props.toggleEdit}>Edit Trip</button><button>Print Trip</button><button>Email Trip</button><button trip-id={trip.id} onClick={this.props.deleteItinerary}>Delete Trip</button></div>
            <div><p>{trip.num_people} people | {trip.start_date} - {trip.end_date} | ${trip.budget}</p>
            <p>estimated cost: {}</p>
            </div>
            <div>
              <p>Flights</p>
              {trip.flights.length > 0 ? 
              <div>
                Depart: <FlightItem key={trip.flights[0].id} flight={trip.flights[0]}/>
                Return: <FlightItem key={trip.flights[1].id} flight={trip.flights[1]}/>
              </div>
              : 'no flights'}
            </div>
            <div>
              <p>Hotel</p>
              {trip.hotels.length > 0 ?
              trip.hotels.map(hotel => <HotelItem key={hotel.id} hotel={hotel} />)
              : 'no hotels'}
            </div>
            <div>
              <p>Activities</p>
              {trip.activities.length > 0 ?
              trip.activities.map(activity => <ActivityItem key={activity.id} activity={activity} />)
              : 'no activities'}
            </div>
          </div>
      )
    } else {
      return(
        <div>loading....</div>
      )
    }
  }
}

export default Itinerary;