import React, {Component} from 'react';
import customLocalStorage from '../customLocalStorage';


class Settings extends Component{
    constructor(props){
        super(props);
        this.state = {
            active: this.genTab(),
            photoSubTab: 'History',
            quoteSubTab: 'History',
            quote:[]
        };
    this.dropUp = this.dropUp.bind(this);
    this.pickTab = this.pickTab.bind(this);

        }
        
    componentDidMount(){
        const quote = customLocalStorage.getItem('quotes');
        quote && this.setState({
            quote: JSON.parse(quote).reverse()
        });
    }
    componentWillReceiveProps(nextProps){
        if(this.state.active.key === 'quoteTab'){
            const quote = customLocalStorage.getItem('quotes');
            quote && this.setState({
                quote: JSON.parse(quote).reverse()
            },() => this.pickTab(this.quoteTab(this.state.quoteSubTab)));
        } else {
            const quote = customLocalStorage.getItem('quotes');
            quote && this.setState({
                quote: JSON.parse(quote).reverse()
            },() => this.quoteTab());
        }
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
                    {this.props.loggedInUser ? <li className="slide-toggle"><a onClick={() => customLocalStorage.clear()} href="https://momentum-server-bt13.herokuapp.com/api/logout">Logout</a></li> : ""}
                </ul>
            </div>
        )
    }
    genTab(x){
        function toggleClock(x){
            const military = document.getElementById('24time');
            const standard = document.getElementById('12time');
            military.classList.remove('active');
            standard.classList.remove('active');
        x ? military.classList.add('active') : standard.classList.add('active');  
        }
        setTimeout( () => {
            var militaryTime = this.props.general.militaryTime;
            const military = document.getElementById('24time');
            const standard = document.getElementById('12time');
            militaryTime ? military.classList.add('active') : standard.classList.add('active')  
        }, 0)

        return(
            <div key="genTab">
                <h3>General</h3>
                <p>Customize your dashboard</p>
                <h4 className="settings-header">Show</h4>
                <ul className="settings-list">
                    {/* <li className="slide-toggle"> <span>Links</span>{this.toggle("displayLink")} </li> */}
                    <li className="slide-toggle"> <span>Search</span>{this.toggle("displaySearch")} </li>
                    <li className="slide-toggle"> <span>Weather</span>{this.toggle("displayWeather")} </li>
                    <li className="slide-toggle"> <span>Focus</span>{this.toggle("displayFocus")} </li>
                    <li className="slide-toggle"> <span>Quote</span>{this.toggle("displayQuote")} </li>
                    <li className="slide-toggle bottom-toggle"> <span>Todo</span>{this.toggle("displayTodo")}</li>
                </ul>
                <h4 className="settings-header">Options</h4>
                <ul className="settings-list">
                    <li className="slide-toggle"><span>Clock Format</span><span className="text-toggle"><span>
                    <span className="toggle-options" id="12time" onClick={e => {this.props.toggle('militaryTime', false); toggleClock(false)}}>12 Hour</span>
                        <span> | </span>
                    <span className="toggle-options" id="24time" onClick={e => {this.props.toggle('militaryTime', true); toggleClock(true)}}>24 Hour</span></span>
                    </span>
                    </li>
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
        function handleActive(x, selector){
            var elems = document.querySelectorAll(selector);     
            [].forEach.call(elems, function(el) {
                el.classList.remove("active");
            });
            x.classList.add('active');
        }
        //Highlight initial timer
        const timer = this.props.general.customTimer;
            setTimeout(function(){  
                switch(timer){
                    case 3600000:
                        document.getElementById('1hour').classList.add('active');
                        break;
                    case 43200000:
                        document.getElementById('12hours').classList.add('active');
                        break;
                    case 86400000:
                        document.getElementById('24hours').classList.add('active');
                        break;
                    default:
                    document.getElementById('15min').classList.add('active');
                        break;
                }
            }, 0);
        return(
            <div key="photoTab">
                <h3>Photos</h3>
                <p>See a new inspiring photo each day</p>
                <h4>Refresh Background Every...</h4>
                <span>
                    <span className="toggle-options" id="15min" onClick={e => {this.props.toggle('customTimer', 900000);handleActive(e.target, ".toggle-options")}}>15 Minutes</span>
                        <span> | </span>
                    <span className="toggle-options" id="1hour"onClick={e => {this.props.toggle('customTimer', 3600000);handleActive(e.target, ".toggle-options")}}>1 Hour</span>
                        <span> | </span>
                    <span className="toggle-options" id="12hours"onClick={e => {this.props.toggle('customTimer', 43200000);handleActive(e.target, ".toggle-options")}}>12 Hours</span>
                        <span> | </span>
                    <span className="toggle-options" id="24hours"onClick={e => {this.props.toggle('customTimer', 86400000);handleActive(e.target, ".toggle-options")}}>24 Hours</span>
                </span>
                <div className="settings-subnav">
                    {this.state.photoSubTab === "Favorites" ? <h4 className="picSub active" onClick= {(event) => {this.setState({active: this.photoTab('Favorites'),photoSubTab:'Favorites'}); handleActive(event.target, ".picSub")}}>Favorites</h4> : <h4 className="picSub" onClick= {(event) => {this.setState({active: this.photoTab('Favorites'),photoSubTab:'Favorites'}); handleActive(event.target, ".picSub")}}>Favorites</h4>}
                    {this.state.photoSubTab === "History" ? <h4 className="picSub active" onClick= {(event) => {this.setState({active: this.photoTab('History'),photoSubTab:'History'}); handleActive(event.target, ".picSub")}}>History</h4> : <h4 className="picSub" onClick= {(event) => {this.setState({active: this.photoTab('History'),photoSubTab:'History'}); handleActive(event.target, ".picSub")}}>History</h4>}
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
        if(bgHistory !== null ){
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
    }
    
    quoteTab(x){
        function handleActive(x, selector){
            var elems = document.querySelectorAll(selector);     
            [].forEach.call(elems, function(el) {
                el.classList.remove("active");
            });
            x.classList.add('active');
        }
        return(
            <div key="quoteTab">
                <h3>Quotes</h3>
                <p>A daily reminder for inspiration and growth</p>
                <div className="settings-subnav">
                    {this.state.quoteSubTab === 'Favorites' ? <h4 className="quoteSub active" onClick= {(event) => {this.setState({active: this.quoteTab('Favorites'),quoteSubTab:'Favorites'}); handleActive(event.target, ".quoteSub")}}>Favorites</h4>: <h4 className="quoteSub" onClick= {(event) => {this.setState({active: this.quoteTab('Favorites'),quoteSubTab:'Favorites'}); handleActive(event.target, ".quoteSub")}}>Favorites</h4>}
                    {this.state.quoteSubTab === 'History' ? <h4 className="quoteSub active" onClick= {(event) => {this.setState({active: this.quoteTab('History'),quoteSubTab:'History'}); handleActive(event.target, ".quoteSub")}}>History</h4> : <h4 className="quoteSub" onClick= {(event) => {this.setState({active: this.quoteTab('History'),quoteSubTab:'History'}); handleActive(event.target, ".quoteSub")}}>History</h4>}
                </div>
                <ul className="settings-list">
                    {this.quoteSubTab(x)}
                </ul>
            </div>
        )
    }
    
    quoteSubTab(x){
        let quotes = this.state.quote;
        if(x === 'Favorites'){
            quotes = quotes.filter((obj)=>{
                return obj.liked === true;
            })
        }
        if(quotes !== null){
            let historyOrFavorite = quotes.map((item, i) => {
                if(item.liked){
                return(
                    <li className="slide-toggle quoteHistLiked" key={`${item.author}-${i}`}>{item.text} - {item.author}</li>   
                ) 
                } else {
                return(
                    <li className="slide-toggle quoteHist" key={`${item.author}-${i}`}>{item.text} - {item.author}</li>   
                    )
                }
                
            });
            return (
                <div key={x}>
                    {historyOrFavorite}
                </div>
            )
        }
    }
    // linkTab(x){
    //     return(
    //         <div key="linkTab">
    //             <h3>Links</h3>
    //             <p>Quick access to your favorite links</p>
    //             <ul className="settings-list">
    //                 <li className="slide-toggle"> <span>Show Links</span>{this.toggle('displayLink')} </li>
    //                 <li className="slide-toggle bottom-toggle"> <span>Open links in a new tab</span>{this.toggle('linkNewTab')} </li>
    //             </ul>
    //             <h4 className="settings-header">Links</h4>
    //             <ul className="settings-list">
    //                 <li className="slide-toggle bottom-toggle"> <span>Stay Open</span>{this.toggle("linkBlur")}</li>
    //             </ul>

    //         </div>
    //     )
    // }


    pickTab(tab){
        this.setState({active:tab});
    }
    
    onBlur(e) {
        var currentTarget = e.currentTarget;
        setTimeout(function() {
            if (!currentTarget.contains(document.activeElement)) {
                document.getElementById("settings-dropup").classList.remove("show");
            }
        }, 0);
    }
  
    render(){
        return (    
            <div className="bottom-left" tabIndex="1" onBlur={this.onBlur}>
                <button className="btn settings-btn" onClick={this.dropUp}>
                    <i className="fa fa-cog" aria-hidden="true"></i>
                </button>
                <div id="settings-dropup" className="settings-panel s-up">
                <ul className="settings-nav">
                    <li className="settings-nav-item" key="general-tab"onClick={() => this.pickTab(this.genTab())}>General</li>
                    <li className="settings-nav-item" key="todo-tab"onClick={() => this.pickTab(this.todoTab())}>Todo</li>
                    <li className="settings-nav-item" key="photo-tab"onClick={() => this.pickTab(this.photoTab(this.state.photoSubTab))}>Photos</li>
                    <li className="settings-nav-item" key="quote-tab"onClick={() => this.pickTab(this.quoteTab(this.state.quoteSubTab))}>Quotes</li>
                    {/*<li className="settings-nav-item" key="link-tab"onClick={() => this.pickTab(this.linkTab())}>Links</li> */}
                    <div className='login-nav' key="login-tab"onClick={() => this.pickTab(this.loginTab())}> {!this.props.loggedInUser ? <p>Log In</p> : <p>Log Out</p>}</div>
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