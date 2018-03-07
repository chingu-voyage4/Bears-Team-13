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
            axios.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text=%22('
            + position.coords.latitude + ',' + position.coords.longitude + ')%22)&format=json').then(function(res) {
                console.log(res.data);
                //load response into state for rendering
                self.setState({
                    city: res.data.query.results.channel.location.city,
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