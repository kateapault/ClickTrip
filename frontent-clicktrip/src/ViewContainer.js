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
    // NOTE: NEED TO ADD IN CHECK TO MAKE SURE SESSION STORAGE WORKS ON USER'S MACHINE!!!

    // sessionStorage:
    //      userID          user's id
    //      trips           all user's trips
    //      currentTrip     active trip object (as stringified JSON)
    //      currentTripID   active trip's id
    //      flights         response from flight search
    //      hotels          response from hotel search
    //      activites       response from activity search

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
            currentCost: 0.0,
        }
    }

    componentDidMount() {
        // set user ID on load
        window.sessionStorage.setItem('userID',1)
        
        // set trips on load
        fetch(`http://localhost:3000/users/${this.state.user_id}/trips`)
        .then(resp => resp.json())
        .then(response =>
            window.sessionStorage.setItem('trips',JSON.stringify(response))
        )
    }

    handleSearchSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/search-dummy-flights',{
            method: 'POST'
        })
        .then(response => response.json())
        .then(flights => {
            window.sessionStorage.setItem('flights',JSON.stringify(flights))
        })
        .then(resp =>
            window.location = '/flight-selection'
        )
    }

    handleFlightSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/search-dummy-hotels',{
            method: 'POST'
        })
        .then(response => response.json())
        .then(hotels => {
            window.sessionStorage.setItem('hotels',JSON.stringify(hotels))
            console.log('saved hotels!')
        })
        .then(resp => {
            console.log('moving to hotels now!')
            window.location = '/hotel-selection'
        })
    }

    handleHotelSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/search-dummy-activities',{
            method: 'POST'
        })
        .then(response => response.json())
        .then(activities => {
            window.sessionStorage.setItem('activities',JSON.stringify(activities))
        })
        .then(resp =>
            window.location = '/activity-selection'
        )
    }

    handleActivitySubmit = (e) => {
        e.preventDefault()
        window.location = '/itinerary'
    }

    handleAutoSearchSubmit = () => {
        // create blank trip
        // fetch(BASEURL + '/trips', {
        //     method:'POST',
        //     header: {'ContentType':'application/json'},
        // })
        // .then(response => response.json())
        // .then(newTrip => {
        //     window.sessionStorage.setItem('currentTrip',JSON.stringify(newTrip))
        //     window.sessionStorage.setItem('currentTripID',newTrip.id)
        // })
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
                        <AutoSearch handleClick={this.handleSearchSubmit} />
                    </Route>
                    <Route exact path='/destination-search'>
                        <DestinationSearch handleSubmit={this.handleSearchSubmit} />
                    </Route>
                    <Route exact path='/budget-search'>
                        <ManualSearch handleSubmit={this.handleSearchSubmit} />
                    </Route>
                    <Route path="/flight-selection">
                        <FlightSelection handleSubmit={this.handleFlightSubmit} />
                    </Route>
                    <Route path="/hotel-selection">
                        <HotelSelection handleSubmit={this.handleHotelSubmit} />
                    </Route>
                    <Route path="/activity-selection">
                        <ActivitySelection handleSubmit={this.handleActivitySubmit} />
                    </Route>
                    <Route path="/itinerary">
                        <Itinerary />
                    </Route>
                    <Route path="/trips">
                        <TripsContainer />
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