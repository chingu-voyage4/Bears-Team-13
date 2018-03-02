import React, {Component} from 'react';
import axios from 'axios';

class Focus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: '',
            hasTodo: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getNewTodo = this.getNewTodo.bind(this);
    }

    componentWillMount() {
        //hit server to check if there is a current focus to preload into component before rendering
    }

    getTodo() {
        return (
            <div className="center-horizontally focus-element">
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

    showTodo() {
        return (
            <div className="current-focus-wrapper focus-element">
                <div className="current-focus">
                    <div className="today-text">
                        Today
                    </div>
                    <div>
                        <div className="check-box stack">
                            <i className="far fa-square"></i>
                        </div>
                        <div className="focus-text stack">
                            {this.state.focus}
                        </div>
                        <div className="remove-focus stack" onClick={this.getNewTodo}>
                            <i className="fas fa-trash-alt"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            this.state.hasTodo ? this.showTodo() : this.getTodo() 
        );
    }

    onInputChange(focus) {
        this.setState({focus});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({hasTodo: true});
        axios.post('/submitFocus?focus=' + this.state.focus);
    }

    getNewTodo() {
        //TODO
        //call back end to delete the stored focus
        this.setState({hasTodo: false, focus: ''});
    }
}

export default Focus;