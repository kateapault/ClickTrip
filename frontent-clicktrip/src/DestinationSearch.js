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
        <h3>Destination Search</h3>
        <form className="destination-search search" onSubmit={this.props.handleSubmit}>
          <div>I want a vaction to <input type="text" name="origin_city_iata" placeholder="LON" />
          </div>
          <div>for <input type="number" name="num_people" placeholder="2" /> people
          </div>
          <div>flying out of <input type="text" name="origin_city_iata" placeholder="NYC" />
          </div>
          <button>Let's Go!</button>
        </form>
      </div>
    );
  }
}

export default DestinationSearch;