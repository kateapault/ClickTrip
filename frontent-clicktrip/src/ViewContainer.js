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
let backgroundImage = {
    flight: 'flights-view',
    hotels: 'hotels-view',
    activities: 'activities-view',
}


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

    state = {
        bg: null,
    }

    setBackgroundImage = (string) => {
        this.setState({
            bg: string
        })
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

    cycleSearchBackground = () => {
        let currentSec = (new Date()).getSeconds()
        let searchView = document.querySelector('.view')
        console.log(searchView)
        searchView.style.backgroundImage = `./images/searchbg${Math.floor(currentSec/10)%6}.jpg`
    }

    ///////////////////////////////////////////////////////////////////////////////
    /////////// RENDER VIEW ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    
    render() {
        
        return (
            <div className="view-container">
                <Switch>
                    <Route exact path="/">
                        <div className="auto-search-view view">
                            <AutoSearch 
                                handleSubmit={this.handleSearchSubmit} 
                                cycleBackground={this.cycleSearchBackground}
                            />
                        </div>
                    </Route>
                    <Route exact path='/destination-search'>
                        <div className="destination-search-view view">
                            <DestinationSearch 
                                handleSubmit={this.handleSearchSubmit} 
                                cycleBackground={this.cycleSearchBackground}
                            />
                        </div>
                    </Route>
                    <Route exact path='/budget-search'>
                        <div className="manual-search-view view">
                            <ManualSearch 
                                handleSubmit={this.handleSearchSubmit} 
                                cycleBackground={this.cycleSearchBackground}
                            />
                        </div>
                    </Route>
                    <Route path="/flight-selection">
                        <div className="flights-view view">
                        <FlightSelection 
                            handleSubmit={this.handleFlightSubmit} 
                            flights={window.sessionStorage.getItem('flights') ? jsonToArray(JSON.parse(window.sessionStorage.getItem('flights'))) : []}
                        />
                        </div>
                    </Route>
                    <Route path="/hotel-selection">
                        <div className="hotels-view view">
                        <HotelSelection handleSubmit={this.handleHotelSubmit} />
                        </div>
                    </Route>
                    <Route path="/activity-selection">
                        <div className="activities-view view">
                        <ActivitySelection handleSubmit={this.handleActivitySubmit} />
                        </div>
                    </Route>
                    <Route exact path="/itinerary">
                        <div className="itinerary-view view">
                        <Itinerary 
                            deleteItinerary={this.deleteItinerary}
                        />
                        </div>
                    </Route>
                    <Route path="/trips">
                        <div className="trips-view view">
                        <TripsContainer 
                            deleteItinerary={this.deleteItinerary}
                        />
                        </div>
                    </Route>
                    <Route path="/profile view">
                        <div className="profile-view">
                        profile
                        </div>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default ViewContainer;