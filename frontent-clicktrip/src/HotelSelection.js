import React from 'react';
import HotelItem from './HotelItem'
import { getEdit, editBool, getJSON } from './Helper/HelperMethods';

function HotelSelection(props) {
  let hotels = getJSON('hotels')
  let edit = editBool(getEdit())
  let currentHotel
  if (edit) {
    getJSON('trip').hotel[0] ? currentHotel = getJSON('trip').hotel[0] : console.log('ERROR: NO CURRENT HOTEL FOUND')
  }
  return (
    <div className="selection">
      <div>{edit ? "Reselect Hotel" : "Select a hotel"} <span role="img" aria-label="bed">🛏️</span></div>
      <form onSubmit={props.handleSubmit}>
        {hotels.map((hotel, index) => 
          <div key={index} className={
            currentHotel && currentHotel.id == hotel.id ? 
            'current' 
            : ''}>
            <input type="radio"
                name="hotel-select"
                value={JSON.stringify(hotel)}
                id={index}
                required
            />
            <label htmlFor={index}>
              <HotelItem hotel={hotel} />
            </label>
          </div>
        )}
        <br></br>
        <button>I want this hotel! »</button>
      </form>
    </div>
  );
}

export default HotelSelection;