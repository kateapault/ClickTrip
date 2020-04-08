import React from 'react';
import HotelItem from './HotelItem'

function HotelSelection(props) {
  let hotelsJSON = JSON.parse(window.sessionStorage.getItem('hotels'))
  let hotelsKeys = Object.keys(hotelsJSON)
  let hotels = hotelsKeys.map(key => hotelsJSON[key])
  return (
    <div>
      Select a hotel 🛏️
      <form className="selection" onSubmit={props.handleSubmit}>
        {hotels.map((hotel, index) => 
          <label key={index} >
            <input type="radio"
                name="hotel-select"
                value={hotel}
                required
            />
            <HotelItem hotel={hotel} />
          </label>
        )}
        <br></br>
        <button>I want this hotel!</button>
      </form>
    </div>
  );
}

export default HotelSelection;