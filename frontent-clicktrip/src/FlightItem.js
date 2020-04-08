import React from 'react';

function FlightItem(props) {
  return (

    <div className="flight">
      <div className="dest-iata">Destination: {props.flight.destination ? props.flight.destination : "DUB"}</div>
      <div className="price">Price: {props.flight.price}</div>
      <div className="">Depart: {props.flight.departure_at}</div>
      <div>Airline: {props.flight.airline}</div>

      <button>SELECT</button>
    </div>
  // origin: "NYC"
  // destination: "DXB"
  // price: 483
  // transfers: 3
  // airline: "DY"
  // flight_number: 7002
  // departure_at: "2020-05-05T22:05:00Z"
  // return_at: "2020-05-12T22:15:00Z"
  // expires_at: "2020-04-08T11:39:08Z"
  );
}

export default FlightItem;