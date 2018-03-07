import React, {Component} from 'react';
import axios from 'axios';
class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            activeDay: {},
            day1: {},
            day2: {},
            day3: {},
            day4: {},
            day5: {}
        };
    }

    componentDidMount() {
        var self = this;
        function showPosition(position) {
            axios.get('http://api.openweathermap.org/data/2.5/forecast?lat=' + position.coords.latitude + 
            '&lon=' + position.coords.longitude + '&APPID=5715e95a799c60fbf518d7c4c42d0087&units=imperial').then(function(res) {
            console.log(res.data);
            self.setState({
                city: res.data.city.name,
                day1: res.data.list[0],
                day2: res.data.list[8],
                day3: res.data.list[16],
                day4: res.data.list[24],
                day5: res.data.list[32]
            });
        });
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }

        else {
            console.log('no geo');
        }
    }
    

    render() {
        return (
            <div className="weather-wrapper">
                <div className="btn-group">
                    <button type="button" className="btn dropdown-toggle button-updates" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div className="weather-icon">
                            <i className="fas fa-sun"></i>
                        </div>
                        <div className="weather-temperature">
                            70&deg;
                        </div>
                        <div>
                            {this.state.city}
                        </div>
                    </button>
                    <div className="dropdown-menu dropdown-menu-left dropdown-wrapper">
                        <div className="weather-widget-row-small">
                            <div className="city-holder">
                                <div className="city-name">
                                    Miami
                                </div>
                                <div className="current-weather-description">
                                    Clear
                                </div>
                            </div>
                            <div className="more-options-ellipsis-wrapper">
                                <div className="more-options-ellipsis">
                                    ...
                                </div>
                            </div>    
                        </div>
                        <div className="weather-widget-row-large">
                            <div className="large-weather-icon">
                                <i className="fas fa-sun"></i>
                            </div>
                            <div className="large-current-temperature">
                                70&deg;
                            </div>
                        </div>
                        <div className="weather-widget-row-small">
                            <div className="five-day-wrapper">
                                <div className="day-header">
                                    FRI
                                </div>
                                <div className="five-day-weather-triple">
                                    <i className="fas fa-bolt"></i>
                                </div>
                                <div className="five-day-weather-triple">
                                    70&deg;
                                </div>
                                <div className="five-day-weather-triple">
                                    65&deg;
                                </div>
                            </div>
                            <div className="five-day-wrapper">
                                <div className="day-header">
                                    SAT
                                </div>
                                <div className="five-day-weather-triple">
                                    <i className="fas fa-cloud"></i>
                                </div>
                                <div className="five-day-weather-triple">
                                    70&deg;
                                </div>
                                <div className="five-day-weather-triple">
                                    65&deg;
                                </div>
                            </div>
                            <div className="five-day-wrapper">
                                <div className="day-header">
                                    SUN
                                </div>
                                <div className="five-day-weather-triple">
                                    <i className="fas fa-sun"></i>
                                </div>
                                <div className="five-day-weather-triple">
                                    70&deg;
                                </div>
                                <div className="five-day-weather-triple">
                                    65&deg;
                                </div>
                            </div>
                            <div className="five-day-wrapper">
                                <div className="day-header">
                                    MON
                                </div>
                                <div className="five-day-weather-triple">
                                    <i className="fas fa-bolt"></i>
                                </div>
                                <div className="five-day-weather-triple">
                                    70&deg;
                                </div>
                                <div className="five-day-weather-triple">
                                    65&deg;
                                </div>
                            </div>
                            <div className="five-day-wrapper active-day">
                                <div className="day-header">
                                    TUE
                                </div>
                                <div className="five-day-weather-triple">
                                    <i className="fas fa-cloud"></i>
                                </div>
                                <div className="five-day-weather-triple">
                                    70&deg;
                                </div>
                                <div className="five-day-weather-triple">
                                    65&deg;
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Weather;