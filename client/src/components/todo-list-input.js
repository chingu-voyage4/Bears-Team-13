import React from 'react';

const TodoListInput = (props) => {
        return(
            <div>
                <form onSubmit={(e) => {e.preventDefault(); props.handleSubmit(props.term); }}> 
                    <input
                        id="todo-input"
                        placeholder = "New Todo"
                        value = {props.term}
                        onChange={event => props.onInputChange(event.target.value)} 
                        onMouseDown={ (e) => e.target.focus() }
                        />
                </form>
            </div>
        )
    }

export default TodoListInput;

// https://github.com/react-dnd/react-dnd/issues/463