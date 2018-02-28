import React from 'react';

const TodoList = ({todo, todoDelete, checkbox, checked}) => {
    return(
        <li className="todo-item">
        <label>
            {checkbox}
        </label>
        <span className={`${checked}`}>
            {todo}
        </span>
        <i className="todo-destroy" onClick={todoDelete}>✕</i>
        </li>
    )
}

export default TodoList;