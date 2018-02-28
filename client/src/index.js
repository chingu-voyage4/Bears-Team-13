import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Clock from './components/clock';
import Greeting from './components/greeting';
import moment from 'moment';
import Quote from './components/quote';
import Focus from './components/focus';
import './index.css';
import Todo from './components/todo'
import './style/main.css'

class App extends Component{
 constructor(props){
     super(props);
     this.state = {
         timeOfDay: '',
         img: "https://source.unsplash.com/daily?landscape"
     }
 }
 
 componentWillMount() {
     //determine what to use in the greeting
    var currentHour = moment().get('hour');
    console.log(currentHour);
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

 render(){
    const backgroundImgStyles = {
        backgroundImage: `url("${this.state.img}")`,
        height: '100vh',
        backgroundSize: 'cover'
    };
     //render everything here
     return (
     <div className="main" style={backgroundImgStyles}>
        <Clock />
        <Greeting name={'George'} timeOfDay={this.state.timeOfDay} />
        <Focus />
        <Quote />
        <div className="bottom-right">
            <Todo />
        </div>
     </div>
    );
 }
}

ReactDOM.render(<App />, document.querySelector('.container'));

