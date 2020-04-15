import React from 'react';
import Trip from './Trip'
import TripDetails from './TripDetails';
import Loading from './Loading'
import { getJSON, getItem, setJSON } from './Helper/HelperMethods'

class TripsContainer extends React.Component {

  state ={
    tripID: window.sessionStorage.getItem('tripID'),
    trips: (getItem('trips') && getItem('trips') !== "undefined" 
          ? getJSON('trips') 
          : null),
    tripDetail: false,
    tripDetailTrip: null,
  }

  componentDidMount() {
    console.log('getting trips...')
    let userID = window.sessionStorage.getItem('userID')
    fetch(`http://localhost:3000/users/${userID}/trips`)
    .then(resp => resp.json())
    .then(trips => {
      console.log("TRIPS")
      console.log(trips)
      this.setState({
        trips: trips
      })
      setJSON('trips',trips)
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
      console.log(this.state.trips)
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
            <div className="trips-container">
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
        </div>
      );
    } else {
      return(
        <Loading />
      )
    }
  }
}

export default TripsContainer