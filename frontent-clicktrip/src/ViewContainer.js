import React from 'react';
import {BrowserRouter as Router,Switch,Route, Redirect} from "react-router-dom";
import AutoSearch from './AutoSearch';
import DestinationSearch from './DestinationSearch';
import ManualSearch from './ManualSearch';
import FlightSelection from './FlightSelection';
import HotelSelection from './HotelSelection';
import ActivitySelection from './ActivitySelection';
import Itinerary from './Itinerary';

const BASEURL = 'http://localhost:3000'

class ViewContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: [],
            cityIATA: '',
            hotels: [],
            activites: []
        }
    }

    callFlightAPI = () => {
        fetch('http://localhost:3000/search-flights',{
            method:'POST'
            })
            .then(resp => resp.json())
            .then( flights => {
                window.sessionStorage.setItem('flights',JSON.stringify(flights.data))
                console.log(flights)
            })
            .then(resp => window.location = '/flight-selection')
        
    }

    addFlightsToState = (f) => {
        this.setState({flights:f})
    }

    componentDidMount() {
        this.setState({view:'search'})
    }

    handleClickAutoSearchSubmit = () => {
        // create new trip instance
        fetch(BASEURL + '/trips', {
            method:'POST',
            header: '',
            body: JSON.stringify()
        })

        // add info from form
    }

    handleClickDestSearchSubmit = () => {
        // create new trip instance
        // add info from form
    }

    render() {

        return (
            <div className="view">
                <Switch>
                    <Route exact path="/">
                        <AutoSearch />
                    </Route>
                    <Route exact path='/destination-search'>
                        <DestinationSearch />
                    </Route>
                    <Route exact path='/budget-search'>
                        <ManualSearch callFlightAPI={this.callFlightAPI} />
                    </Route>
                    <Route path="/flight-selection">
                        <FlightSelection flights={this.state.flights} addFlightsToState={this.addFlightsToState}/>
                    </Route>
                    <Route path="/hotel-selection">
                        <HotelSelection hotels={this.state.hotels}/>
                    </Route>
                    <Route path="/activity-selection">
                        <ActivitySelection activities={this.state.activites} />
                    </Route>
                    <Route path="/itinerary">
                        <Itinerary />
                    </Route>
                    <Route path="/trips">
                        trips
                    </Route>
                    <Route path="/profile">
                        profile
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default ViewContainer;