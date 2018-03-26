import React, {Component} from 'react';
import moment from 'moment';

class Clock extends Component {
    constructor(props){
        super(props);
        this.state = {
            standardTime: '',
            miliTime:''
        }
        this.onDoubleClick = this.onDoubleClick.bind(this);
    }

    onDoubleClick() {
        //update highlight in settings
        const military = document.getElementById('24time');
        const standard = document.getElementById('12time');
        military.classList.remove('active');
        standard.classList.remove('active');
        this.props.toggle('militaryTime', !this.props.militaryTime)
        this.props.militaryTime ? standard.classList.add('active') : military.classList.add('active')
        //take in function from parent passed as prop that updates on click
    }

    // componentWillReceiveProps(nextProps) {
    //     this.props.militaryTime ? this.setState({time: moment().format('HH:mm')}) : this.setState({time: moment().format('h:mm A')})
        
    // }

    componentDidMount() {
        var self = this;
        // determine clock format
        window.setInterval(function() {
            self.setState({standardTime:moment().format('h:mm A')})
            self.setState({miliTime: moment().format('HH:mm')})
            // if (self.props.militaryTime === true) {
            //     self.setState({time: moment().format('HH:mm')});
            // }
    
            // else {
            //     self.setState({time: moment().format('h:mm A')});
            // }
        }, 1000)
    }
    

    render() {
        let display;
        this.props.militaryTime ? display = this.state.miliTime : display = this.state.standardTime;
        return (
            <div className="clock center-horizontally" onDoubleClick={this.onDoubleClick}>
            {display}
            </div>
        )
    }
}

export default Clock;