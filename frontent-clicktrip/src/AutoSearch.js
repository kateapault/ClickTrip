import React from 'react';
import { Form } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
 
// import "react-datepicker/dist/react-datepicker.css";
class AutoSearch extends React.Component {
    constructor() {
        super()
        this.state = {
            num_people:'',
            budget:'',
            start_date:'',
            end_date:''
        }
    }

    handleChange = () => {

    }

    render() {
        return (

            <div>
            <Form>
                {/* <Form.Group widths="equal"> */}
                    <Form.Input fluid onChange={this.handleChange} label="Budget" placeholder="1200" value={this.state.name} name="budget" />
                    <Form.Input fluid onChange={this.handleChange} label="Number of people" placeholder="2" name="num_people" />
                    <Form.Input fluid onChange={this.handleChange} label="start date" placeholder="mm/dd/yyyy" name="start_date" />
                    <Form.Input fluid onChange={this.handleChange} label="end date" placeholder="mm/dd/yyyy" name="end_date" />
                {/* </Form.Group> */}
            </Form>
            
            
            <a href="/itinerary">link to itinerary</a>
            </div>
        );
    }
}

export default AutoSearch;