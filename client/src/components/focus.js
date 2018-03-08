import React, {Component} from 'react';
// import axios from 'axios';

class Focus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: '',
            hasTodo: false,
            isComplete: false,
            todoTextClasses: 'focus-text stack',
            group1: '',
            group2: 'hidden'
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getNewTodo = this.getNewTodo.bind(this);
        this.completeTodo = this.completeTodo.bind(this);
    }

    componentWillMount() {
        const getLocalFocus = localStorage.getItem('focus');
        if(JSON.parse(getLocalFocus) !== ''){
        getLocalFocus && this.setState({
            focus: JSON.parse(getLocalFocus),
            hasTodo: true
        });
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('focus', JSON.stringify(nextState.focus));
    }

    setFocus() {
        return (
            <div className="center-horizontally focus-element">
                <div className="focus-question">
                    What is your main focus for today?
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

    showFocus() {
        return (
            <div className="current-focus-wrapper focus-element">
                <div className="current-focus">
                    <div className="today-text">
                        Today
                    </div>
                    <div>
                        <div className="check-box stack" onClick={this.completeTodo}>
                            <div className={this.state.group1}>
                                <i className="far fa-square"></i>
                            </div>
                            <div className={this.state.group2}>
                                <i className="far fa-check-square"></i>
                            </div>
                        </div>
                        <div className={this.state.todoTextClasses}>
                            {this.state.focus}
                        </div>
                        <div className="remove-focus stack" onClick={this.getNewTodo}>
                            <div className={this.state.group1}>
                                <i className="fas fa-trash-alt"></i>
                            </div>
                            <div className={this.state.group2}>
                                <i className="fas fa-plus"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            this.state.hasTodo ? this.showFocus() : this.setFocus() 
        );
    }

    onInputChange(focus) {
        this.setState({focus});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({hasTodo: true});
        //axios.post('/submitFocus?focus=' + this.state.focus);
    }

    getNewTodo() {
        //TODO
        //call back end to delete the stored focus
        this.setState({hasTodo: false, focus: ''});
    }

    completeTodo() {
        if (this.state.isComplete) {
            this.setState({todoTextClasses: 'focus-text stack', group1: '', group2: 'hidden',isComplete: false});
        }

        else {
            this.setState({todoTextClasses: 'focus-text stack crossout', group1: 'hidden', group2: '', isComplete: true});
        }
    }
}

export default Focus;