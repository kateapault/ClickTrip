import React from 'react';
import FlightItem from './FlightItem'

class FlightSelection extends React.Component {

  componentDidMount() {
    fetch('http://localhost:3000/search-flights',{
      method:'POST'
    })
    .then(resp => resp.json())
    .then( flights => {
      let flightsHash = flights.data;
      let flightsArray = Object.keys(flightsHash)
      console.log(`flightsArray: ${flightsArray}`)
      this.props.addFlights(flights.data);
    })
  }
  render () {
    return (

      <div>
        I'm the flight selection container. Here are my flights.
        {console.log('flights: ')}
        {console.log(this.props.flights)}
        {this.props.flights.length > 0 ? this.props.flights.map(flight => <FlightItem flight={flight} />) : 'no flights yet'}
      </div>
    );
  }
}

export default FlightSelection;