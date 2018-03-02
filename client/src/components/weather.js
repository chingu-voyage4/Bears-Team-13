import React, {Component} from 'react';

class Weather extends Component {
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
                            Miami
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
                            <div className="five-day-wrapper active-day">
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
                            <div className="five-day-wrapper">
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