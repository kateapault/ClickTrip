import React from 'react';
import HotelItem from './HotelItem'

function HotelSelection(props) {
  let hotels = props.hotels
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