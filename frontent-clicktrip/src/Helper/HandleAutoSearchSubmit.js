export function handleAutoSearchSubmit(userID,data) {
    data.user_id = userID
    data.destination_city_name = "Madrid"
    fetch('http://localhost:3000/trips',{   
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(newTrip => {
        window.sessionStorage.setItem('tripID',newTrip.id)
        fetch('http://localhost:3000/flights',{
            method:'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(
                {
                    trip_id: newTrip.id,
                    departure_airport: "NYC",
                    arrival_airport: "MAD",
                    departure_date: "05-01-2020",
                    arrival_date: "05-02-2020",
                    departure_time: "17:23",
                    arrival_time: "08:45",
                    airline: "DLT",
                    flight_num: "1118",
                    ticket_price: "157.84",
                    num_stops: "1",
                }
            )
        })
        fetch('http://localhost:3000/flights',{
            method:'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(
                {
                    trip_id: newTrip.id,
                    departure_airport: "MAD",
                    arrival_airport: "NYC",
                    departure_date: "05-10-2020",
                    arrival_date: "05-10-2020",
                    departure_time: "15:02",
                    arrival_time: "16:52",
                    airline: "IA",
                    flight_num: "22",
                    ticket_price: "203.27",
                    num_stops: "0",
                }
            )
        })
        fetch('http://localhost:3000/hotels',{
            method:'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                trip_id: newTrip.id,
                name: "Hotel Santo Domingo",
                address: "Calle de San Bernardo, 1, 28013 Madrid, Spain",
                company: "Independent",
                price_per_night: "80.29",
            })
        })
        fetch('http://localhost:3000/activities',{
            method:'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                trip_id: newTrip.id,
                name: "Royal Palace of Madrid",
                location: "Calle de Bailén, s/n, 28071 Madrid, Spain",
                category: "landmark, museum",
                ticket_price: "12.00",
                open_time: "10:00",
                close_time: "18:00",
            })
        })
        fetch('http://localhost:3000/activities',{
            method:'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                trip_id: newTrip.id,
                name: "National Archeological Museum",
                location: "Calle de Serrano, 13, 28001 Madrid, Spain",
                category: "museum",
                ticket_price: "18.00",
                open_time: "09:30",
                close_time: "17:30",
            })
        })
        fetch('http://localhost:3000/activities',{
            method:'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                trip_id: newTrip.id,
                name: "Casa Labra",
                location: "Calle de Tetuán, 12, 28001 Madrid, Spain",
                category: "food, drink",
                ticket_price: "0.00",
                open_time: "13:00",
                close_time: "04:30",
            })
        })
    })
    .then(resp => window.location = '/itinerary')
}