export function fetchFlights(callback) { 
    // callback should be redirect to itinerary   
    fetch('http://localhost:3000/search-dummy-activities',{
        method: 'POST'
    })
    .then(response => response.json())
    .then(activities => {
        window.sessionStorage.setItem('activities',JSON.stringify(activities))
    })
    callback()
}