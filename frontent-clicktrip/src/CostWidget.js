import React from 'react';
import { getJSON, activityPriceSum } from './Helper/HelperMethods'

function CostWidget() {
    let trip = getJSON('trip')
    return(
        <div className="widget">
            <div className="title">{trip.city} Trip</div>
            <div className="bar"></div>
            <div className="row">
                <div className="column label">Flights:</div>
                <div className="column multiplier">x{trip.num_people} people</div>
                <div className="column cost"><div>$</div><div>{parseFloat(trip.flights[0].price) + parseFloat(trip.flights[1].price)}</div></div>
            </div>
            <div className="row">
                <div className="column label">Hotel:</div>
                <div className="column multiplier">x{trip.num_people} nights</div>
                <div className="column cost"><div>$</div><div>{parseFloat(trip.hotels[0].price)}</div></div>
            </div>
            <div className="row">
                <div className="column label">Activities:</div>
                <div className="column multiplier">x{trip.num_people} people</div>
                <div className="column cost"><div>$</div><div>{activityPriceSum()}</div></div>
            </div>
            <div className="bar"></div>
            <div className="row total-row">
                <div className="column label total">Total:</div>
                <div className="column cost total"><div>$</div><div>{}</div></div>
            </div>
        </div>
    );
}

export default CostWidget;