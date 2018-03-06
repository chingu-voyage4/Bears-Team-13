import React, {Component} from 'react';

class TodoListInput extends Component {
    constructor(props){
        super(props);
        this.state ={
            term:''
        }
    }
    
    onInputChange(term){
        this.setState({term});
    }

    render(){
        return(
            <div>
                <form onSubmit={(e) => {e.preventDefault(); this.props.handleSubmit(this.state.term); this.setState({term:""})}}> 
                    <input
                        id="todo-input"
                        placeholder = "New Todo"
                        value = {this.state.term}
                        onChange={event => this.onInputChange(event.target.value)} 
                        />
                </form>
            </div>
        )
    }
    
}

export default TodoListInput;