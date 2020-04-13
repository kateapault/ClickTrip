import React from 'react';
import { Link } from "react-router-dom";

function NavBar(props) {
  return (
    <div className="nav">
        <div className="clicktrip">ClickTrip</div>
        <div className="links">
          <button className="link" onClick={() => window.location ='/'}>Search</button>
          <button className="link" onClick={() => window.location = "/destination-search"}>Search By Destination</button>
          <button className="link" onClick={() => window.location = "/budget-search"}>Search By Price</button>
          <button className="link" onClick={() => window.location = '/trips'}>My Trips</button>
          <button className="link" onClick={() => window.location = '/itinerary'}>Active Itinerary</button>
          <button className="link" onClick={() => window.location = '/profile'}>Profile</button>
        </div>
    </div>
  );
}

export default NavBar;