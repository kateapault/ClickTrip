export function fetchHotels() {  
    // callback should be redirect to activity-selection  
    fetch('http://localhost:3000/search-dummy-hotels',{
        method: 'POST'
    })
    .then(response => response.json())
    .then(hotels => {
        window.sessionStorage.setItem('hotels',JSON.stringify(hotels))
    })
}