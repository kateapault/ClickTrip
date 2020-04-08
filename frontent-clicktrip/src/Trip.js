import React from 'react';

function Trip(props) {
    let city = 'test'
    let flight1 = '';
    let flight2 = '';
    let hotel = '';
    let activities = [];
    return (
        <div className={props.trip.id == props.currentTripID ? "active-trip" : "trip"}>
            <h3>My {city} Trip</h3>
        </div>
    );
}

export default Trip