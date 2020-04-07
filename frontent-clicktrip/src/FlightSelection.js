import React from 'react';
import FlightItem from './FlightItem'

class FlightSelection extends React.Component {

  componentDidMount() {

  }
  
  render () {
    let flights = []
    let flightsObject = JSON.parse(window.sessionStorage.getItem('flights'))
    let flightsKeys = Object.keys(flightsObject)
    for(let i=0;i<flightsKeys.length;i++) {
          flights.push(flightsObject[flightsKeys[i]])
    }

    return (

      <div>
        I'm the flight selection container. Here are my flights.
        {/* {console.log('flights: ')}
        {console.log(this.props.flights)} */}
        {flights.length > 0 ? flights.map((flight, index) => <FlightItem key={index} flight={flight} />) : 'no flights yet'}
        <br></br>
        <button>SELECT</button>
      </div>
    );
  }
}

export default FlightSelection;