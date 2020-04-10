import React from 'react';
import FlightItem from './FlightItem'
import HotelItem from './HotelItem'
import ActivityItem from './ActivityItem'

class Itinerary extends React.Component {
  state = {
    trip: (window.sessionStorage.getItem('trip') ? JSON.parse(window.sessionStorage.getItem('trip')) : null)
  }

  componentDidMount() {
    let tripID = window.sessionStorage.getItem('tripID')
    if (this.state.trip.id == tripID) {
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
    if (trip) {
      return (
        <div>
            <h2>Trip to {trip.city}</h2> <button onClick={() => window.location='/trips'}>back to all trips</button>
            <button>Edit Trip</button><button>Print Trip</button><button>Email Trip</button><button trip-id={trip.id} onClick={this.props.deleteItinerary}>Delete Trip</button>
            <p>{trip.num_people} people | {trip.start_date} - {trip.end_date} | ${trip.budget}</p>
            <p>estimated cost: {}</p>
            <div>
              <p>Flights</p>
              {trip.flights.length > 0 ? 
              trip.flights.map(flight => <FlightItem key={flight.id} flight={flight}/>)
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