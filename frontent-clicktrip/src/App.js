import React from 'react';
import './App.css';
import {
  BrowserRouter as Router
} from "react-router-dom";
import ViewContainer from './ViewContainer'
import NavBar from './NavBar'

function App() {
  return (
    <Router>
    <div className="App">
      <NavBar />
      <ViewContainer />
    </div>
    </Router>
  );
}

export default App;
