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
import { jsonToArray, getCheckedRadioValue, getCheckedCheckboxValues } from './Helper/HelperMethods'
import { handleSearchSubmit } from './Helper/HandleSearchSubmit'
import { getFormData } from './Helper/GetFormData'
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
            viewTrip:{},
        }
    }

    componentDidMount() {
        // set user ID on load
        window.sessionStorage.setItem('userID',1)
    }

    handleSearchSubmit = (e) => {
        e.preventDefault()
        let data = getFormData()
        console.log(data)
        let userID = window.sessionStorage.getItem('userID')
        handleSearchSubmit(userID,data)
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
        this.routeToItinerary(tripID,function(){window.location='/itinerary'})
    }

    handleClickViewTrip = (e) => {
        let tripID = e.target.parentNode.id
        this.routeToItinerary(tripID,function(){window.location='/itinerary'})
    }

    routeToItinerary = (tripID,callback) => {
        fetch(`http://localhost:3000/trips/${tripID}`)
        .then(resp => resp.json())
        .then(trip => this.setState({viewTrip:trip}))
        callback()
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
                        <FlightSelection 
                            handleSubmit={this.handleFlightSubmit} 
                            flights={window.sessionStorage.getItem('flights') ? jsonToArray(JSON.parse(window.sessionStorage.getItem('flights'))) : []}
                        />
                    </Route>
                    <Route path="/hotel-selection">
                        <HotelSelection handleSubmit={this.handleHotelSubmit} />
                    </Route>
                    <Route path="/activity-selection">
                        <ActivitySelection handleSubmit={this.handleActivitySubmit} />
                    </Route>
                    <Route path="/itinerary">
                        <Itinerary tripID={this.state.viewTripID}/>
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