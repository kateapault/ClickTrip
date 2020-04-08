import React from 'react';
import { Form } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import history from './history'
 
// import "react-datepicker/dist/react-datepicker.css";
class AutoSearch extends React.Component {
    constructor() {
        super()
        this.state = {
            num_people:'',
            budget:'',
            start_date:'',
            end_date:'',
            origin_city_iata: ''
        }
    }

    handleSearchFlights = () => {
        
    }

    render() {
        return (

            <div>
                <form>
                    I want a vaction for <input type="number" name="num_people" placeholder="2" /> people
                    <br></br>
                    for under $<input type="number" name="budget" placeholder="1200" />
                    <br></br>
                    from <input type="date" name="start_date" /> to <input type="date" name="end_date" />
                    <br></br>
                    flying out of <input type="text" name="origin_city_iata" placeholder="NYC" />
                    <br></br>
                    <button onClick={this.props.handleClick}>Take me away!</button>
                </form>
            </div>
        );
    }
}

export default AutoSearch;