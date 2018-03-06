import React, {Component} from 'react';

import TodoListInput from './todo-list-input';

class TodoList extends Component { 
    constructor(props){
        super(props);
        this.state = {
            todo: []
        };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    }
    
    componentWillMount(){
        localStorage.getItem('todo') && this.setState({
            todo: JSON.parse(localStorage.getItem('todo'))
        });
    }

    componentWillUpdate(nextProps, nextState){
        localStorage.setItem('todo', JSON.stringify(nextState.todo));
    }
        
    generateKey(x){
        return `${x}_${ new Date().getTime() }`.split(' ').join('_').replace(/[^\w\s]/gi, '');
    }
    
    handleSubmit(input){
        var newArray = this.state.todo.slice();    
        newArray.push({item:input, key: this.generateKey(input), checked:false});   
        this.setState({todo : newArray});
    }
    
    handleDelete(e){
        var updateList = Object.assign([], this.state.todo);
        updateList = updateList.filter(function( obj ) {
        return obj.key !== e;
        });
        this.setState({todo: updateList});
    }
    
    handleCheckbox(el){
        const tempObj = Object.assign([], this.state.todo);
        function check(x) { 
            return x.key === el.target.id;
        }
        const tempObj1 = tempObj.find(check);
        if(tempObj1.checked === true){
            tempObj1.checked = false;
        } else if (tempObj1.checked === false){
            tempObj1.checked = true;
        }
        this.setState({todo:tempObj});
    }
    
    checkBox(item){
        if(item.checked === true){
            return <input className="todo-checkbox" type="checkbox" onChange={this.handleCheckbox} value={item.item} id={item.key} defaultChecked/>;
        } else {
            return <input className="todo-checkbox" type="checkbox" onChange={this.handleCheckbox} value={item.item} id={item.key} />;
        }
    }

    
    
    render(){
        const todoItems = this.state.todo.map((item) => {
        const viewBox = this.props.viewBox;
        let checked;
        if(item.checked === true){
            checked = 'checked';
        } else {
            checked= 'unchecked';
        }
        const TDList =  <li key={item.key} className="todo-item">
                            <label>
                                {this.checkBox(item)}
                            </label>
                            <span className={checked}> {item.item} </span>
                            <i className="todo-destroy" onClick={event => this.handleDelete(item.key)}>✕</i>
                        </li>;
        if(viewBox === "Today"){
            return TDList;
        }
        else{
            if(checked !== 'unchecked'){
        return(
            TDList
        );
            } else {
                return null;
            }
        } 

    });
        return(
            <div>
                <ul id="todo-list-container">
                    {todoItems}
                </ul>
                <TodoListInput 
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

export default TodoList;