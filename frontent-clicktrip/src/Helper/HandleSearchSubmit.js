export function handleSearchSubmit(userID,data) {
    data.destination_city_name = "Dublin"
    data.user_id = userID
    fetch('http://localhost:3000/trips',{   
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(newTrip => {
        console.log(newTrip)
        window.sessionStorage.setItem('tripID',newTrip.id)
    })
    .then(() =>
        fetch('http://localhost:3000/search-dummy-flights',{
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(flights => {
            window.sessionStorage.setItem('flights',JSON.stringify(flights))
        })
        .then(resp => window.location = '/flight-selection')
    )
}