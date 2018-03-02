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
                        Hello wolrld
                    </div>
                </div>
            </div>
        )
    }
}

export default Weather;