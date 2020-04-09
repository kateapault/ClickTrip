import React from 'react';
import FlightItem from './FlightItem'
import HotelItem from './HotelItem'
import ActivityItem from './ActivityItem'

function Itinerary(props) {

  let trip = props.trip

  return (
    <div>
      {props.inactive ? "I'm inactive" : "I'm active"} <button onClick={window.location='/trips'}>View All Trips</button>
      {trip ?
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

export default Itinerary;