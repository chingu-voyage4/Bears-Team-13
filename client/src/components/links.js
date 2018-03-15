import React, {Component} from 'react';

class Links extends Component {
    constructor(props){
        super(props);
        this.state = {
            links: [
                {
                    label: '',
                    url: ''
                }
            ]
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        var linksPanel = document.getElementById('links-panel');
     
        // Toggle fade classes  
        if (linksPanel.className === 'animation-element fadePanelUp') {
            linksPanel.className = 'animation-element fadePanelDown';
        } else {
            linksPanel.className = 'animation-element fadePanelUp';
        }
    }

    render() {
        return (
            <div className={`links-wrapper ${this.props.visibility}`}>
                <button id="links-button" onClick={this.handleClick}>Links</button>
                <ul id="links-panel" className="animation-element fadePanelUp">
                    <li><a href="chrome-search://local-ntp/local-ntp.html"><i className="fab fa-chrome"></i>Chrome Tab</a></li>
                    <li><a href="chrome://apps"><i className="fab fa-google"></i>Apps</a></li>
                    <li><input id="links-input" type="text" placeholder="New Link" /></li>
                </ul>
            </div>
        )
    }  
}

export default Links;