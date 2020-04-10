import React from 'react';
import { Switch, Route } from "react-router-dom";
import AutoSearch from './AutoSearch';
import DestinationSearch from './DestinationSearch';
import ManualSearch from './ManualSearch';
import FlightSelection from './FlightSelection';
import HotelSelection from './HotelSelection';
import ActivitySelection from './ActivitySelection';
import Itinerary from './Itinerary';
import TripsContainer from './TripsContainer'
import { jsonToArray, getCheckedRadioValue, getCheckedCheckboxValues, getFormData } from './Helper/HelperMethods'
import { handleSearchSubmit } from './Helper/HandleSearchSubmit'
import { handleFlightSubmit } from './Helper/HandleFlightSubmit'
import { handleHotelSubmit } from './Helper/HandleHotelSubmit'
import { handleActivitySubmit } from './Helper/HandleActivitySubmit'
const BASEURL = 'http://localhost:3000'

class ViewContainer extends React.Component {
    // NOTE: NEED TO ADD IN CHECK TO MAKE SURE SESSION STORAGE WORKS ON USER'S MACHINE!!!

    // sessionStorage:
    //      userID          user's id
    //      tripID          id of active trip
    //      activeTrip      active trip information
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
        let flight = getCheckedRadioValue()
        let tripID = window.sessionStorage.getItem('tripID')
        handleFlightSubmit(tripID,flight)
    }

    handleHotelSubmit = (e) => {
        e.preventDefault()
        let hotel = getCheckedRadioValue()
        let tripID = window.sessionStorage.getItem('tripID')
        handleHotelSubmit(tripID,hotel)
    }

    handleActivitySubmit = (e) => {
        e.preventDefault()
        let activities = getCheckedCheckboxValues()
        let tripID = window.sessionStorage.getItem('tripID')
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
        window.location = '/itinerary'
    }

    deleteItinerary = (e) => {
        let id = e.target.getAttribute('trip-id')
        fetch(`http://localhost:3000/trips/${id}`,{
            method: 'DELETE'
        })
        .then(() => window.location ='/trips')
    }

    ///////////////////////////////////////////////////////////////////////////////
    /////////// RENDER VIEW ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    
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
                    <Route exact path="/itinerary">
                        <Itinerary 
                            deleteItinerary={this.deleteItinerary}
                        />
                    </Route>
                    <Route path="/trips">
                        <TripsContainer 
                            deleteItinerary={this.deleteItinerary}
                        />
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