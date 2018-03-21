import React, {Component} from 'react';
import axios from 'axios';


class Settings extends Component{
    constructor(props){
        super(props);
        this.state = {
            active: this.genTab(),
            subTab: 'History'
        };
    this.dropUp = this.dropUp.bind(this);
    this.pickTab = this.pickTab.bind(this);

        }
    getUser() {
    axios.get('https://momentum-server-bt13.herokuapp.com/api/current_user', {withCredentials: true}).then(function(res) {
        console.log(res);
    });
    }

    dropUp(x){
        document.getElementById("settings-dropup").classList.toggle("show");
    }
    toggle(index){
        return(
            this.props.general[index] ? 
            <span><input className="input-toggle" type="checkbox" id={index} onChange={x=>this.handleToggle(x)} defaultChecked/><label className="label-toggle" htmlFor={index}></label></span>
            :
            <span><input className="input-toggle" type="checkbox" id={index} onChange={x=>this.handleToggle(x)}/><label className="label-toggle" htmlFor={index}></label></span>
        )
    }
    handleToggle(el){ 
        if(el.target.id === "todoBlur"){
            document.getElementById("todo-dropup").classList.remove("show");
        }
        this.props.toggle(el.target.id, el.target.checked)
    }
    
    loginTab(x){
        return(
            <div key="loginTab">
                <h3>{this.props.loggedInUser ? `Hi ${this.props.loggedInUser}` : `Log In`}</h3>
                <p>Sign in or sign up!</p>
                <ul className="settings-list">
                    {!this.props.loggedInUser ? <li className="slide-toggle"><a href="https://momentum-server-bt13.herokuapp.com/auth/google">Login with Google</a></li> : ""}
                    {this.props.loggedInUser ? <li className="slide-toggle"><a href="https://momentum-server-bt13.herokuapp.com/api/logout">Logout</a></li> : ""}
                    <li className="slide-toggle bottom-toggle" onClick={this.getUser}>Get User</li>
                </ul>
            </div>
        )
    }
    genTab(x){
        return(
            <div key="genTab">
                <h3>General</h3>
                <p>Customize your dashboard</p>
                <h4 className="settings-header">Show</h4>
                <ul className="settings-list">
                    <li className="slide-toggle"> <span>Links</span>{this.toggle("displayLink")} </li>
                    <li className="slide-toggle"> <span>Search</span>{this.toggle("displaySearch")} </li>
                    <li className="slide-toggle"> <span>Weather</span>{this.toggle("displayWeather")} </li>
                    <li className="slide-toggle"> <span>Focus</span>{this.toggle("displayFocus")} </li>
                    <li className="slide-toggle"> <span>Quote</span>{this.toggle("displayQuote")} </li>
                    <li className="slide-toggle bottom-toggle"> <span>Todo</span>{this.toggle("displayTodo")}</li>
                </ul>
                <h4 className="settings-header">Options</h4>
                <ul className="settings-list">
                    <li className="slide-toggle"><span>Clock Format</span><span className="text-toggle">12 Hour | 24 Hour</span></li>
                    <li className="slide-toggle"><span>Percent Clock</span><span>{this.toggle(8)}</span></li>
                    <li className="slide-toggle bottom-toggle"><span>Search Provider</span><span className="text-toggle">Google | Bing</span></li>
                </ul>
            </div>
        )
    }

    todoTab(x){
        return(
            <div key="todoTab">
                <h3>Todo</h3>
                <p>Break your goals into manageable pieces</p>
                <h4 className="settings-header">Settings</h4>
                <ul className="settings-list">
                    <li className="slide-toggle bottom-toggle"> <span>Stay Open</span>{this.toggle("todoBlur")}</li>
                </ul>
            </div>
        )
    }
    
    photoTab(x){
        function handleActive(x){
            var elems = document.querySelectorAll(".toggle-options");     
            [].forEach.call(elems, function(el) {
                el.classList.remove("active");
            });
            x.classList.add('active');
        }
        //Highlight initial timer
        const timer = this.props.general.customTimer;
            setTimeout(function(){  
                    switch(timer){
                case 900000:
                    document.getElementById('15min').classList.add('active');
                    break;
                case 3600000:
                    document.getElementById('1hour').classList.add('active');
                    break;
                case 43200000:
                    document.getElementById('12hours').classList.add('active');
                    break;
                case 86400000:
                    document.getElementById('24hours').classList.add('active');
                    break;
            }
            }, 0);

        return(
            <div key="photoTab">
                <h3>Photos</h3>
                <p>See a new inspiring photo each day</p>
                <h4>Refresh Background Every...</h4>
                <span>
                    <span className="toggle-options" id="15min" onClick={e => {this.props.toggle('customTimer', 900000);handleActive(e.target)}}>15 Minutes</span>
                    <span> | </span>
                    <span className="toggle-options" id="1hour"onClick={e => {this.props.toggle('customTimer', 3600000);handleActive(e.target)}}>1 Hour</span>
                    <span> | </span>
                    <span className="toggle-options" id="12hours"onClick={e => {this.props.toggle('customTimer', 43200000);handleActive(e.target)}}>12 Hours</span>
                    <span> | </span>
                    <span className="toggle-options" id="24hours"onClick={e => {this.props.toggle('customTimer', 86400000);handleActive(e.target)}}>24 Hours</span>
                </span>
                <div className="settings-subnav">
                    <h4 onClick= {(event) => this.setState({active: this.photoTab('Favorites'),subTab:'Favorites'})}>Favorites</h4>
                    <h4 onClick= {(event) => this.setState({active: this.photoTab('History'),subTab:'History'})}>History</h4>
                </div>
                {this.photoSubTab(x)}
            </div>
                
        )
    }

    photoSubTab(x){
        let bgHistory = this.props.backgroundHistory;
        if(x === 'Favorites'){
            bgHistory = bgHistory.filter((obj)=>{
            return obj.favorite === true;
        })
        }
        let historyOrFavorite = bgHistory.map((item, i) => {
        return(
            <a className="settings-img-container"target="_blank" href={item.pictureLink} key={item.pictureLink}>
                <img className="settings-img" src={item.img} alt="river"/>
            </a>
            )
        });
        return (
            <div key={x}>
            {historyOrFavorite}
            </div>
        )
    }
    
    quoteTab(x){
        return(
            <div key="quoteTab">
                <h3>Quotes</h3>
                <p>A daily reminder for inspiration and growth</p>
                <div className="settings-subnav">
                    <h4>Favorites</h4><h4>History</h4>
                </div>
            </div>
        )
    }
    linkTab(x){
        return(
            <div key="linkTab">
                <h3>Links</h3>
                <p>Quick access to your favorite links</p>
                <ul className="settings-list">
                    <li className="slide-toggle"> <span>Show Links</span>{this.toggle('displayLink')} </li>
                    <li className="slide-toggle"> <span>Show Chrome Tab in</span><span className="text-toggle">Links | Bookmarks | Dash | None</span> </li>
                    <li className="slide-toggle"> <span>Show Apps in</span><span className="text-toggle">Links | Bookmarks | Dash | None</span> </li>
                    <li className="slide-toggle bottom-toggle"> <span>Open links in a new tab</span>{this.toggle(12)} </li>
                </ul>
                <h4 className="settings-header">Links</h4>
                <ul className="settings-list">
                    <li className="slide-toggle bottom-toggle"> <span>Stay Open</span>{this.toggle(13)} </li>
                </ul>

            </div>
        )
    }


    pickTab(tab){
        this.setState({active:tab});
    }

    render(){
        return (    
            <div className="bottom-left">
                <button className="btn todo-btn" onClick={this.dropUp}>
                    <i className="fa fa-cog"></i>
                </button>
                <div id="settings-dropup" className="settings-panel s-up">
                <ul className="settings-nav">
                    <li className="settings-nav-item" onClick={() => this.pickTab(this.genTab())}>General</li>
                    <li className="settings-nav-item" onClick={() => this.pickTab(this.todoTab())}>Todo</li>
                    <li className="settings-nav-item" onClick={() => this.pickTab(this.photoTab(this.state.subTab))}>Photos</li>
                    <li className="settings-nav-item" onClick={() => this.pickTab(this.quoteTab())}>Quotes</li>
                    <li className="settings-nav-item" onClick={() => this.pickTab(this.linkTab())}>Links</li>
                    <div className='login-nav' onClick={() => this.pickTab(this.loginTab())}>Log In</div>
                </ul>
                <div className="settings-container">
                    {this.state.active}
                </div>
                </div>
            </div>
        );
        }
}

export default Settings; 