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
            img: '',
            time: '',
            link: '',
            pictureByName:'',
            pictureByUsername:'',
            pictureLocation:'',
            pictureUrl:''
         }
     }
 }
 
 componentWillMount() {
    const getLocalBackground = localStorage.getItem('background');
         //Receive background image
    const storedTime = JSON.parse(getLocalBackground)
    let timeElapsed;
    if(storedTime !== null){
     timeElapsed = new Date().getTime() - storedTime.time
    } else {
     timeElapsed = null;
    }
    if(timeElapsed > 3600000 || timeElapsed === null){
      fetch('https://momentum-server-bt13.herokuapp.com/api/get_picture')
        .then(res => res.json())
        .then(data => {
            const time = new Date().getTime();
            this.setState({
                background:{
                    img: data.pictureUrl, 
                    time: time, 
                    pictureLink:data.pictureLink,
                    pictureByName:data.pictureByName,
                    pictureByUsername:data.pictureByUsername,
                    pictureLocation:data.pictureLocation,
                    pictureUrl:data.pictureUrl
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
 }
    componentWillUpdate(nextProps, nextState){
        localStorage.setItem('background', JSON.stringify(nextState.background));

    }
 render(){
    const backgroundImgStyles = {
        backgroundImage: `url("${this.state.background.img}")`,
        height: '100vh',
        backgroundSize: 'cover'
    };
     //render everything here
     return (
     <div className="main fadeIn" style={backgroundImgStyles}>
        <Links />
        <Weather />
        <Clock />
        <Greeting name={'George'} timeOfDay={this.state.timeOfDay} />
        <Focus />
        <Quote />
        <Todo />
        <BackgroundCredit
            pictureLink={this.state.background.pictureLink}
            pictureByName={this.state.background.pictureByName}
            pictureByUsername={this.state.background.pictureByUsername}
            pictureLocation={this.state.background.pictureLocation}
            pictureUrl={this.state.background.pictureUrl}
        />
        <Settings />
     </div>
    );
 }
}

ReactDOM.render(<App />, document.querySelector('.root'));

