import React from 'react';

const Greeting = props => {
    if(props.name !== false){
    return (
        <div className='greeting center-horizontally'>
            Good {props.timeOfDay}, {props.name}!  
        </div>
    );     
    } else {
    return (
        <div className='greeting center-horizontally'>
            Good {props.timeOfDay}!  
        </div>
    );
    }
}

export default Greeting;