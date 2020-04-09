import React from 'react';
import FlightItem from './FlightItem'
import { jsonToArray } from './Helper/HelperMethods'

function FlightSelection(props) {
  let flights = jsonToArray(JSON.parse(window.sessionStorage.getItem('flights')))
  return (
    <div>
      Select a flight <span role="img" aria-label="airplane">🛩️</span>
      <form className="selection"  onSubmit={props.handleSubmit}>
        {flights.map((flight, index) => 
          <label key={index} >
            <input className="radio-button"
                type="radio"
                name="flight-select"
                value={JSON.stringify(flight)}
                required
            />
            <FlightItem flight={flight} />
          </label>
        )}
        <br></br>
        <button>I want this flight!</button>
      </form>
    </div>
  );
}

export default FlightSelection;