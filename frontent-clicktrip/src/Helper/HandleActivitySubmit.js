export function handleActivitySubmit(tripID,activities) {
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
}