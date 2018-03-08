import React, {Component} from 'react';
import axios from 'axios';
class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            activeDay: {},
            activeTemp: '',
            activeDescription: '',
            todayHighTemp: '',
            todayLowTemp: '',
            day1: {},
            day2: {},
            day3: {},
            day4: {},
            day5: {}
        };

        this.highlightDay = this.highlightDay.bind(this);
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
                    activeDay: res.data.query.results.channel.item.forecast[0],
                    todayHighTemp: res.data.query.results.channel.item.condition.temp,
                    activeTemp: res.data.query.results.channel.item.condition.temp,
                    activeDescription: res.data.query.results.channel.item.forecast[0].text,
                    day1: res.data.query.results.channel.item.forecast[0],
                    day2: res.data.query.results.channel.item.forecast[1],
                    day3: res.data.query.results.channel.item.forecast[2],
                    day4: res.data.query.results.channel.item.forecast[3],
                    day5: res.data.query.results.channel.item.forecast[4],
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

    highlightDay(day, isToday) {
        if (isToday) {

        }

        else {
            this.setState({todayHighTemp: day.high, todayLowTemp: day.low, activeDescription: day.text});    
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
                            {this.state.activeTemp}&deg;
                        </div>
                        <div>
                            {this.state.city}
                        </div>
                    </button>
                    <div className="dropdown-menu dropdown-menu-left dropdown-wrapper">
                        <div className="weather-widget-row-small">
                            <div className="city-holder">
                                <div className="city-name">
                                    {this.state.city} 
                                </div>
                                <div className="current-weather-description">
                                    {this.state.activeDescription}
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
                                {this.state.todayHighTemp}&deg;<span className="low-temp">{this.state.todayLowTemp}&deg;</span>
                            </div>
                        </div>
                        <div className="weather-widget-row-small"> 
                            <div className="five-day-wrapper  active-day" onClick={() => this.highlightDay(this.state.day1, true)}>
                                <div className="day-header">
                                    {this.state.day1.day}
                                </div>
                                <div className="five-day-weather-triple">
                                    <i className="fas fa-bolt"></i>
                                </div>
                                <div className="five-day-weather-triple">
                                    {this.state.day1.high}&deg;
                                </div>
                                <div className="five-day-weather-triple">
                                    {this.state.day1.low}&deg;
                                </div>
                            </div>
                            <div className="five-day-wrapper" onClick={() => this.highlightDay(this.state.day2, false)}>
                                <div className="day-header">
                                    {this.state.day2.day}
                                </div>
                                <div className="five-day-weather-triple">
                                    <i className="fas fa-cloud"></i>
                                </div>
                                <div className="five-day-weather-triple">
                                    {this.state.day2.high}&deg;
                                </div>
                                <div className="five-day-weather-triple">
                                    {this.state.day2.low}&deg;
                                </div>
                            </div>
                            <div className="five-day-wrapper" onClick={() => this.highlightDay(this.state.day3, false)}>
                                <div className="day-header">
                                    {this.state.day3.day}
                                </div>
                                <div className="five-day-weather-triple">
                                    <i className="fas fa-sun"></i>
                                </div>
                                <div className="five-day-weather-triple">
                                    {this.state.day3.high}&deg;
                                </div>
                                <div className="five-day-weather-triple">
                                    {this.state.day3.low}&deg;
                                </div>
                            </div>
                            <div className="five-day-wrapper" onClick={() => this.highlightDay(this.state.day4, false)}>
                                <div className="day-header">
                                    {this.state.day4.day}
                                </div>
                                <div className="five-day-weather-triple">
                                    <i className="fas fa-bolt"></i>
                                </div>
                                <div className="five-day-weather-triple">
                                    {this.state.day4.high}&deg;
                                </div>
                                <div className="five-day-weather-triple">
                                    {this.state.day4.low}&deg;
                                </div>
                            </div>
                            <div className="five-day-wrapper" onClick={() => this.highlightDay(this.state.day5, false)}>
                                <div className="day-header">
                                    {this.state.day5.day}
                                </div>
                                <div className="five-day-weather-triple">
                                    <i className="fas fa-cloud"></i>
                                </div>
                                <div className="five-day-weather-triple">
                                    {this.state.day5.high}&deg;
                                </div>
                                <div className="five-day-weather-triple">
                                    {this.state.day5.low}&deg;
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