import React from 'react';
import Trip from './Trip'

class TripsContainer extends React.Component {
  state ={
    tripID: window.sessionStorage.getItem('tripID'),
    trips: null
  }

  componentDidMount() {
    let userID = window.sessionStorage.getItem('userID')
    fetch(`http://localhost:3000/users/${userID}/trips`)
    .then(resp => resp.json())
    .then(trips => {
      this.setState({
        trips: trips
      })
      window.sessionStorage.setItem('trips',JSON.stringify(trips))
    })
  }

  activateTrip = (e) => {
    let button = e.target
    this.setState({
      tripID: button.id
    })
    window.sessionStorage.setItem('tripID',button.id)
  }

  render() {
  
    return (
      <div className="trips">
          <h2>All Trips</h2>
          {this.state.trips ?
            this.state.trips.map((trip,index) => 
            <Trip key={index} 
              trip={trip} 
              activateTrip={this.activateTrip}
              tripID={this.state.tripID}
            />
            )
            : 'loading trips...'
          }
      </div>
    );
  }
}

export default TripsContainer