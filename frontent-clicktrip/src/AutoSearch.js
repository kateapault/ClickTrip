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
                <form onSubmit={this.props.handleSubmit} className="search">
                    <div>I want a vaction for <input type="number" name="num_people" placeholder="2" /> people
                    </div>
                    <div>for under $<input type="number" name="budget" placeholder="1200" />
                    </div>
                    <div>from <input type="date" name="start_date" /> to <input type="date" name="end_date" />
                    </div>
                    <div>flying out of <input type="text" name="origin_city_iata" placeholder="NYC" />
                    </div>
                    <button>Take me away!</button>
                </form>
            </div>
        );
    }
}

export default AutoSearch;