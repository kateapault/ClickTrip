import React from 'react';

function Trip(props) {
    return (
        <div className={props.trip.id == window.sessionStorage.getItem('currentTripID') ? "active-trip" : "inactive-trip"}>
            <h3>My {props.trip.city} Trip</h3>
            <div>Flight: {props.trip.flights ? props.trip.flights[0].departure_time : 'none'} </div>
            <div>Hotel: {props.trip.hotels ? props.trip.hotels[0].name : 'none'}</div>
            <div>Activity 1: {props.trip.activities ? props.trip.activities[0].name : 'none'}</div>
        </div>
    );
}

export default Trip