import React from 'react';

function Trip(props) {
    return (
        <div className={props.trip.id == window.sessionStorage.getItem('currentTripID') ? "active-trip" : "inactive-trip"}>
            <h3>My {props.trip.city} Trip</h3> {props.trip.id == window.sessionStorage.getItem('currentTripID') ? <div><button>edit</button><button>remove</button></div> : <button>make active trip</button>}
            <div>Flight: {props.trip.flights.length > 0 ? props.trip.flights[0].departure_time : 'none'} </div>
            <div>Hotel: {props.trip.hotels.length > 0 ? props.trip.hotels[0].name : 'none'}</div>
            <div>Activity 1: {props.trip.activities.length > 0 ? props.trip.activities[0].name : 'none'}</div>
        </div>
    );
}

export default Trip