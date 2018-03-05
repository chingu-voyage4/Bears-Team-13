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
        var linksButton = document.getElementById('links-button');
        var linksList = document.getElementById('links-list');
        
        linksButton.addEventListener('click', function() {
            if (linksList.className === 'animation-element fadePanelUp') {
                linksList.className = 'animation-element fadePanelDown';
            } else {
                linksList.className = 'animation-element fadePanelUp';
            }
        });
    }

    render() {
        return (
            <div className="links-wrapper">
                <button id="links-button" onClick={this.handleClick}>Links</button>
                <ul id="links-list" className="animation-element fadePanelUp">
                    <li><a>Chrome Tab</a></li>
                    <li><a>Apps</a></li>
                </ul>
            </div>
        )
    }  
}

export default Links;