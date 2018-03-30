import React, {Component} from 'react';

class WeatherSettings extends Component {

    setC = () => {
        if (this.props.showFahr) {
            this.props.changeUnits();
        }
        //already showing C ignore click
        else {
            return;
        }
    }

    setF = () => {
        if (!this.props.showFahr) {
            this.props.changeUnits();
        }
        //already showing F ignore click
        else {
            return;
        }
    }
    
    render() {
        return (
            <div className="btn-group dropleft">
                <button type="button" className="btn unstyled-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    ...
                </button>
                <div className="dropdown-menu weather-settings">
                    <span className={this.props.showFahr ? '' : 'activeUnits'} onClick={this.setC}>Celsius</span> | <span className={this.props.showFahr ? 'activeUnits' : ''} onClick={this.setF}>Fahrenheit</span>
                </div>
            </div>
        );
    }
}

export default WeatherSettings;