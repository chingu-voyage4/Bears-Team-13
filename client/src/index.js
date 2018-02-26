import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Clock from './components/clock';
import Greeting from './components/greeting';
import moment from 'moment';
import Quote from './components/quote';
import Focus from './components/focus';
import './index.css';


class App extends Component{
 constructor(props){
     super(props);
     this.state = {
         timeOfDay: ''
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
     //render everything here
     return (
     <div>
        <Clock />
        <Greeting name={'George'} timeOfDay={this.state.timeOfDay} />
        <Focus />
        <Quote />
     </div>
    );
 }
}

ReactDOM.render(<App />, document.querySelector('.container'));

