import React from 'react';
import { getJSON } from './Helper/HelperMethods'

function CostWidget() {
    let trip = getJSON('trip')
    return(
        <div className="widget">
            <div className="title">{trip.city} Trip</div>
            <div className="row">
                <div className="column label">Flights:</div>
                <div className="column multiplier">x${trip.num_people} people</div>
                <div className="column cost">${trip.flights[0].price + trip.flights[1].price}</div>
            </div>
            <div className="row">
                <div className="column label">Hotel:</div>
                <div className="column multiplier">x${trip.num_people} nights</div>
                <div className="column cost">${trip.hotels[0].price}</div>
            </div>
            <div className="row">
                <div className="column label">Activities:</div>
                <div className="column multiplier">x${trip.num_people} people</div>
                <div className="column cost">${trip.flights[0].price + trip.flights[1].price}</div>
            </div>
        </div>
    );
}

export default CostWidget;