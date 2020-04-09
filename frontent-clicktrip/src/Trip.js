import React from 'react';

function Trip(props) {
    let active = <div>
        <button>edit</button>
        <button>remove</button>
        </div>
    let inactive = <button onClick={props.activateTrip} id={props.trip.id}>make active trip</button>

    return (
        <div className={props.trip.id == props.tripID ? "active-trip" : "inactive-trip"}>
            <h3>My {props.trip.city} Trip, ID: {props.trip.id}</h3> {props.trip.id == props.tripID ? active : inactive}
            <div>Flight: {props.trip.flights.length > 0 ? props.trip.flights[0].departure_time : 'none'} </div>
            <div>Hotel: {props.trip.hotels.length > 0 ? props.trip.hotels[0].name : 'none'}</div>
            <div>Activity 1: {props.trip.activities.length > 0 ? props.trip.activities[0].name : 'none'}</div>
            <button>View Trip Details</button>
        </div>
    );
}

export default Trip