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
            <div className={`center-horizontally focus-element ${this.props.visibility}`}>
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
            <div className={`current-focus-wrapper focus-element fadeIn ${this.props.visibility}`}>
                <div className="current-focus">
                    <div className="today-text">
                        Today
                    </div>
                    <div>
                        <div className="check-box stack" onClick={this.completeTodo}>
                            <div className={this.state.group1}>
                                <i class="fa fa-square-o" aria-hidden="true"></i>
                            </div>
                            <div className={this.state.group2}>
                                <i class="fa fa-check-square-o" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className={this.state.todoTextClasses}>
                            {this.state.focus}
                        </div>
                        <div className="remove-focus stack" onClick={this.getNewTodo}>
                            <div className={this.state.group1}>
                                <i class="fa fa-trash-o" aria-hidden="true"></i>
                            </div>
                            <div className={this.state.group2}>
                                <i class="fa fa-plus" aria-hidden="true"></i>
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
    }

    getNewTodo() {
        this.setState({hasTodo: false, focus: '', isComplete: false, group1: '', group2: 'hidden', todoTextClasses: 'focus-text stack'});
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