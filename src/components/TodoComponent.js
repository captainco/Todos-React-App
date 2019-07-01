import React from 'react';


export default class Todo extends React.Component{

  render() {
    const todo = this.props.todo;
    const todoLableStyle =  this.props.todo.done ? {
      textDecoration : 'line-through',
      color: "red"
    }: {}

    return (
      <div>
        <label style={todoLableStyle}>
          <input type="checkbox" onChange={this.props.onDoneChange} checked={todo.done}></input>          
          &nbsp; {todo.name}
        </label>
      </div>
    );
  } 
}
