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

    componentDidMount() {
        var self = this;
        //set state before function to prevent clock render delay
        self.setState({standardTime:moment().format('h:mm A')});
        self.setState({miliTime: moment().format('HH:mm')});
        setInterval(function(){
            self.setState({standardTime:moment().format('h:mm A')});
            self.setState({miliTime: moment().format('HH:mm')});
        }, 1000);
    }
    
    render() {
        return (
            <div className="clock center-horizontally" onDoubleClick={this.onDoubleClick}>
                {this.props.militaryTime ? this.state.miliTime : this.state.standardTime}
            </div>
        )
    }
}

export default Clock;