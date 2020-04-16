import React from 'react';
 
class AutoSearch extends React.Component {
    intervalID = 0

    componentDidMount() {
        // this.intervalID = setInterval(()=>{
        //     let currentSec = (new Date()).getSeconds()
        //     let count = Math.floor(currentSec/10) % 6
        //     let searchView = document.querySelector('.view')
        //     console.log(count)
        //     searchView.style.backgroundImage = `url('./images/searchbg${count}.jpg')`
        // },1000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalID)
    }

    render() {
        return (
            <div className="auto-search search">
                <h3>Instant Trip</h3>
                <form className="auto-search search" onSubmit={this.props.handleSubmit} className="search">
                    <div></div>
                    <div className="form-input">I want a vaction for <input type="number" name="num_people" placeholder="2" /> people
                    </div>
                    <div className="form-input">for under $<input type="number" name="budget" placeholder="1200" />
                    </div>
                    <div className="form-input">from <input type="date" name="start_date" /> to <input type="date" name="end_date" />
                    </div>
                    <div className="form-input">flying out of <input type="text" name="origin_city_iata" placeholder="NYC" />
                    </div>
                    <button>Take me away!</button>
                </form>
            </div>
        );
    }
}

export default AutoSearch;