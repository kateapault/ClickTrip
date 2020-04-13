import React from 'react';

function ManualSearch(props) {
  return (

    <div className="manual-search search">
      <form>
        I want a vaction for <input type="number" name="num_people" placeholder="2" /> people
        <br></br>
        for under $<input type="number" name="budget" placeholder="1200" />
        <br></br>
        from <input type="date" name="start_date" /> to <input type="date" name="end_date" />
        <br></br>
        flying out of <input type="text" name="origin_city_iata" placeholder="NYC" />
        <br></br>
        <button onClick={props.callPriceFlightAPI}>Let's look at flights!</button>
      </form>
    </div>
  );
}

export default ManualSearch;