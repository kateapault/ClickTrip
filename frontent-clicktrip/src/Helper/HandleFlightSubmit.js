export function handleFlightSubmit(tripID,flight) {
    fetch('http://localhost:3000/flights',{
            method:'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                trip_id: tripID,
                departure_airport: flight.departure_airport,
                arrival_airport: flight.arrival_airport,
                departure_date: flight.departure_date,
                arrival_date: flight.arrival_date,
                departure_time: flight.departure_time,
                arrival_time: flight.arrival_time,
                airline: flight.airline,
                flight_num: flight.flight_number,
                ticket_price: flight.price,
                num_stops: flight.stops,
            })
        })
        .then(() =>
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