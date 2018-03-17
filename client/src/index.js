import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Clock from './components/clock';
import Greeting from './components/greeting';
import moment from 'moment';
import Quote from './components/quote';
import Focus from './components/focus';
import Weather from './components/weather';
import Links from './components/links';
import './style/index.css';
import Todo from './components/todo';
import './style/main.css';
import './style/weather-icons.css'
import Settings from './components/settings';
import BackgroundCredit from './components/background-credit';


class App extends Component{
 constructor(props){
     super(props);
     this.state = {
        timeOfDay: '',
        background: {
        },
        backgroundHistory: [],
        customGeneral: {
            displayLink: true,
            displayWeather:true,
            displayFocus:true,
            displayQuote:true,
            displayTodo:true,
            todoBlur:true,
            customTimer: 900000
        }
     }
 }
 
 componentWillMount() {
    const getLocalBackground = localStorage.getItem('background');
    const backgroundHistory = localStorage.getItem('backgroundHistory');
    
     //Receive background image
    const storedTime = JSON.parse(getLocalBackground)
    let timeElapsed;
    if(storedTime !== null){
     timeElapsed = new Date().getTime() - storedTime.time
    } else {
     timeElapsed = null;
    }
    
    //Store background history in localStorage
    if(timeElapsed > this.state.customTimer){
        const tempObj = Object.assign({}, JSON.parse(getLocalBackground));
        var newArray = JSON.parse(backgroundHistory);
        newArray.push(tempObj);   
        localStorage.setItem('backgroundHistory', JSON.stringify(newArray))
    }
    if(timeElapsed > this.state.customTimer || timeElapsed === null){
      fetch('https://momentum-server-bt13.herokuapp.com/api/get_picture')
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
                } })
            })
        .catch(err => {
			console.log('Error happened during fetching!', err);
        })
    } else {
        getLocalBackground && this.setState({
            background:JSON.parse(getLocalBackground)
        });
    }
    
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
        localStorage.setItem('background', JSON.stringify(nextState.background));
        localStorage.setItem('customGeneral', JSON.stringify(nextState.customGeneral))

    }
    updateCustomGeneral(widget, checked){
        this.setState( prevState =>({
          customGeneral:{
          ...prevState.customGeneral,[widget]: checked
          }
        }
      ));
    }
    
 render(){
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
        />
        {obj.displayLink ? <Links /> : <Links visibility='hide' />}
        {obj.displayWeather ? <Weather /> : <Weather visibility='hide' />}
        <Clock />
        <Greeting name={'George'} timeOfDay={this.state.timeOfDay} />
        {obj.displayFocus ? <Focus /> : <Focus visibility='hide' />}
        {obj.displayQuote ? <Quote /> : <Quote visibility='hide' />}
        {obj.displayTodo ? <Todo blurOn={obj.todoBlur}/> : <Todo visibility='hide' blurOn={obj.todoBlur} />}
        <BackgroundCredit
            pictureLink={this.state.background.pictureLink}
            pictureByName={this.state.background.pictureByName}
            pictureLocation={this.state.background.pictureLocation}
            pictureUrl={this.state.background.pictureUrl}
        />

     </div>
    );
 }
}

ReactDOM.render(<App />, document.querySelector('.root'));

