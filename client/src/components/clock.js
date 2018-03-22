import React, {Component} from 'react';
import moment from 'moment';

class Clock extends Component {
    constructor(props){
        super(props);
        this.state = {
            time: '',
        }
        this.onDoubleClick = this.onDoubleClick.bind(this);
    }

    onDoubleClick() {
        console.log('sdfdsffsdsfd');
        //take in function from parent passed as prop that updates on click
    }

    componentWillMount() {
        //determine clock format
        if (this.props.militaryTime === true) {
            var currentTime = moment().format('hh:mm');
        }

        else {
            var currentTime = moment().format('h:mm A');
            this.setState({time: currentTime});    
        }
        
    }

    componentDidMount() {

        var self = this;
        
        //determine clock format
        window.setInterval(function() {
            
            if (self.props.militaryTime === true) {
                var currentTime = moment().format('hh:mm');
            }
    
            else {
                var currentTime = moment().format('h:mm A');
            }

            self.setState({time: currentTime});
        }, 1000)
    }

    render() {
        return (
            <div className="clock center-horizontally" onDoubleClick={this.onDoubleClick}>
                {this.state.time}    
            </div>
        )
    }
}

export default Clock;