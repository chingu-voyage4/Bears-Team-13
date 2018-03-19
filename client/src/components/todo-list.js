import React, {Component} from 'react';
import axios from 'axios';

import TodoListInput from './todo-list-input';
import update from 'immutability-helper';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TodoListItem from './todo-list-item';

class TodoList extends Component { 
    constructor(props){
        super(props);
        this.state = {
            todo: [],
            term: "",
            editTerm:""
        };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.moveItem = this.moveItem.bind(this);
    }
    
    componentWillMount(){
        const populate = JSON.parse(localStorage.getItem('todo'));
        if(populate !== null){
        populate.map(x => x.isEditing = false);
        localStorage.setItem('todo', JSON.stringify(populate)) 
        this.setState({todo:populate});
        }
    }

    componentWillUpdate(nextProps, nextState){
        localStorage.setItem('todo', JSON.stringify(nextState.todo));
        var isLoggedIn = this.props.loggedInUser;
        if(!isLoggedIn){
            axios('https://momentum-server-bt13.herokuapp.com/api/update_todo', {
                method: 'post',
                data: JSON.parse(localStorage.getItem('todo')),
                withCredentials: true,
                headers: {
                    'Content-Type': 'text/plain'
                }
            }).then(res => console.log(res))
            .catch(err => console.log(err));
        }
    }

    onInputChange(term){
        this.setState({term});
    }
        
    generateKey(x){
        return `${x}_${ new Date().getTime() }`.split(' ').join('_').replace(/[^\w\s]/gi, '');
    }
    
    handleSubmit(input){
        var newArray = this.state.todo.slice();    
        newArray.push({item:input, key: this.generateKey(input), checked:false, isEditing:false});   
        this.setState({todo : newArray});
        this.setState({term: ""});
        
    }
    editSubmit(val, target){
        this.handleFindByKey(target, 'isEditing', 'submit', val)
    }
    handleDelete(e){
        var updateList = Object.assign([], this.state.todo);
        updateList = updateList.filter(function( obj ) {
        return obj.key !== e;
        });
        this.setState({todo: updateList});
    }
    
    handleCheckbox(el){
        this.handleFindByKey(el.target.id, 'checked');
    }
    handleEdit(el){
        this.handleFindByKey(el, 'isEditing', 'handle');
    }
    handleFindByKey(search, objKey, edit, val){
        const tempObj = Object.assign([], this.state.todo);
        const tempObj1 = tempObj.find(x => { return x.key === search})
        if(edit === 'submit'){
            tempObj1.item = val;
        }
        tempObj1[objKey] ? tempObj1[objKey] = false : tempObj1[objKey] = true;
        this.setState({todo:tempObj});
        if(edit === 'handle'){
            this.setState({editTerm:tempObj1.item})
        }
    }
    
    checkBox(item){
        return( item.checked ? 
        <input className="todo-checkbox" type="checkbox" onChange={this.handleCheckbox} value={item.item} id={item.key} defaultChecked/> 
        :  
        <input className="todo-checkbox" type="checkbox" onChange={this.handleCheckbox} value={item.item} id={item.key} />
        )
    }
    
    moveItem(dragIndex, hoverIndex) {
		const { todo } = this.state;
		const dragItem = todo[dragIndex];
		this.setState(
			update(this.state, {
				todo: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]],
				},
			}),
		);
	}
    
	render() {
		const { todo } = this.state;
		return (
			<div>
			<ul>
				{todo.map((item, i) => {
					let checked;
                    if(item.checked === true){
                        checked = 'checked';
                    } else {
                        checked= 'unchecked';
                    }
				    const viewBox = this.props.viewBox;
			        const compiledTodo = (
                        <TodoListItem
                    	    key={item.key}
            				index={i}
            				item={item}
            				id={item.key}
            				text={item.item}
            				moveItem={this.moveItem}
            				viewBox={this.props.viewBox}
            				checkBox={this.checkBox(item)}
            				formSubmit={(e) => {e.preventDefault(); this.editSubmit(this.state.editTerm, item.key)}}
            				inputFocus={(e) => {var val = e.target.value;e.target.value = '';e.target.value = val;}}
            				inputBlur={(e) => {e.preventDefault(); this.editSubmit(this.state.editTerm, item.key)}}
            				editTerm={this.state.editTerm}
            				inputOnchange={event => this.setState({editTerm:event.target.value})}
            				handleEdit={event => this.handleEdit(item.key)}
            				handleDelete={event => this.handleDelete(item.key)}
            				checked={checked}
            			/>
		            );
				    if(viewBox === "Today"){
				        return compiledTodo;
				    }
				    else{
                        if(checked !== 'unchecked'){
				            return	compiledTodo;
                        } else {
                            return null;
                        }
                    }
				}
				)}
			</ul>
			<TodoListInput 
                handleSubmit={this.handleSubmit}
                term={this.state.term}
                onInputChange={this.onInputChange}
            />
			</div>
		);
	}
}


export default DragDropContext(HTML5Backend)(TodoList);
