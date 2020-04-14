import React from 'react';
import FlightItem from './FlightItem'
import { jsonToArray } from './Helper/HelperMethods'

function ReturnFlightSelection(props) {
  let flights = props.flights
  return (
    <div className="radio">
      Select a flight <span role="img" aria-label="airplane">🛩️</span>
      <form className="selection"  onSubmit={props.handleSubmit}>
        {flights.map((flight, index) => 
        <div className="selection">
            <input className="radio-button"
              type="radio"
              name="flight-select"
              id={index}
              value={JSON.stringify(flight)}
              required
            />
            <label htmlFor={index} key={index} >
              <FlightItem flight={flight} />
            </label>
          </div>
        )}
        <br></br>
        <button>I want this flight! »</button>
      </form>
    </div>
  );
}

export default ReturnFlightSelection;