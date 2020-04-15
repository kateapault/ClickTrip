import React from 'react';
import { getJSON, activityPriceSum } from './Helper/HelperMethods'

function CostWidget() {
    let trip = getJSON('trip')
    if (trip) {
        return(
            <div className="widget-spacer">
                <div className="widget">
                    <div className="title">{trip.city} Trip</div>
                    <div className="bar"></div>
                    <div className="row">
                        <div className="column label">Flights:</div>
                        <div className="column multiplier">x{trip.num_people} people</div>
                        <div className="column cost"><div>$</div><div>{trip.num_people ? 
                                            parseFloat(trip.num_people) * (parseFloat(trip.flights[0].price) + parseFloat(trip.flights[1].price)) 
                                            : parseFloat(trip.flights[0].price) + parseFloat(trip.flights[1].price)}</div></div>
                    </div>
                    <div className="row">
                        <div className="column label">Hotel:</div>
                        <div className="column multiplier">x{trip.duration} nights</div>
                        <div className="column cost"><div>$</div><div>{trip.duration ? 
                                            parseFloat(trip.duration) * parseFloat(trip.hotels[0].price) 
                                            : parseFloat(trip.hotels[0].price)}</div></div>
                    </div>
                    <div className="row">
                        <div className="column label">Activities:</div>
                        <div className="column multiplier">x{trip.num_people} people</div>
                        <div className="column cost"><div>$</div><div>{trip.num_people ? parseFloat(trip.num_people) * activityPriceSum() : activityPriceSum()}</div></div>
                    </div>
                    <div className="bar"></div>
                    <div className="row total-row">
                        <div className="column label total">Total:</div>
                        <div className="column cost total"><div>$</div><div>{}</div></div>
                    </div>
                </div>
            </div>
        );
    } else {
        return(null)
    }
}

export default CostWidget;