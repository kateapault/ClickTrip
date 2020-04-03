import React from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import AutoSearch from './AutoSearch'
import DestinationSearch from './DestinationSearch'

class ViewContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'search'      // search, selection, itinerary, profile, login/signup
        }
    }

    componentDidMount() {
        this.setState({view:'search'})
    }

    handleClickToItinerary = () => {
        this.setState({view:'itinerary'})
    }

    render() {

        return (
            <div className="view">
                --view container --
                <Switch>
                    <Route exact path="/">
                        <AutoSearch />
                    </Route>
                    <Route exact path='/destination-search'>
                        <DestinationSearch />
                    </Route>
                    <Route exact path='/budget-search'>
                        price search
                    </Route>
                    <Route path="/flight-selection">
                        flight selection
                    </Route>
                    <Route path="/hotel-selection">
                        hotel selection
                    </Route>
                    <Route path="/activity-selection">
                        activity selection
                    </Route>
                    <Route path="/itinerary">
                        itinerary
                    </Route>
                    <Route path="/trips">
                        trips
                    </Route>
                    <Route path="/profile">
                        profile
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default ViewContainer;