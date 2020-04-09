import React from 'react';

function HotelItem(props) {
  return (
    <div className="hotel">
      {props.hotel.name} by {props.hotel.company} | {props.hotel.address} | {props.hotel.price} per night
    </div>
  );
}

export default HotelItem;