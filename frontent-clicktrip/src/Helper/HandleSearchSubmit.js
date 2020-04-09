import {fetchFlights} from './FetchFlights'

export function handleSearchSubmit(userID) {
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
    .then(resp => fetchFlights())
    .then(resp => window.location = '/flight-selection')
}