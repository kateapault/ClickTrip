import React from 'react';
import FlightItem from './FlightItem'
import HotelItem from './HotelItem'
import ActivityItem from './ActivityItem'

function TripDetails(props) {
    let trip = props.trip
    function activateAndReroute(e){
        props.activateTrip(e)
        window.location = '/itinerary'
    }
    if (!!trip) {
    return (
      <div className="trip-details">
            <button onClick={props.hideTripDetail}>X</button>
            <h2>Trip to {trip.city}</h2>
            <p>{trip.num_people} people | {trip.start_date} - {trip.end_date} | ${trip.budget}</p>
            <p>estimated cost: {}</p>
            <button trip-id={trip.id} onClick={activateAndReroute}>Edit Trip</button>
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
        </div>);
    } else {
        return <div>loading...</div>
    }
}

export default TripDetails;