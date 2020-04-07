import React from 'react';

function ManualSearch(props) {
  return (

    <div>
      yo I'm a manual budget search form - I'll help you put together your own trip based on your budget
      <button onClick={props.callFlightAPI}>link to flight selection</button>
    </div>
  );
}

export default ManualSearch;