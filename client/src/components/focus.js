import React, {Component} from 'react';
import axios from 'axios';

class Focus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getTodo() {

    }

    showTodo() {

    }

    render() {
        return (
            <div className="center-horizontally">
                <div className="focus-question">
                    What is your focus today?
                </div>
                <div>
                    <form id="focus-input" onSubmit={this.handleSubmit}>
                        <input type="text" id="focus-item" name="focus-item" value={this.state.focus} 
                        onChange={event => this.onInputChange(event.target.value)}
                        />
                    </form>
                </div>
            </div>
        ); 
    }

    onInputChange(focus) {
        this.setState({focus});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('/submitFocus?focus=' + this.state.focus);
    }
}

export default Focus;