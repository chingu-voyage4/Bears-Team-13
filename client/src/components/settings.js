import React, {Component} from 'react';
import axios from 'axios';

class Settings extends Component{
    constructor(props){
        super(props);
    this.dropUp = this.dropUp.bind(this);
        }
        
    dropUp(x){
        document.getElementById("settings-dropup").classList.toggle("show");
    }
    getUser(x){
        axios.get('https://momentum-server-bt13.herokuapp.com/api/current_user', {withCredentials: true}).then(function(res) {
            console.log(res);
        });
    }
    render(){
        return (    
            <div className="bottom-left">
                <button className="btn todo-btn" onClick={this.dropUp}>
                    <i className="fa fa-cog"></i>
                </button>
                <div id="settings-dropup" className="todo-panel s-up">
                <ul>
                    <li><a href="https://momentum-server-bt13.herokuapp.com/auth/google">Login with Google</a></li>
                    <li><a href="https://momentum-server-bt13.herokuapp.com/api/logout">Logout</a></li>
                    <li className="getUser" onClick={this.getUser}>Get User</li>
                </ul>
                </div>
            </div>
        );
        }
}

export default Settings;