import React from 'react';
import moment from 'moment';

const Greeting = props => {
    return (
        <div className='greeting center-horizontally'>
            Good {props.timeOfDay}, {props.name}!  
        </div>
    );     
}

export default Greeting;