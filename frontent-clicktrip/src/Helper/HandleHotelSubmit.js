export function handleHotelSubmit(tripID,hotel) {
    
    fetch('http://localhost:3000/hotels',{
            method:'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                trip_id: tripID,
                name: hotel.name,
                address: hotel.address,
                company: hotel.company,
                price_per_night: hotel.price,
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