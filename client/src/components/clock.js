import React, {Component} from 'react';
import moment from 'moment';

class Clock extends Component {
    constructor(props){
        super(props);
        this.state = {
            time: ''
        }
    }

    componentWillMount() {
        var currentTime = moment().format('h:mm A');
        this.setState({time: currentTime});
    }

    componentDidMount() {
        //preserve this reference inside callback
        var self = this;
        //update clock, may lengthen interval if there are performance issues but sacrifices accuracy
        window.setInterval(function() {
            var currentTime = moment().format('h:mm A');
            self.setState({time: currentTime});
        }, 1000)
    }

    render() {
        return (
            <div className='clock center-horizontally'>
                {this.state.time}    
            </div>
        )
    }
}

export default Clock;