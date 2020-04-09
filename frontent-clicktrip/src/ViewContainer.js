import React from 'react';
import { Switch, Route } from "react-router-dom";
import AutoSearch from './AutoSearch';
import DestinationSearch from './DestinationSearch';
import ManualSearch from './ManualSearch';
import FlightSelection from './FlightSelection';
import HotelSelection from './HotelSelection';
import ActivitySelection from './ActivitySelection';
import Itinerary from './Itinerary';
import TripsContainer from './Trips'
import { getCheckedRadioValue, getCheckedCheckboxValues } from './Helper/HelperMethods'
import { fetchFlights } from './Helper/FetchFlights'
import { fetchHotels } from './Helper/FetchHotels'
import { fetchActivities } from './Helper/FetchActivities'

const BASEURL = 'http://localhost:3000'

class ViewContainer extends React.Component {
    // NOTE: NEED TO ADD IN CHECK TO MAKE SURE SESSION STORAGE WORKS ON USER'S MACHINE!!!

    // sessionStorage:
    //      userID          user's id
    //      tripID          id of active trip
    //      trips           all user's trips
    //      flights         response from flight search
    //      hotels          response from hotel search
    //      activites       response from activity search

    constructor(props) {
        super(props);
        this.state = {
            viewTripID: window.sessionStorage.getItem('tripID'),
        }
    }

    componentDidMount() {
        // set user ID on load
        window.sessionStorage.setItem('userID',1)
    }

    handleSearchSubmit = (e) => {
        let userID = window.sessionStorage.getItem('userID')
        e.preventDefault()
        function createNewTrip(callback) {
            fetch('http://localhost:3000/trips',{   
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    user_id: userID
                })
            })
            .then(resp => resp.json())
            .then(newTrip => {
                window.sessionStorage.setItem('tripID',newTrip.id)
            })
            callback()
        }
        createNewTrip(fetchFlights(function(){window.location = '/flight-selection'}))
    }

    handleFlightSubmit = (e) => {
        e.preventDefault()
        // add selected flight to trip
        let checked = getCheckedRadioValue()
        let tripID = window.sessionStorage.getItem('currentTripID')
        fetch('http://localhost:3000/flights',{
            method:'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                trip_id: tripID,
                departure_airport: checked.departure_airport,
                arrival_airport: checked.arrival_airport,
                departure_date: checked.departure_date,
                arrival_date: checked.arrival_date,
                departure_time: checked.departure_time,
                arrival_time: checked.arrival_time,
                airline: checked.airline,
                flight_num: checked.flight_number,
                ticket_price: checked.price,
                num_stops: checked.stops,
            })
        })
        .then(      
            // get hotels prior to redirect   
            fetch('http://localhost:3000/search-dummy-hotels',{
                method: 'POST'
            })
            .then(response => response.json())
            .then(hotels => {
                window.sessionStorage.setItem('hotels',JSON.stringify(hotels))
            })
            .then(resp => {
                window.location = '/hotel-selection'
            })
        )
    }

    handleHotelSubmit = (e) => {
        e.preventDefault()
        // add selected hotel to trip
        let checked = getCheckedRadioValue()
        let tripID = window.sessionStorage.getItem('currentTripID')
        fetch('http://localhost:3000/hotels',{
            method:'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                trip_id: tripID,
                name: checked.name,
                address: checked.address,
                company: checked.company,
                price_per_night: checked.price,
            })
        })
        .then(
            // get activities prior to redirect
            fetch('http://localhost:3000/search-dummy-activities',{
                method: 'POST'
            })
            .then(response => response.json())
            .then(activities => {
                window.sessionStorage.setItem('activities',JSON.stringify(activities.activities))
            })
            .then(resp =>
                window.location = '/activity-selection'
            )
        )

    }

    handleActivitySubmit = (e) => {
        e.preventDefault()
        let activities = getCheckedCheckboxValues()
        let tripID = window.sessionStorage.getItem('currentTripID')
        for (let i=0;i<activities.length;i++) {
            let activity = activities[i]
            fetch('http://localhost:3000/activities',{
                method:'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    trip_id: tripID,
                    name: activity.name,
                    location: activity.address,
                    category: activity.type,
                    ticket_price: activity.price,
                    open_time: activity.open_time,
                    close_time: activity.close_time,
                })
            })
            .then(resp => resp.json())
            .then(resp => console.log(resp))
        }

        // window.location = '/itinerary'
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
                        <Itinerary tripID={this.state.tripID}/>
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