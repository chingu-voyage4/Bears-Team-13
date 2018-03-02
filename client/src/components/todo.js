import React, {Component} from 'react';
import TodoList from './todo-list';

class Todo extends Component {
    constructor(props){
        super(props);
        this.state = {
            viewBox:"Today",
            term: "",
         todo: []
        };
   this.handleSubmit = this.handleSubmit.bind(this);
   this.dropUp = this.dropUp.bind(this);
   this.dropDown = this.dropDown.bind(this);
   this.handleCheckbox = this.handleCheckbox.bind(this);
  this.updateViewBox = this.updateViewBox.bind(this);
    }
    
    componentWillMount(){
        localStorage.getItem('todo') && this.setState({
            todo: JSON.parse(localStorage.getItem('todo'))
        });
    }

    componentWillUpdate(nextProps, nextState){
        localStorage.setItem('todo', JSON.stringify(nextState.todo));
    }
    
    render(){
    const todoItems = this.state.todo.map((item, index) => {
        var checked;
        if(item.checked === true){
            checked = 'checked'
        } else {
            checked= 'unchecked'
        }
        return(
        <TodoList 
            todo={item.item}
            key={item.key}
            todoDelete={event => this.handleDelete(item.key)}
            checkbox = {this.checkBox(item)}
            checked={checked}
        />
        );
    });
            
    return(
    <div className="dropup-btn">
        <button className="btn todo-btn" onClick={this.dropUp}>
            Todo
        </button>  
        <div id="todo-dropdown" className="todo-panel d-up">
            <div className="dropdown-btn">
              <button onClick={this.dropDown} className="btn todo-btn">{this.state.viewBox}</button>
              <div id="myDropdown" className="todo-panel d-down">
                <ul>
                    <li onClick={this.updateViewBox} id='Inbox' className='todo-box'>Inbox</li>
                    <li onClick={this.updateViewBox} id='Today'className='todo-box'>Today</li>
                    <li onClick={this.updateViewBox} id='Done'className='todo-box'>Done</li>
                </ul>
              </div>
            </div>
            <ul id="todo-list-container">
                {todoItems}
            </ul>
            <div>
                <form onSubmit={this.handleSubmit}> 
                    <input
                        id="todo-input"
                        placeholder = "New Todo"
                        value = {this.state.term}
                        onChange={event => this.onInputChange(event.target.value)} 
                        />
                </form>
            </div>
        </div>
    </div>
    )}
    updateViewBox(box){
        this.setState({viewBox:box.target.id})
        
    }
    
    onInputChange(term){
        this.setState({term});
    }
    generateKey(x){
        return `${x}_${ new Date().getTime() }`.split(' ').join('_').replace(/[^\w\s]/gi, '');
    }
    handleSubmit(e){
        e.preventDefault();
        var newArray = this.state.todo.slice();    
        newArray.push({item:this.state.term, key: this.generateKey(this.state.term), checked:false});   
        this.setState({todo : newArray});
        this.setState({term:""});
    }
    handleDelete(e){
        var updateList = this.state.todo;
        updateList = updateList.filter(function( obj ) {
        return obj.key !== e;
        });
        this.setState({todo: updateList});
    }
    dropUp(x){
        document.getElementById("todo-dropdown").classList.toggle("show");
    }
    dropDown(x){
        document.getElementById('myDropdown').classList.toggle('show')
    }
    checkBox(item){
        if(item.checked === true){
            return <input className="todo-checkbox" type="checkbox" onChange={this.handleCheckbox} value={item.item} id={item.key} defaultChecked/>
        } else {
            return <input className="todo-checkbox" type="checkbox" onChange={this.handleCheckbox} value={item.item} id={item.key} />
        }
    }

    handleCheckbox(el){
        const tempObj = Object.assign([], this.state.todo);
        function check(x) { 
            return x.key === el.target.id;
        }
        const tempObj1 = tempObj.find(check)
        if(tempObj1.checked === true){
            tempObj1.checked = false;
        } else if (tempObj1.checked === false){
            tempObj1.checked = true;
        }
        this.setState({todo:tempObj})
        }
}

export default Todo;

