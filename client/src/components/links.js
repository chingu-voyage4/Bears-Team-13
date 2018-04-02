import React, {Component} from 'react';

class Links extends Component {
    constructor(props){
        super(props);
        this.state = {
            link: {
                title: '',
                url: ''
            }
        };
        this.handleWidgetOpen = this.handleWidgetOpen.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleLinkClose = this.handleLinkClose.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleWidgetOpen() {
        let linksPanel = document.getElementById('links-panel');
     
        // Toggle fade and display classes  
        if (linksPanel.className === 'animation-element fadePanelUp hide') {
            linksPanel.className = 'animation-element fadePanelDown show';
        } else {
            linksPanel.className = 'animation-element fadePanelUp hide';
        }
    }

    handleFocus() {
        let linksInputTitle = document.getElementById('links-input-title');
        let linksInputUrl = document.getElementById('links-input-url');
        let linksCloseBtn = document.getElementById('links-close-btn');

        linksInputTitle.placeholder = 'Name';
        linksCloseBtn.style.display = 'inline-block';
        linksInputUrl.style.display = 'block';
    }

    handleLinkClose() {
        let linksInputTitle = document.getElementById('links-input-title');
        let linksInputUrl = document.getElementById('links-input-url');
        let linksCloseBtn = document.getElementById('links-close-btn');

        linksInputTitle.value = '';
        linksInputUrl.value = '';
        linksInputTitle.placeholder = 'New Link';
        linksCloseBtn.style.display = 'none';
        linksInputUrl.style.display = 'none';
    }
    onBlur(e) {
    var currentTarget = e.currentTarget;
    let linksPanel = document.getElementById('links-panel');
    if(this.props.blurOn !== true){
    setTimeout(function() {
      if (!currentTarget.contains(document.activeElement)) {
        linksPanel.className = 'animation-element fadePanelUp hide';
      }
    }, 0);
    }
  }

    handleSubmit(e) {
        let linksInputTitle = document.getElementById('links-input-title');
        let linksInputUrl = document.getElementById('links-input-url');
        let linksList = document.getElementById('links-list');
        
        // If Enter key is pressed    
        if (e.which === 13 || e.keyCode === 13) { 
            // If values in both inputs
            if (linksInputUrl.value != '' && linksInputTitle.value != '') {
                // Create list item and anchor
                let linkItem = document.createElement('a');

                linkItem.setAttribute('class', 'link-list-item');

                // Set anchor   
                linkItem.innerHTML = '<i class="fa fa-globe"></i>' + linksInputTitle.value + '<span class="links-delete-btn animation-element">&times;</span>';

                // Append anchor and list
                linksList.appendChild(linkItem);
                
                let linksCloseBtn = document.getElementsByClassName('links-delete-btn')[0];

                // Display list
                linksList.style.display = 'block';
                linkItem.setAttribute('href', `http://${linksInputUrl.value}`);
                linkItem.setAttribute('target', 'blank');
                console.log('hit')
                linksCloseBtn.addEventListener('click', function(){
                    this.parentNode.parentNode.removeChild(this.parentNode);
                }) 

                // Reset input fields
                linksInputTitle.value = '';
                linksInputUrl.value = '';
            } else if (linksInputUrl.value === '') {
                return
            }
        }
    }

    render() {
        return (
            <div className={`links-wrapper ${this.props.visibility}`} tabIndex="1" onBlur={this.onBlur}>
                <button id="links-button" onClick={this.handleWidgetOpen}>Links</button>
                <div id="links-panel" className="animation-element fadePanelUp hide">
                    <a href="chrome-search://local-ntp/local-ntp.html"><i className="fa fa-chrome"></i>Chrome Tab</a>
                    <a href="chrome://apps"><i className="fa fa-google"></i>Apps</a>
                    <div id="links-list"></div>
                    <input id="links-input-title" className="links-input" type="text" placeholder="New Link" onFocus={this.handleFocus} onKeyPress={this.handleSubmit} /><span id="links-close-btn" onClick={this.handleLinkClose}>&times;</span>
                    <input id="links-input-url" className="links-input" type="text" placeholder="URL" onKeyPress={this.handleSubmit} />
                </div>
            </div>
        )
    }  
}
// value={this.state.link.title} 
// value={this.state.link.url}
export default Links;