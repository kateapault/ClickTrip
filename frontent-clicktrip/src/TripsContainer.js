import React from 'react';
import Trip from './Trip'
import TripDetails from './TripDetails';

class TripsContainer extends React.Component {
  state ={
    tripID: window.sessionStorage.getItem('tripID'),
    trips: (window.sessionStorage.getItem('trips') ? JSON.parse(window.sessionStorage.getItem('trips')) : null),
    tripDetail: false,
    tripDetailTrip: null,
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
    let id = button.getAttribute('trip-id')
    this.setState({
      tripID: id
    })
    window.sessionStorage.setItem('tripID',id)
  }

  deleteTrip = (e) => {
    let button = e.target
    button.parentNode.parentNode.remove()
    let id = button.getAttribute('trip-id')
    fetch(`http://localhost:3000/trips/${id}`,{
      method: "DELETE"
    })
  }

  showTripDetail = (trip) => {
    this.setState({
      tripDetail: true,
      tripDetailTrip: trip,
    })
  }

  hideTripDetail = () => {
    this.setState({
      tripDetail: false,
    })
  }

  render() {
    if (this.state.trips) {
      return (
        <div className="trips">
            <h2>All Trips</h2>
              {(this.state.tripDetail ? 
                <TripDetails 
                    trip={this.state.tripDetailTrip} 
                    hideTripDetail={this.hideTripDetail}
                    activateTrip={this.activateTrip}
                    deleteTrip={this.deleteTrip}
                /> 
                : ''
              )}
              {
              this.state.trips.map((trip,index) => 
                <Trip key={index} 
                  trip={trip} 
                  activateTrip={this.activateTrip}
                  tripID={this.state.tripID}
                  showTripDetail={this.showTripDetail}
                  deleteTrip={this.deleteTrip}
                />
              )}
        </div>
      );
    } else {
      return(
        <div>...loading</div>
      );
    }
  }
}

export default TripsContainer