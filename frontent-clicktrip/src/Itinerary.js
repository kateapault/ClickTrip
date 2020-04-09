import React from 'react';
import FlightItem from './FlightItem'
import HotelItem from './HotelItem'
import ActivityItem from './ActivityItem'
import HotelSelection from './HotelSelection';

class Itinerary extends React.Component {
  state = {
    tripID: (this.props.tripID ? this.props.tripID : window.sessionStorage.getItem('tripID')),
    trip: {}
  }

  componentDidMount() {
    fetch(`http://localhost:3000/trips/${this.state.tripID}`)
    .then(resp => resp.json())
    .then(trip =>
      this.setState({
        trip:trip
      })
    )
  }

  render() {
    let inactive = this.props.inactive
    let trip = this.state.trip
    return (
      <div>
        {inactive ? "I'm inactive" : "I'm active"}
        {this.state.trip.id ?
          <div>
            <h2>Trip to {trip.city}</h2>
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
          : 'loading....'
        }
      </div>
    );
  }
}

export default Itinerary;