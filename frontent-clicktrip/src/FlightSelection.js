import React from 'react';
import FlightItem from './FlightItem'

function FlightSelection(props) {
    let flightsJSON = JSON.parse(window.sessionStorage.getItem('flights'))
    let flightsKeys = Object.keys(flightsJSON)
    let flights = flightsKeys.map(key => flightsJSON[key])
    return (
      <div>
        {console.log(flights)}
        <form className="selection"  onSubmit={props.handleSubmit}>
          {flights.map((flight, index) => 
            <label key={index} >
              <input type="radio"
                  name="flight-Select"
                  value={flight}
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