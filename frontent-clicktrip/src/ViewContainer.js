import React from 'react';
import { Switch, Route, useHistory } from "react-router-dom";
import AutoSearch from './AutoSearch';
import DestinationSearch from './DestinationSearch';
import ManualSearch from './ManualSearch';
import FlightSelection from './FlightSelection';
import ReturnFlightSelection from './ReturnFlightSelection';
import HotelSelection from './HotelSelection';
import ActivitySelection from './ActivitySelection';
import Itinerary from './Itinerary';
import TripsContainer from './TripsContainer'
import CostWidget from './CostWidget'
import { getJSON, setJSON, jsonToArray, getCheckedRadioValue, 
        getCheckedCheckboxValues, getFormData, getEdit, setEdit, editBool } 
        from './Helper/HelperMethods'
import { handleSearchSubmit } from './Helper/HandleSearchSubmit'
import { handleFlightSubmit } from './Helper/HandleFlightSubmit'
import { handleReturnFlightSubmit } from './Helper/HandleReturnFlightSubmit'
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
    //      returnFlights   round trip options
    //      hotels          response from hotel search
    //      activites       response from activity search
    //      edit            boolean; whether edit mode is on (1) or off (0)

    state = {
        userID: 1,
        tripID: null,
        activeTrip: null,
        trips: [],
        flights: [],
        returnFlights: [],
        hotels: [],
        activities: [],
        edit: null,
        view: 'autoSearch'
    }

    componentDidMount() {

    }

    /// SUBMIT HANDLING ///////////////////////////////////////////////////////////

    handleSearchSubmit = (e) => {
        e.preventDefault()
        this.setState({
            edit:false
        })
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

    handleReturnFlightSubmit = (e) => {
        e.preventDefault()
        let flight = getCheckedRadioValue
        let tripID = window.sessionStorage.getItem('tripID')
        handleReturnFlightSubmit(tripID,flight)
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
            fetch(`${BASEURL}/activities`,{
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

    /// EDIT HANDLING /////////////////////////////////////////

    toggleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
        let edit = getEdit()
        setEdit(Math.abs(edit-1))
        console.log(`edit state is now ${this.state.edit}`)
        console.log(` with window session storage edit is now ${getEdit()}`)
    }

    handleFlightEdit = (e) => {
        e.preventDefault()
        let flight = getCheckedRadioValue()
        let trip = getJSON('trip')
        trip.flights[0] = flight
        setJSON('trip',trip)
        window.location = '/itinerary'
    }

    handleReturnFlightEdit = (e) => {
        e.preventDefault()
        let flight = getCheckedRadioValue()
        let trip = getJSON('trip')
        trip.flights[1] = flight
        setJSON('trip',trip)
        window.location = '/itinerary'
    }

    handleHotelEdit = (e) => {
        e.preventDefault()
        let hotel = getCheckedRadioValue()
        let trip = getJSON('trip')
        trip.hotels[0] = hotel
        setJSON('trip',trip)
        window.location = '/itinerary'
    }

    handleActivityEdit = (e) => {
        e.preventDefault()
        let activities = getCheckedCheckboxValues()
        let trip = getJSON('trip')
        trip.activities = activities
        setJSON('trip',trip)
        window.location = '/itinerary'
    }

    handleSaveTripChanges = () => {
        let tripID = window.sessionStorage.getItem('tripID')
        let trip = window.sessionStorage.getItem('trip')
        fetch(`${BASEURL}/trips/${tripID}`,{
            method: 'PUT',
            body: trip
        })
        .then(resp => resp.json())
        .then(trip => console.log(trip))
        .then(this.toggleEdit())
        .then(alert("Trip changes saved successfully!"))
    }

    deleteItinerary = (e) => {
        let id = e.target.getAttribute('trip-id')
        fetch(`${BASEURL}/trips/${id}`,{
            method: 'DELETE'
        })
        .then(() => window.location ='/trips')
        .then(alert("Trip deleted"))
    }

    cycleSearchBackground = () => {
        let currentSec = (new Date()).getSeconds()
        let searchView = document.querySelector('.view')
        console.log(searchView)
        searchView.style.backgroundImage = `./images/searchbg${Math.floor(currentSec/10)%6}.jpg`
    }

    filterByAirports = (flights, origin, destination) => {
        let myFlights = flights.filter(flight => 
            (flight.departure_airport === origin) && (flight.arrival_airport === destination)
        )
        return myFlights
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
                            <CostWidget />
                            <FlightSelection 
                                handleSubmit={editBool() ? 
                                            this.handleFlightEdit 
                                            : this.handleFlightSubmit} 
                                flights={window.sessionStorage.getItem('flights') ? this.filterByAirports(jsonToArray(JSON.parse(window.sessionStorage.getItem('flights'))),'NYC','DUB') : []}
                            />
                        </div>
                    </Route>
                    <Route path="/return-flight-selection">
                        <div className="flights-view view">
                            <CostWidget />
                            <ReturnFlightSelection 
                                handleSubmit={editBool() ? 
                                        this.handleReturnFlightEdit 
                                        : this.handleReturnFlightSubmit} 
                                flights={window.sessionStorage.getItem('flights') ? this.filterByAirports(jsonToArray(JSON.parse(window.sessionStorage.getItem('flights'))),'DUB','NYC') : []}
                                edit={editBool()}
                            /> 
                        </div>
                    </Route>
                    <Route path="/hotel-selection">
                        <div className="hotels-view view">
                            <CostWidget />
                            <HotelSelection 
                                handleSubmit={editBool() ? 
                                        this.handleHotelEdit 
                                        : this.handleHotelSubmit} 
                                edit={editBool()}
                            />
                        </div>
                    </Route>
                    <Route path="/activity-selection">
                        <div className="activities-view view">
                            <CostWidget />
                            <ActivitySelection 
                                handleSubmit={editBool() ? 
                                        this.handleActivityEdit
                                        : this.handleActivitySubmit} 
                                edit={editBool()}
                            />
                        </div>
                    </Route>
                    <Route exact path="/itinerary">
                        <div className="itinerary-view view">
                            <CostWidget />
                            <div className="spacer" />
                            <Itinerary 
                                deleteItinerary={this.deleteItinerary}
                                toggleEdit={this.toggleEdit}
                                edit={this.state.edit}
                                sessionEdit={editBool()}
                                saveTripChanges={this.handleSaveTripChanges}
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