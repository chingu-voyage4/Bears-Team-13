import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import WeatherSettings from './weather-settings';

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: '',
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
            showFahr: true
        };

        this.highlightDay = this.highlightDay.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.changeUnits = this.changeUnits.bind(this);
        this.showPosition = this.showPosition.bind(this);
        this.onDoubleClick = this.onDoubleClick.bind(this);
        this.updateCity = this.updateCity.bind(this);
        this.submitNewCity = this.submitNewCity.bind(this);
    }

    convertToC(value) { 
        return Math.round((parseInt(value) - 32) * (5/9), 0);
    }

    showPosition(position) {
        var self = this;

        if (position.coords) {
            var queryString = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text=%22('
                + position.coords.latitude + ',' + position.coords.longitude + ')%22)&format=json';
        }

        else {
            var queryString = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D' + position + '%20and%20u%3D%22f%22&format=json';
        }
        

        axios.get(queryString).then(function(res) {

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
                activeDayName: moment().format('dddd'),
                showingDay: '1',
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
                day5IconClass: 'wi wi-yahoo-' + res.data.query.results.channel.item.forecast[4].code
            });

            //build object to hold temperature in units that aren't currently being displayed
            var altUnits = {
                activeTemp: 0,
                '0': {},
                '1': {},
                '2': {},
                '3': {},
                '4': {},
            };
            
            altUnits.activeTemp = self.convertToC(res.data.query.results.channel.item.condition.temp);
            altUnits['0'].high = self.convertToC(res.data.query.results.channel.item.forecast[0].high);
            altUnits['0'].low = self.convertToC(res.data.query.results.channel.item.forecast[0].low);
            altUnits['1'].high = self.convertToC(res.data.query.results.channel.item.forecast[1].high);
            altUnits['1'].low = self.convertToC(res.data.query.results.channel.item.forecast[1].low);
            altUnits['2'].high = self.convertToC(res.data.query.results.channel.item.forecast[2].high);
            altUnits['2'].low = self.convertToC(res.data.query.results.channel.item.forecast[2].low);
            altUnits['3'].high = self.convertToC(res.data.query.results.channel.item.forecast[3].high);
            altUnits['3'].low = self.convertToC(res.data.query.results.channel.item.forecast[3].low);
            altUnits['4'].high = self.convertToC(res.data.query.results.channel.item.forecast[4].high);
            altUnits['4'].low = self.convertToC(res.data.query.results.channel.item.forecast[4].low);
            self.setState({altUnits: altUnits});
        });
    }

    componentDidMount() {
        var self = this;
        //check to make sure geolocation is enabled, then call function to get weather data
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(self.showPosition);
        }

        else {
            console.log('no geo');
        }
    }
    //switch which day's high/low temp is displayed in weather pop out
    highlightDay(day, isToday, dayNumber) {
        if (isToday) {
            this.setState({todayHighTemp: this.state.activeTemp, todayLowTemp: '', activeDescription: this.state.day1.text, showLowTemp: 'hidden', showingDay: '1'});
        }

        else {
            this.setState({todayHighTemp: day.high, todayLowTemp: day.low, activeDescription: day.text, showLowTemp: 'low-temp', showingDay: dayNumber.toString()});    
        }

        this.setState({activeDayName: moment(day.date, 'DD MMM YYY').format('dddd'), activeIconClass: 'wi wi-yahoo-' + day.code});
    }

    changeUnits() {
        //temporary object to hold units being switched out, so they arent lost and can be switched back to in the future
        var newAltUnits = {
            activeTemp: 0,
                '0': {},
                '1': {},
                '2': {},
                '3': {},
                '4': {},
        };

        for (var i = 0; i < 5; i++) {
            //save in day object from state to be updated
            var temp = this.state['day' + (i + 1)];

            //switch high/low to new unit
            newAltUnits[i.toString()].high = temp.high;
            newAltUnits[i.toString()].low = temp.low;

            //set new units in state
            temp.high = this.state.altUnits[i.toString()].high;
            temp.low = this.state.altUnits[i.toString()].low;

            //build day number to set in state
            var day = 'day' + (i + 1).toString();
            this.setState({day: temp});
        }
        //set active temp in new units that will be displayed on homescreen
        newAltUnits.activeTemp = this.state.activeTemp;

        this.setState({showFahr: !this.state.showFahr, activeTemp: this.state.altUnits.activeTemp});
        
        //check to see which day is currently highlighted in weather pop out, to update those temps to new units
        if (this.state.showingDay === '1') {
            this.setState({todayHighTemp: this.state.altUnits.activeTemp});
        }

        else {
            this.setState({
                todayHighTemp: this.state.altUnits[(this.state.showingDay - 1).toString()].high, 
                todayLowTemp: this.state.altUnits[(this.state.showingDay - 1).toString()].low
            });
        }

        this.setState({altUnits: newAltUnits});
    }

    onBlur(e) {
        var currentTarget = e.currentTarget;
        setTimeout(function() {
            if (!currentTarget.contains(document.activeElement)) {
                document.getElementById("weather-button").classList.remove("show");
            }
        }, 0);
    }

    //show weather pop out
    onFocus(event) {
        document.getElementById('weather-button').classList.toggle('show');
    }

    onDoubleClick(e) {
        document.getElementById('city-name').contentEditable = true;
    }

    updateCity(event) {
        var self = this;
        if (event.key === 'Enter') {
            event.preventDefault();
            //this.showPosition(event.target.innerHTML);
            axios.get('https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20geo.places%20WHERE%20text%3D%22' + event.target.innerHTML + '%22&format=json').then(
                function(res) {    
                    if (res.data.query.count === 0) {
                        document.getElementById('city-name').innerHTML = self.state.city;
                        return;
                    }

                    else if (res.data.query.count === 1) {
                        self.showPosition(res.data.query.results.place.woeid);
                    }

                    else {
                        self.showPosition(res.data.query.results.place[0].woeid);
                    }
                }
            );
        }
    }

    submitNewCity(event) {
        var self = this;
        axios.get('https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20geo.places%20WHERE%20text%3D%22' + event.target.innerHTML + '%22&format=json').then(
            function(res) {
                if (res.data.query.count === 0) {
                    document.getElementById('city-name').innerHTML = self.state.city;
                    return;
                }

                else if (res.data.query.count === 1) {
                    self.showPosition(res.data.query.results.place.woeid);
                }

                else {
                    self.showPosition(res.data.query.results.place[0].woeid);
                }
            }
        );
    }

    render() {
        return (
            <div className={`weather-wrapper ${this.props.visibility}`} tabIndex="1" onBlur={this.onBlur}>
                <div id="weather-focus" className="btn-group" >
                    <button type="button" className="btn button-updates top-button-identifier" onClick={this.onFocus}>
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
                    <div className="dropdown-menu dropdown-menu-left dropdown-wrapper" id="weather-button">
                        <div className="weather-widget-row-small">
                            <div className="city-holder">
                                <div className="city-name" onDoubleClick={this.onDoubleClick}>
                                    <span id="city-name" onKeyPress={this.updateCity} onBlur={this.submitNewCity}>{this.state.city}</span> <span className="active-day-name">{this.state.activeDayName}</span> 
                                </div>
                                <div className="current-weather-description">
                                    {this.state.activeDescription}
                                </div>
                            </div>
                            <div className="more-options-ellipsis-wrapper">
                                <div className="more-options-ellipsis">
                                    <WeatherSettings showFahr={this.state.showFahr} changeUnits={this.changeUnits}/>
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
                            <div className={this.state.showingDay === '1' ? 'five-day-wrapper active-day' : 'five-day-wrapper'} onClick={() => this.highlightDay(this.state.day1, true)}>
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
                            <div className={this.state.showingDay === '2' ? 'five-day-wrapper active-day' : 'five-day-wrapper'} onClick={() => this.highlightDay(this.state.day2, false, 2)}>
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
                            <div className={this.state.showingDay === '3' ? 'five-day-wrapper active-day' : 'five-day-wrapper'} onClick={() => this.highlightDay(this.state.day3, false, 3)}>
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
                            <div className={this.state.showingDay === '4' ? 'five-day-wrapper active-day' : 'five-day-wrapper'} onClick={() => this.highlightDay(this.state.day4, false, 4)}>
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
                            <div className={this.state.showingDay === '5' ? 'five-day-wrapper active-day' : 'five-day-wrapper'} onClick={() => this.highlightDay(this.state.day5, false, 5)}>
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