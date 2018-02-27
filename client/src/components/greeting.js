import React from 'react';

const Greeting = props => {
    return (
        <div className='greeting center-horizontally'>
            Good {props.timeOfDay}, {props.name}!  
        </div>
    );     
}

export default Greeting;