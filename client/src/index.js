/* global localStorage, fetch*/

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Clock from './components/clock';
import Greeting from './components/greeting';
import moment from 'moment';
import Quote from './components/quote';
import Focus from './components/focus';
import Weather from './components/weather';
// import Links from './components/links';
import './style/index.css';
import Todo from './components/todo';
import './style/main.css';
import './style/weather-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import Settings from './components/settings';
import BackgroundCredit from './components/background-credit';
import axios from 'axios';
import customLocalStorage from './customLocalStorage';



class App extends Component{
 constructor(props){
     super(props);
     this.state = {
        timeOfDay: '',
        time:'',
        background: {
        },
        backgroundHistory: [],
        customGeneral: {
            // displayLink: true,
            displayWeather:true,
            displayFocus:true,
            displayQuote:true,
            displayTodo:true,
            todoBlur:true,
            // linkBlur:true,
            // linkNewTab: true,
            customTimer: 900000,
            militaryTime: false
        },
        quoteFavorite:false,
        loggedInUser: false,                //Non-logged in user: false | Logged in user: First name of user
        dataInStorage: 'local',
        fetching:false
     }
     this.handleFavorite = this.handleFavorite.bind(this)
 }
 
async syncDataWithServer() { 
    this.setState({fetching:true});
    //get user's logged in status from server
    var response;
    const localStorageLastUpdateTime = customLocalStorage.getItem('lastUpdateTime');
    try {
        response = await axios.get('/api/current_user', {withCredentials: true});
        
        if (response.data) {
            this.setState({loggedInUser: response.data.name});
            response = await axios.get('/api/getLocalStorage', {withCredentials: true});
            const serverLocalStorage = response.data.localStorage;
            //compare local lastUpdateTime with server's and update localStorage if stale
            if (!localStorageLastUpdateTime || (localStorageLastUpdateTime && (localStorageLastUpdateTime !== serverLocalStorage.lastUpdateTime))) {
                Object.keys(serverLocalStorage).forEach(key => {
                    customLocalStorage.setItem(key, serverLocalStorage[key]);
                });
                this.setState({
                    background: JSON.parse(customLocalStorage.getItem('background')),
                    backgroundHistory: JSON.parse(customLocalStorage.getItem('backgroundHistory')),
                    customGeneral: JSON.parse(customLocalStorage.getItem('customGeneral'))
                });
                this.setState({dataInStorage: 'server'});
            }

        }
    } catch (error) {
        console.log(error);
    }
        this.setState({fetching:false});
}

componentWillMount() {
    this.syncDataWithServer();
    this.handleBackground();
    
     //determine what to use in the greeting
    var currentHour = moment().get('hour');
    if (currentHour > 4 && currentHour < 12) {
        this.setState({timeOfDay: 'morning'});
    }

    else if (currentHour >= 12 && currentHour < 17) {
        this.setState({timeOfDay: 'afternoon'});
    }
    //other times from 5pm to 4am
    else {
        this.setState({timeOfDay: 'evening'});
    }
    //General Settings Tab
    const getGeneralSettings = localStorage.getItem('customGeneral');
    getGeneralSettings && this.setState({
        customGeneral: JSON.parse(getGeneralSettings)
    });

 }

componentWillUpdate(nextProps, nextState){
    customLocalStorage.setItem('background', JSON.stringify(nextState.background));
    customLocalStorage.setItem('customGeneral', JSON.stringify(nextState.customGeneral))
}
    
handleBackground(){
    const getLocalBackground = localStorage.getItem('background');
    const backgroundHistory = localStorage.getItem('backgroundHistory');
    //Handle first time history storage
    if(backgroundHistory === null){
        customLocalStorage.setItem('backgroundHistory', '[]');
    }
    //Check last time new image was fetched
    const storedTime = JSON.parse(getLocalBackground)
    let timeElapsed;
    if(storedTime !== null){
        timeElapsed = new Date().getTime() - storedTime.time
    } else {
        timeElapsed = null;
    }
    //Store background in localStorage
    if(timeElapsed > this.state.customGeneral.customTimer || timeElapsed === null || getLocalBackground.img === undefined){
    //Store background history in localStorage

        if(timeElapsed !== null){
            const tempObj = Object.assign({}, JSON.parse(getLocalBackground));
            var newArray = JSON.parse(backgroundHistory);
            // Check if image is already stored
            var found = newArray.find((x)=>{ return x.img === tempObj.img })
            // if not, push new image to history
            if(found === undefined || newArray.length === 0){
                newArray = [tempObj, ...newArray.slice(0, 49)] 
                customLocalStorage.setItem('backgroundHistory', JSON.stringify(newArray))
            } 
            this.setState({backgroundHistory:newArray});
        }
        fetch('/api/get_picture')
        .then(res => res.json())
        .then(data => {
            const time = new Date().getTime();
            this.setState({
                background:{
                    img: data.pictureUrl, 
                    time: time, 
                    date: moment().format('YYYY-MM-DD'),
                    pictureLink:data.pictureLink,
                    pictureByName:data.pictureByName,
                    pictureLocation:data.pictureLocation,
                    favorite: false
                } })
            })
        .catch(err => {
    		console.log('Error happened during fetching!', err);
        })
    } else {
        getLocalBackground && this.setState({
            background:JSON.parse(getLocalBackground)
        });
        this.setState({backgroundHistory:JSON.parse(backgroundHistory)});
    }
}
    updateCustomGeneral(widget, checked){
        this.setState( prevState =>({
          customGeneral:{
          ...prevState.customGeneral,[widget]: checked
          }
        }
      ));
    }
    handleFavorite(widget, x){
        var bool = !this.state[widget].favorite;
        this.setState( prevState => ({
          [widget]:{
            ...prevState[widget], favorite: bool
            }
        })
    );
    }
    quoteFavorite(bool){
        this.setState({quoteFavorite: bool})
    }
    
 render(){
    //  console.log(this.state.quoteFavorite)
     if(this.state.fetching){
         return <div>Loading...</div>
     }
    const backgroundImgStyles = {
        backgroundImage: `url("${this.state.background.img}")`,
        height: '100vh',
        backgroundSize: 'cover'
    };
    const obj = this.state.customGeneral;
     //render everything here
     return (
     <div className="main fadeIn" style={backgroundImgStyles}>
        <Settings general={obj}
                  toggle={(a, b) => this.updateCustomGeneral(a, b)}
                  backgroundHistory={this.state.backgroundHistory}
                  loggedInUser={this.state.loggedInUser} 
                  quoteFavorite={this.state.quoteFavorite}
        />
        {/*{obj.displayLink ? <Links newTab={obj.linkNewTab} blurOn={obj.linkBlur} /> : <Links newTab={obj.linkNewTab} visibility='hide' />} */}
        {obj.displayWeather ? <Weather /> : <Weather visibility='hide' />}
        <Clock militaryTime={this.state.customGeneral.militaryTime} toggle={(a, b) => this.updateCustomGeneral(a, b)}/>
        <Greeting name={this.state.loggedInUser} timeOfDay={this.state.timeOfDay} />
        {obj.displayFocus ? <Focus /> : <Focus visibility='hide' />}
        {obj.displayQuote ? <Quote loggedInUser={this.state.loggedInUser} dataInStorage={this.state.dataInStorage} favorite={(bool) => this.quoteFavorite(bool)}/> : <Quote visibility='hide' loggedInUser={this.state.loggedInUser} dataInStorage={this.state.dataInStorage}/>}
        {obj.displayTodo ? <Todo blurOn={obj.todoBlur} loggedInUser={this.state.loggedInUser} dataInStorage={this.state.dataInStorage}/> : <Todo visibility='hide' blurOn={obj.todoBlur} loggedInUser={this.state.loggedInUser}  dataInStorage={this.state.dataInStorage}/>}
        <BackgroundCredit
            favorite = {this.handleFavorite}
            background={this.state.background}
        />

     </div>
    );
 }
}

ReactDOM.render(<App />, document.querySelector('.root'));

