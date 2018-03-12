import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import flow from 'lodash/flow';

const Types = {
	LIST: 'list',
};

const style = {
	cursor: 'move',
}

const itemSource = {
	beginDrag(props) {
		return {
			id: props.key,
			index: props.index,
		}
	},
}

const itemTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}

		// Time to actually perform the action
		props.moveItem(dragIndex, hoverIndex)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex
	},
}

 function drop(connect){
     return{
	connectDropTarget: connect.dropTarget(),
     }
}
function drag(connect, monitor) {
    return{
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}
}



class Item extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		index: PropTypes.number.isRequired,
		isDragging: PropTypes.bool.isRequired,
		id: PropTypes.any.isRequired,
		text: PropTypes.string.isRequired,
		moveItem: PropTypes.func.isRequired,
	}

	render() {
	   // const viewBox = this.props.viewBox;
// 		let checked;
//         if(checked === true){
//             checked = 'checked';
//         } else {
//             checked= 'unchecked';
//         }
const TDList =  
        <li 
            key={this.props.key} 
            id={`${this.props.key}-li`} 
            className="todo-item" 
        >
        <label>
            {this.props.checkBox}
        </label>
        {this.props.item.isEditing ? <form 
            id='edit-form' 
            onSubmit={this.props.formSubmit}>
                <input  
                autoFocus 
                onFocus={this.props.inputFocus}
                onBlur={this.props.inputBlur}
                value={this.props.editTerm} 
                onChange={this.props.inputOnchange}
                />
            </form>
            : 
            <span 
            className={this.props.checked}> 
                {this.props.text} 
            </span>
        }
        <div className=" todo-options dropdown" id={`${this.props.key}-op`}>
            <button className="btn todo-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-ellipsis-h"></i>
            </button>
            <div id={`${this.props.key}-o`}className="todo-panel-o dropdown-menu">
            <ul className="todo-ul-o">
                <li className="todo-box-o" onClick={this.props.handleEdit}>Edit</li>
                {/* <li className="todo-box-o">Move To...</li>*/}
                <li className="todo-box-o" onClick={this.props.handleDelete}>Delete</li>
            </ul>
            </div>
        </div>
        </li>;


		const {
			isDragging,
			connectDragSource,
			connectDropTarget,
		} = this.props
		const opacity = isDragging ? 0 : 1

		return this.props.item.isEditing? TDList : connectDragSource(connectDropTarget(<div style={{style,opacity}}>{TDList}</div>),);
	}
}

export default flow([DragSource(Types.LIST, itemSource, drag), DropTarget(Types.LIST, itemTarget, drop)])(Item)


//reset isEditing when page reloads and only allow connectDragSource if this.props.item.isEditing === false