import React from 'react';

function ManualSearch(props) {
  return (

    <div className="manual-search search">
      <h3>Search By Price</h3>
      <form className="manual-search search" onSubmit={props.handleSubmit}>
        <div>I want a vaction for <input type="number" name="num_people" placeholder="2" /> people
        </div>
        <div>for under $<input type="number" name="budget" placeholder="800" />
        </div>
        <div>from <input type="date" name="start_date" /> to <input type="date" name="end_date" />
        </div>
        <div>flying out of <input type="text" name="origin_city_iata" placeholder="NYC" />
        </div>
        <button>Let's look at flights!</button>
      </form>
    </div>
  );
}

export default ManualSearch;