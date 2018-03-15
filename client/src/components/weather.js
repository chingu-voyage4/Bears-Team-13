import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
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
            day5: {},
            dropdownClasses: 'dropdown-menu dropdown-menu-left dropdown-wrapper',
            showingWeather: false
        };

        this.highlightDay = this.highlightDay.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    componentDidMount() {
        var self = this;
        function showPosition(position) {
            axios.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text=%22('
            + position.coords.latitude + ',' + position.coords.longitude + ')%22)&format=json').then(function(res) {
                console.log(res.data);

                if (res.data.query.results === null) {
                    return;
                }
                //load response into state for rendering
                self.setState({
                    city: res.data.query.results.channel.location.city,
                    activeDay: res.data.query.results.channel.item.forecast[0],
                    todayHighTemp: res.data.query.results.channel.item.condition.temp,
                    todayIconClass: 'top-button-identifier wi wi-yahoo-' + res.data.query.results.channel.item.condition.code,
                    activeIconClass: 'wi wi-yahoo-' + res.data.query.results.channel.item.forecast[0].code,
                    activeTemp: res.data.query.results.channel.item.condition.temp,
                    activeDescription: res.data.query.results.channel.item.forecast[0].text,
                    activeDayName: 'Today',
                    showLowTemp: 'hidden',
                    day1: res.data.query.results.channel.item.forecast[0],
                    day1IconClass: 'wi wi-yahoo-' + res.data.query.results.channel.item.forecast[0].code,
                    day2: res.data.query.results.channel.item.forecast[1],
                    day2IconClass: 'wi wi-yahoo-' + res.data.query.results.channel.item.forecast[1].code,
                    day3: res.data.query.results.channel.item.forecast[2],
                    day3IconClass: 'wi wi-yahoo-' + res.data.query.results.channel.item.forecast[2].code,
                    day4: res.data.query.results.channel.item.forecast[3],
                    day4IconClass: 'wi wi-yahoo-' + res.data.query.results.channel.item.forecast[3].code,
                    day5: res.data.query.results.channel.item.forecast[4],
                    day5IconClass: 'wi wi-yahoo-' + res.data.query.results.channel.item.forecast[4].code,
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
            this.setState({todayHighTemp: this.state.activeTemp, todayLowTemp: '', activeDescription: this.state.day1.text, showLowTemp: 'hidden'});
        }

        else {
            this.setState({todayHighTemp: day.high, todayLowTemp: day.low, activeDescription: day.text, showLowTemp: 'low-temp'});    
        }

        this.setState({activeDayName: moment(day.date).format('dddd'), activeIconClass: 'wi wi-yahoo-' + day.code});
    }

    onFocus(event) {
        if (event.target.classList.contains('top-button-identifier')) {
            if (this.state.showingWeather) {
            this.setState({showingWeather: false, dropdownClasses: 'dropdown-menu dropdown-menu-left dropdown-wrapper'});
            }

            else {
                this.setState({showingWeather: true, dropdownClasses: 'dropdown-menu dropdown-menu-left dropdown-wrapper show'});
            }
        }
    }

    render() {
        return (
            <div className="weather-wrapper">
                <div className="btn-group" onClick={(event) => {this.onFocus(event)}}>
                    <button type="button" className="btn button-updates top-button-identifier">
                        <div className="weather-icon top-button-identifier">
                            <i className={this.state.todayIconClass}></i>
                        </div>
                        <div className="weather-temperature top-button-identifier">
                            {this.state.activeTemp}&deg;
                        </div>
                        <div className="top-button-identifier">
                            {this.state.city}
                        </div>
                    </button>
                    <div className={this.state.dropdownClasses}>
                        <div className="weather-widget-row-small">
                            <div className="city-holder">
                                <div className="city-name">
                                    {this.state.city} <span className="active-day-name">{this.state.activeDayName}</span> 
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
                                <i className={this.state.activeIconClass}></i>
                            </div>
                            <div className="large-current-temperature">
                                {this.state.todayHighTemp}&deg;<span className={this.state.showLowTemp}>{this.state.todayLowTemp}&deg;</span>
                            </div>
                        </div>
                        <div className="weather-widget-row-small"> 
                            <div className="five-day-wrapper  active-day" onClick={() => this.highlightDay(this.state.day1, true)}>
                                <div className="day-header">
                                    {this.state.day1.day}
                                </div>
                                <div className="five-day-weather-triple">
                                    <i className={this.state.day1IconClass}></i>
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
                                    <i className={this.state.day2IconClass}></i>
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
                                    <i className={this.state.day3IconClass}></i>
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
                                    <i className={this.state.day4IconClass}></i>
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
                                    <i className={this.state.day5IconClass}></i>
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