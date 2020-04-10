export function handleSearchSubmit(userID,data) {
    fetch('http://localhost:3000/search-dummy-flights',{
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(flights => {
        window.sessionStorage.setItem('flights',JSON.stringify(flights))
    })
    .then(() =>
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
        .then(resp => window.location = '/flight-selection')
    )
}