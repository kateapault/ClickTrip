import React from 'react';

class DestinationSearch extends React.Component {
  intervalID = 0

  componentDidMount() {
      this.intervalID = setInterval(this.props.cycleSearchBackground,1000)
  }

  componentWillUnmount() {
      clearInterval(this.intervalID)
  }

  render() {
    return (

      <div className="destination-search search">
        <form onSubmit={this.props.handleSubmit}>
          I want a vaction to <input type="text" name="origin_city_iata" placeholder="LON" />
          <br></br>
          for <input type="number" name="num_people" placeholder="2" /> people
          <br></br>
          flying out of <input type="text" name="origin_city_iata" placeholder="NYC" />
          <br></br>
          <button onClick={this.props.callFlightAPI}>Let's Go!</button>
        </form>
      </div>
    );
  }
}

export default DestinationSearch;