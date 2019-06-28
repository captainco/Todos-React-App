import React, {Component} from 'react';
// import Stat               from './Components/StatComponent';
// import Todo               from './Components/TodoComponent';
// import NewTodoForm        from './Components/NewTodoFormComponent';
import                         './App.css';

class Stat extends Component {
  render(){
    const {done, total} = this.props
    return (
      <strong>
        <span>Done: {done}</span>/<span>Total: {total}</span>
      </strong>
    )
  }
}

class NewTodoForm extends Component {
  state = {
    newTodoName : ''
  }

  onInputChange(newTodoName) {
    this.setState({
      newTodoName
    })
  }

  render() {
    const {onNewToDo} = this.props
    return (
      <div>
        <input type="text" onChange={(even)=>{
          this.onInputChange(even.target.value);
        }} value={this.state.newTodoName}></input>
        &nbsp;
        <button types="submit" onClick={
          () => {
            onNewToDo(
              {
                name: this.state.newTodoName,
                done: false
              }
            )
          }
        }>Add</button>
      </div>
    )
  }
}

class Todo extends Component{

  render() {
    const todo = this.props.todo;
    const todoLableStyle =  this.props.todo.done ? {
      textDecoration : 'line-through',
      color: "gray"
    }: {}

    return (
      <div>
        <input type="checkbox" onChange={this.props.onDoneChange} checked={todo.done}></input>
        <span style={todoLableStyle}>{todo.name}</span>
      </div>
    );
  } 
}

export default class App extends Component {
  state = {
    todos: [
      {name:'Todo 1', done:true},
      {name:'Todo 2', done:false},
      {name:'Todo 3', done:false}
    ]
  }

  addNewTodo(newTodo) {
      this.setState({
      todos:[...this.state.todos, newTodo]
    })
  }

  countDone() {
    let done = 0;
    this.state.todos.forEach(todo=>{
      if (todo.done) {
        done++;
      }
    })
    return done;
  }

  clearDone() {
    const notFinishedTodo = this.state.todos.filter((todo) => !todo.done);
    this.setState({
      todos:notFinishedTodo
    })
  }

  selectAll(right) {
    const todos = this.state.todos;
    for (let i = 0; i < todos.length; i++) {
      todos[i].done = right;
    }
    this.setState({
      todos: todos
    })
  }

  handleDoneChange(todoIndex) {
    let updatedTodos             = this.state.todos;
    updatedTodos[todoIndex].done = !updatedTodos[todoIndex].done;

    this.setState({
      todos: updatedTodos
    })
  }

  render() {
    const done      = this.countDone();
    const totalTodo = this.state.todos.length;

    return (
      <div>
        <div className={'todo-status'}>
          <Stat done={done} total={totalTodo}/><br/>
          <button onClick={() => this.selectAll(true)}>Select All</button>&nbsp;
          <button onClick={() => this.selectAll(false)}>Unselect All</button>&nbsp;
          <button onClick={()=> this.clearDone()}>Clear Done</button>
        </div>

        <div className={'todo-list'}>
          <ul>
            {
              this.state.todos.map((todo, index)=>(<Todo onDoneChange={()=>{
                this.handleDoneChange(index);
              }} key={index} todo={todo} />))
            }
          </ul>
        </div>

        <div className={'new-todo-form'}>
          <NewTodoForm onNewToDo={(todo)=>{
            this.addNewTodo(todo)
          }}/>
        </div>
      </div>
    )
  }
}
