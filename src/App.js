import React, {Component} from 'react';
import Stat from './Components/StatComponent';
import Todo from './Components/TodoComponent';
import NewTodoForm from './Components/NewTodoFormComponent';
import './App.css';
// import 'font-awesome/dist';

export default class App extends Component {
    state = {
        todos: []
    }

    getTodo() {
        fetch('http://todos.sphinx-demo.com/todos')
            .then(res => res.json())
            .then(todo => this.setState({todos: todo}));
    }

    addNewTodo(newTodo) {

        fetch('http://todos.sphinx-demo.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        })
        .then(() => {
            this.getTodo();
        });
    }

    deleteTodo() {
        this.state.todos.forEach(todo => {
            if (todo.done) {
                fetch('http://todos.sphinx-demo.com/todos/' + todo.id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            }
        })
    }

    countDone() {
        let done = 0;
        this.state.todos.forEach(todo => {
            if (todo.done) {
                done++;
            }
        })
        return done;
    }

    clearDone() {
        const notFinishedTodo = this.state.todos.filter((todo) => !todo.done);
        this.deleteTodo();
        this.setState({
            todos: notFinishedTodo
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
        let updatedTodos = this.state.todos;
        updatedTodos[todoIndex].done = !updatedTodos[todoIndex].done;

        this.setState({
            todos: updatedTodos
        })
    }

    componentDidMount() {
        this.getTodo();
    }

    render() {
        const done = this.countDone();
        const totalTodo = this.state.todos.length;

        return (
            <div>
                <div className={'todo-status'}>
                    <Stat done={done} total={totalTodo}/><br/>
                    <button onClick={() => this.selectAll(true)}>Select All</button>
                    &nbsp;
                    <button onClick={() => this.selectAll(false)}>Unselect All</button>
                    &nbsp;
                    <button onClick={() => this.clearDone()}>Clear Done</button>
                </div>

                <div className={'todo-list'}>
                    
                    <ul>
                        {
                            this.state.todos.map((todo, index) => (<Todo onDoneChange={() => {
                                this.handleDoneChange(index);
                            }} key={index} todo={todo}/>))
                        }
                    </ul>

                </div>

                <div className={'new-todo-form'}>
                    <NewTodoForm onNewToDo={(todo) => {
                        this.addNewTodo(todo)
                    }}/>
                </div>
            </div>
        )
    }
}
