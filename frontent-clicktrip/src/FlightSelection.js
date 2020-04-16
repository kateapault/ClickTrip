import React from 'react';
import FlightItem from './FlightItem'
import { getJSON, editBool } from './Helper/HelperMethods'

function FlightSelection(props) {
  let flights = props.flights
  let edit = editBool()
  let currentFlight
  if (edit) {
    getJSON('trip').flights[0] ? currentFlight = getJSON('trip').flights[0] : console.log('ERROR: NO CURRENT FLIGHT FOUND')
  }
  return(
    <div className="selection">
      <div>{edit ? "Reselect Flight" : "Select a flight"} <span role='img' aria-label="airplane">🛩️</span></div>
      <form onSubmit={props.handleSubmit}>
        {flights.map((flight, index) => 
        <div key={index} className={
            currentFlight && currentFlight.id == flight.id ? 
            'current' 
            : ''}>
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
        <button>{edit ? "I want this flight instead!" : "I want this flight!"}</button>
      </form>
    </div>
  );
}

export default FlightSelection;