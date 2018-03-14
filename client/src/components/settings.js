import React, {Component} from 'react';
import axios from 'axios';


function toggle(index){
    
return <span><input className="input-toggle" type="checkbox" id={index} /><label className="label-toggle" htmlFor={index}></label></span>
}
function getUser() {
    axios.get('https://momentum-server-bt13.herokuapp.com/api/current_user', {withCredentials: true}).then(function(res) {
        console.log(res);
    });
    }
const genTab = (
    <div>
        <h3>General</h3>
        <p>Customize your dashboard</p>
        <h4 className="settings-header">Show</h4>
        <ul className="settings-list">
            <li className="slide-toggle"> <span>Links</span>{toggle(1)} </li>
            <li className="slide-toggle"> <span>Bookmarks Bar</span>{toggle(2)} </li>
            <li className="slide-toggle"> <span>Search</span>{toggle(3)} </li>
            <li className="slide-toggle"> <span>Weather</span>{toggle(4)} </li>
            <li className="slide-toggle"> <span>Focus</span>{toggle(5)} </li>
            <li className="slide-toggle"> <span>Quote</span>{toggle(6)} </li>
            <li className="slide-toggle bottom-toggle"> <span>Todo</span>{toggle(7)}</li>
        </ul>
        <h4 className="settings-header">Options</h4>
        <ul className="settings-list">
            <li className="slide-toggle"><span>Clock Format</span><span className="text-toggle">12 Hour | 24 Hour</span></li>
            <li className="slide-toggle"><span>Percent Clock</span><span>{toggle(8)}</span></li>
            <li className="slide-toggle bottom-toggle"><span>Search Provider</span><span className="text-toggle">Google | Bing</span></li>
        </ul>
    </div>
);
const todoTab = (
    <div>
        <h3>Todo</h3>
        <p>Break your goals into manageable pieces</p>
    </div>
)
const photoTab = (
    <div>
        <h3>Photos</h3>
        <p>See a new inspiring photo each day</p>
    </div>
)
const quoteTab = (
    <div>
        <h3>Quotes</h3>
        <p>A daily reminder for inspiration and growth</p>
    </div>
)
const linkTab = (
    <div>
        <h3>Links & Bookmarks Bar</h3>
        <p>Quick access to your favorite links</p>
    </div>
)
const balanceTab = (
    <div>
        <h3>Balance</h3>
        <p>Balance your day with periods of uptime and downtime</p>
    </div>
)
const loginTab =(
    <div>
        <h3>Log In</h3>
        <p>Sign in or sign up!</p>
        <ul className="settings-list">
            <li className="slide-toggle"><a href="https://momentum-server-bt13.herokuapp.com/auth/google">Login with Google</a></li>
            <li className="slide-toggle"><a href="https://momentum-server-bt13.herokuapp.com/api/logout">Logout</a></li>
            <li className="slide-toggle bottom-toggle" onClick={getUser}>Get User</li>
        </ul>
    </div>
);

class Settings extends Component{
    constructor(props){
        super(props);
        this.state = {
            // tab:{
            //     general:genTab,
            //     todo:todoTab,
            //     photo:photoTab,
            //     quote:quoteTab,
            //     link:linkTab,
            //     balance:balanceTab
            // },
            active: genTab
        };
    this.dropUp = this.dropUp.bind(this);
    this.pickTab = this.pickTab.bind(this);
        }
        
    dropUp(x){
        document.getElementById("settings-dropup").classList.toggle("show");
    }
    // toggleTodoBlur(){
    //     const target = document.getElementById('todo-dropup');
    //     // target.setAttribute('onBlur',()=>document.getElementById('todo-dropup').classList.toggle('show'))
    //     target.addEventListener('blur', ()=>target.classList.toggle('show'));
    // }


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
                    <li className="settings-nav-item" onClick={() => this.pickTab(genTab)}>General</li>
                    <li className="settings-nav-item" onClick={() => this.pickTab(todoTab)}>Todo</li>
                    <li className="settings-nav-item" onClick={() => this.pickTab(photoTab)}>Photos</li>
                    <li className="settings-nav-item" onClick={() => this.pickTab(quoteTab)}>Quotes</li>
                    <li className="settings-nav-item" onClick={() => this.pickTab(linkTab)}>Links</li>
                    <li className="settings-nav-item" onClick={() => this.pickTab(balanceTab)}>Balance</li>
                    <div className='login-nav' onClick={() => this.pickTab(loginTab)}>Log In</div>
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