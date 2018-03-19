import React, {Component} from 'react';
import axios from 'axios';


class Settings extends Component{
    constructor(props){
        super(props);
        this.state = {
            active: this.genTab()
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
                <h3>Log In</h3>
                <p>Sign in or sign up!</p>
                <ul className="settings-list">
                    <li className="slide-toggle"><a href="https://momentum-server-bt13.herokuapp.com/auth/google">Login with Google</a></li>
                    <li className="slide-toggle"><a href="https://momentum-server-bt13.herokuapp.com/api/logout">Logout</a></li>
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
                    <li className="slide-toggle"> <span>Bookmarks Bar</span>{this.toggle("displayBookmarks")} </li>
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
        const bgHistory = this.props.backgroundHistory;
        const history = bgHistory.map((item, i) => {
            return(
                <a className="settings-img-container"target="_blank" href={item.pictureLink} key={i}>
                    <img className="settings-img" src={item.img} alt="river"/>
                </a>
            )
        });
        return(
            <div key="photoTab">
                <h3>Photos</h3>
                <p>See a new inspiring photo each day</p>
                <div className="settings-subnav">
                    <h4>Favorites</h4><h4>History</h4>
                </div>
                <div>
                    {history}
                </div>
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
                <h3>Links & Bookmarks Bar</h3>
                <p>Quick access to your favorite links</p>
                <ul className="settings-list">
                    <li className="slide-toggle"> <span>Show Links</span>{this.toggle('displayLink')} </li>
                    <li className="slide-toggle"> <span>Show Bookmarks Bar</span>{this.toggle(11)} </li>
                    <li className="slide-toggle"> <span>Show Chrome Tab in</span><span className="text-toggle">Links | Bookmarks | Dash | None</span> </li>
                    <li className="slide-toggle"> <span>Show Apps in</span><span className="text-toggle">Links | Bookmarks | Dash | None</span> </li>
                    <li className="slide-toggle bottom-toggle"> <span>Open links in a new tab</span>{this.toggle(12)} </li>
                </ul>
                <h4 className="settings-header">Links</h4>
                <ul className="settings-list">
                    <li className="slide-toggle bottom-toggle"> <span>Stay Open</span>{this.toggle(13)} </li>
                </ul>
                <h4 className="settings-header">Bookmarks Bar</h4>
                <ul className="settings-list">
                    <li className="slide-toggle"> <span>Icons Only</span>{this.toggle(14)} </li>
                    <li className="slide-toggle"> <span>Show Most Visited</span>{this.toggle(15)} </li>
                    <li className="slide-toggle"> <span>Start in Most Visited</span>{this.toggle(16)}</li>
                    <li className="slide-toggle"> <span>Show Bookmarks Manager</span>{this.toggle(17)} </li>
                    <li className="slide-toggle bottom-toggle"> <span>Show Other Bookmarks</span>{this.toggle(18)} </li>
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
                    <li className="settings-nav-item" onClick={() => this.pickTab(this.photoTab())}>Photos</li>
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