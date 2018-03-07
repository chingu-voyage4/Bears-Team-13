import React, {Component} from 'react';
import TodoList from './todo-list';

class Todo extends Component {
    constructor(props){
        super(props);
        this.state = {
            viewBox:"Today",
        };
    this.updateViewBox = this.updateViewBox.bind(this);
    this.dropUp = this.dropUp.bind(this);
    this.dropDown = this.dropDown.bind(this);
    }
    
    updateViewBox(box){
        this.setState({viewBox:box.target.id});
        document.getElementById('myDropdown').classList.toggle('show');
    }
    
    dropUp(x){
        document.getElementById("todo-dropup").classList.toggle("show");
    }
    
    dropDown(x){
        document.getElementById('myDropdown').classList.toggle('show')
    }
    
    render(){
        return(
        <div className="bottom-right">
            <button className="btn todo-btn" onClick={this.dropUp}>
                Todo
            </button>  
            <div id="todo-dropup" className="todo-panel d-up">
                <div className="dropdown-btn">
                    <button onClick={this.dropDown} id="dropDown" className="btn todo-btn">{this.state.viewBox}</button>
                    <div id="myDropdown" className="todo-panel d-down">
                        <ul>
                            {/* <li onClick={this.updateViewBox} id='Inbox' className='todo-box'>Inbox</li> */}
                            <li onClick={this.updateViewBox} id='Today'className='todo-box'>Today</li>
                            <li onClick={this.updateViewBox} id='Done'className='todo-box'>Done</li>
                        </ul>
                    </div>
                </div>
                <TodoList viewBox={this.state.viewBox} />
            </div>
        </div>
        )
    }
    
}

export default Todo;