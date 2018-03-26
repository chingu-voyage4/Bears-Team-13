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
    this.onBlur = this.onBlur.bind(this);
    }
    
    updateViewBox(box){
        this.setState({viewBox:box.target.id});
        document.getElementById('myDropdown').classList.toggle('show');
    }
    
    dropUp(x){
        const dUp =  document.getElementById("todo-dropup").classList;
       dUp.toggle("show");

    }
    
    dropDown(x){
        document.getElementById('myDropdown').classList.toggle('show')
    }
     onBlur(e) {
         console.log(e.currentTarget)
    var currentTarget = e.currentTarget;
    if(this.props.blurOn !== true){
    setTimeout(function() {
      if (!currentTarget.contains(document.activeElement)) {
          document.getElementById("todo-dropup").classList.remove("show");
      }
    }, 0);
    }
  }
    
    
    render(){
        return(
        <div className={`bottom-right ${this.props.visibility}`} id="test1" tabIndex="1" onBlur={this.onBlur}>
            <button className="btn todo-btn btn-dropUp" onClick={this.dropUp}>
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
                <TodoList loggedInUser={this.props.loggedInUser} viewBox={this.state.viewBox}  dataInStorage={this.props.dataInStorage}/>
            </div>
        </div>
        )
    }
    
}

export default Todo;