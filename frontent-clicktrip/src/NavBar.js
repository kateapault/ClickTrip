import React from 'react';
import {
    BrowserRouter as Router,Link
  } from "react-router-dom";

function NavBar(props) {
  return (

    <div className="nav">
        <h1>
            <p>ClickTrip</p>
        </h1>
        <Link to="/">Search </Link>
        <Link to="/destination-search">Search By Destination </Link>
        <Link to="/budget-search"> Search By Price </Link>
        <Link to="/trips"> All Trips </Link>
        <Link to="/profile"> Profile </Link>
    </div>
  );
}

export default NavBar;