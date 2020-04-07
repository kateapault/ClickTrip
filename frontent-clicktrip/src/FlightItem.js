import React from 'react';

function FlightItem(props) {
  return (

    <div className="flight">
      flight to {props.flight.destination}
    </div>
  );
}

export default FlightItem;