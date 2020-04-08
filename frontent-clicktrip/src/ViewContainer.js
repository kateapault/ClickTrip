import React from 'react';
import {BrowserRouter as Router,Switch,Route, Redirect} from "react-router-dom";
import AutoSearch from './AutoSearch';
import DestinationSearch from './DestinationSearch';
import ManualSearch from './ManualSearch';
import FlightSelection from './FlightSelection';
import HotelSelection from './HotelSelection';
import ActivitySelection from './ActivitySelection';
import Itinerary from './Itinerary';
import TripsContainer from './Trips'

const BASEURL = 'http://localhost:3000'

class ViewContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: 1,
            flights: [],
            hotels: [],
            activites: [],
            trips:[],
            currentTrip: {},
            currentTripID: 0,
        }
    }

    // addFlightsToState = (f) => {
    //     this.setState({flights:f})
    // }

    // callHotelAPI = () => {

    // }

    // addHotelsToState = (h) => {
    //     this.setState({hotels:h})
    // }

    componentDidMount() {
        fetch(`http://localhost:3000/users/${this.state.user_id}/trips`)
        .then(resp => resp.json())
        .then(response =>
            this.setState({
                trips: response
            })
        )
    }

    // callPriceFlightAPI = (params) => {
    //     fetch('http://localhost:3000/search-flights-price',{
    //         method:'POST',
    //         body: params
    //     })
    //     .then(resp => resp.json())
    //     .then( flights => {
    //         window.sessionStorage.setItem('flights',JSON.stringify(flights.data))
    //         console.log(flights)
    //     })
    //     .then(resp => window.location = '/flight-selection') 
    // }

    // callDestFlightAPI = () => {
    //     fetch('http://localhost:3000/search-flights-dest',{
    //         method:'POST',
    //         // body: params
    //     })
    //     .then(resp => resp.json())
    //     .then( flights => {
    //         window.sessionStorage.setItem('flights',JSON.stringify(flights.data.DUB))
    //         console.log(flights)
    //     })
    //     .then(resp => window.location = '/flight-selection') 
    // }

    handleClickAutoSearchSubmit = () => {
        // create new trip instance
        fetch(BASEURL + '/trips', {
            method:'POST',
            header: {'ContentType':'application/json'},
            body: JSON.stringify({
                origin_city_iata: '',
                origin_city_name: '',
                destination_city_iata: '',
                destination_city_name: '',
                num_people: 1,
                start_date: '',
                end_date: '',
                budget: 1200,
            })
        })
        .then(resp => resp.json())
        .then(newTrip => {
            this.setState({
                currentTripID: newTrip.id,
                currentTrip: newTrip
            })
        })

        // add info from form
    }

    handleClickManualSearchSubmit = () => {

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
                        <DestinationSearch callFlightAPI={this.callDestFlightAPI}/>
                    </Route>
                    <Route exact path='/budget-search'>
                        <ManualSearch callFlightAPI={this.callPriceFlightAPI} />
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
                        <TripsContainer trips={this.state.trips}/>
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