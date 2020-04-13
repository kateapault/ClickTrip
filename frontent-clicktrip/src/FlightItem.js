import React from 'react';

function FlightItem(props) {
  return (
    <div className="flight">
      {props.flight.airline} {props.flight.flight_number} |
      | {props.flight.departure_airport} ⮕ {props.flight.arrival_airport} 
       | {props.flight.departure_date} {props.flight.departure_time} ⮕ {props.flight.arrival_time} {props.flight.departure_date === props.flight.arrival_date ? '':'+1'}
       | {props.flight.stops > 0 ? `${props.flight.stops} stops ` : 'Nonstop '} 
       | ${props.flight.price}
    </div>
  );
}

export default FlightItem;