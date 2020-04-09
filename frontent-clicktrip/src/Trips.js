import React from 'react';
import Trip from './Trip'
import { jsonToArray } from './HelperMethods'

class TripsContainer extends React.Component {
  componentDidMount() {
    let userID = window.sessionStorage.getItem('userID')
    fetch(`http://localhost:3000/users/${userID}/trips`)
    .then(resp => resp.json())
    .then(response =>
        window.sessionStorage.setItem('trips',JSON.stringify(response.trips))
    )
  }
  render() {
  let trips = jsonToArray(JSON.parse(sessionStorage.getItem('trips')))
  
    return (
      <div className="nav">
          <h2>All Trips</h2>
          {trips.map((trip,index) => <Trip key={index} trip={trip} />)}
      </div>
    );
  }
}

export default TripsContainer