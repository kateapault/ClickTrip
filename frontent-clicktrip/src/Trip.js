import React from 'react';

function Trip(props) {
    let active = <div>
        <button onClick={() => window.location = '/itinerary'}>View / Edit Trip</button>
        <button trip-id={props.trip.id} onClick={props.deleteTrip}>Delete Trip</button>
        </div>
    let inactive = <div>
            <button trip-id={props.trip.id} onClick={props.activateTrip}>Make Active Trip</button>
            <button onClick={() => props.showTripDetail(props.trip)}>View Trip</button>
            <button trip-id={props.trip.id} onClick={props.deleteTrip}>Delete Trip</button>
            </div>
    // console.log(props.trip)
    return (
        <div className={props.trip.id == props.tripID ? "active-trip trip" : "inactive-trip trip"}>
            <h3>My {props.trip.city} Trip, ID: {props.trip.id}</h3> {props.trip.id == props.tripID ? active : inactive}
            <div>Flight: {props.trip.flights.length > 0 ? props.trip.flights[0].departure_time : 'none'} </div>
            <div>Hotel: {props.trip.hotels.length > 0 ? props.trip.hotels[0].name : 'none'}</div>
            <div>Activity 1: {props.trip.activities.length > 0 ? props.trip.activities[0].name : 'none'}</div>
        </div>
    );
}

export default Trip