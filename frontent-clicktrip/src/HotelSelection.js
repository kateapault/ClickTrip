import React from 'react';
import HotelItem from './HotelItem'

function HotelSelection(props) {
  // const cheerio = require('cheerio')

  return (

    <div>
      <form className="selection" onSubmit={props.handleSubmit}>
        <button>This hotel!</button>
      </form>
      I'm the hotel selection container. Here are my hotels.
      {props.hotels ? props.hotels.map(hotel => <HotelItem hotel={hotel} />) : 'no hotels yet'}
    </div>
  );
}

export default HotelSelection;