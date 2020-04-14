import React from 'react';
import FlightItem from './FlightItem'
import { getJSON, editBool } from './Helper/HelperMethods'

function FlightSelection(props) {
  let flights = props.flights
  let edit = editBool()
  if (edit) {
    let currentFlight
    getJSON('trip').flights[0] ? currentFlight = getJSON('trip').flights[0] : console.log('ERROR: NO CURRENT FLIGHT FOUND')
    return(
      <div className="no-edit">
        {console.log(`EDIT: ${edit}`)}
        EDITING FLIGHTS
        Select a flight <span role="img" aria-label="airplane">🛩️</span>
        <form className="selection"  onSubmit={props.handleSubmit}>
          {flights.map((flight, index) => 
          <div key={index} className={currentFlight && currentFlight.id == flight.id ? 'current-flight' : ''}>
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
          <button>I want this flight instead!</button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="no-edit">
                {console.log(`EDIT: ${props.edit}`)}
        Select a flight <span role="img" aria-label="airplane">🛩️</span>
        <form className="selection"  onSubmit={props.handleSubmit}>
          {flights.map((flight, index) => 
          <div className="selection" key={index}>
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
}

export default FlightSelection;