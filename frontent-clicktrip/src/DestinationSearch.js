import React from 'react';

function DestinationSearch(props) {
  return (

    <div>
      I want a vaction to <input type="text" name="origin_city_iata" placeholder="LON" />
      <br></br>
      for <input type="number" name="num_people" placeholder="2" /> people
      <br></br>
      flying out of <input type="text" name="origin_city_iata" placeholder="NYC" />
      <br></br>
      <button onClick={props.callFlightAPI}>Let's Go!</button>
    </div>
  );
}

export default DestinationSearch;