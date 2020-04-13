import React from 'react';
import HotelItem from './HotelItem'

function HotelSelection(props) {
  let hotelsJSON = JSON.parse(window.sessionStorage.getItem('hotels'))
  let hotelsKeys = Object.keys(hotelsJSON)
  let hotels = hotelsKeys.map(key => hotelsJSON[key])
  return (
    <div className="selection">
      <p>Select a hotel <span role="img" aria-label="bed">🛏️</span></p>
      <form className="selection" onSubmit={props.handleSubmit}>
        {hotels.map((hotel, index) => 
          <div key={index} >
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