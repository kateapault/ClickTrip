export function fetchFlights(callback) {    
    // callback is redirect
    fetch('http://localhost:3000/search-dummy-flights',{
        method: 'POST'
    })
    .then(response => response.json())
    .then(flights => {
        window.sessionStorage.setItem('flights',JSON.stringify(flights))
    })
    callback()
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