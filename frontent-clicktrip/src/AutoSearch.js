import React from 'react';
 
class AutoSearch extends React.Component {
    intervalID = 0

    componentDidMount() {
        this.intervalID = setInterval(()=>{
            let currentSec = (new Date()).getSeconds()
            let count = Math.floor(currentSec/10) % 6
            let searchView = document.querySelector('.view')
            console.log(count)
            searchView.style.backgroundImage = `url('./images/searchbg${count}.jpg')`
        },1000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalID)
    }

    render() {
        return (
            <div className="auto-search search">
                <form onSubmit={this.props.handleSubmit}>
                    I want a vaction for <input type="number" name="num_people" placeholder="2" /> people
                    <br></br>
                    for under $<input type="number" name="budget" placeholder="1200" />
                    <br></br>
                    from <input type="date" name="start_date" /> to <input type="date" name="end_date" />
                    <br></br>
                    flying out of <input type="text" name="origin_city_iata" placeholder="NYC" />
                    <br></br>
                    <button>Take me away!</button>
                </form>
            </div>
        );
    }
}

export default AutoSearch;