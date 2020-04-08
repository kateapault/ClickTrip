import React from 'react';
import Trip from './Trip'

function TripsContainer(props) {
  return (
    <div className="nav">
        <h2>All Trips</h2>
        {console.log(props.trips)}
        {props.trips.map(trip => <Trip key={trip.id} trip={trip} /> )}
    </div>
  );
}

export default TripsContainer