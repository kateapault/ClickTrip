import React from 'react';
import HotelItem from './HotelItem'

function HotelSelection(props) {
  // const cheerio = require('cheerio')

  return (

    <div>
      I'm the hotel selection container. Here are my hotels.
      {props.hotels.length > 0 ? props.hotels.map(hotel => <HotelItem hotel={hotel} />) : 'no hotels yet'}
    </div>
  );
}

export default HotelSelection;