import React, { Component } from "react";
import                           "./App.css";
import                           "bootstrap/dist/css/bootstrap.css";
import                           "font-awesome/css/font-awesome.css";
import Stat                 from "./components/StatComponent";
import Todo                 from "./components/TodoComponent";
import NewTodoForm          from "./components/NewTodoFormComponent";

class App extends Component {
  state = {
    todos: [],
    loading: true,
    url: "https://todos.sphinx-demo.com/todos/"
  };

  async addNewTodo(newTodo) {
    await this.postTodo(newTodo);
    await this.getTodos();
  }

  async postTodo(newTodo) {
    await fetch(this.state.url, {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json());
  }

  countDone() {
    let done = 0;
    this.state.todos.forEach(todo => {
      if (todo.done) {
        done++;
      }
    });
    return done;
  }

  async deleteTodo(todoId) {
    await fetch(this.state.url + todoId, {
      method: "DELETE"
    }).then(res => res.json());
    await this.getTodos();
  }

  async clearDone() {
    await this.state.todos.filter(async todo =>
      todo.done ? await this.deleteTodo(todo.id) : await !todo.done
    );
    await this.getTodos();
  }

  selectAll(right) {
    const todos = this.state.todos;
    todos.forEach((todo) => todo.done = right)
    this.setState({
      todos
    });
  }

  async updateTodo(todo) {
    await fetch(this.state.url + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ done: todo.done })
    }).then(res => res.json());
  }

  async handleDoneChange(index) {
    let updatedTodo = this.state.todos;
    updatedTodo[index].done = !updatedTodo[index].done;
    await this.updateTodo(updatedTodo[index]);
    await this.getTodos();
  }

  async getTodos() {
    this.setState({loading: true});
    await fetch("https://todos.sphinx-demo.com/todos")
      .then(res => res.json())
      .then(todos => {
        this.setState({
          todos, loading: false
        });
      });
  }

  async componentDidMount() {
    await this.getTodos();
  }

  render() {
    const done = this.countDone();
    const totalTodo = this.state.todos.length;

    return (
        <div className={"main"}>
            <div className={'navbar navbar-dark bg-dark fixed-top'}>
                <div className="container-fluid">
                    <div className="navbar-brand">
                        <Stat done={done} total={totalTodo} />
                    </div>
                    <div className="navbar-right">
                        <button className={"btn btn-info btn-sm btn-clear"}
                                onClick={() => this.clearDone()}
                        >Clear</button>
                    </div>
                </div>
            </div>
            <div className={'todo-list'}>
                {this.state.loading ? (
                    <div className={"flex"}><i className={'fa fa-3x fa-spin fa-spinner'}/></div>) : (
                    <ul className={'list-group'}>
                        {
                            this.state.todos.map((todo, index) => {
                                return (
                                    <li className={'list-group-item'} key={index}>
                                        <Todo
                                            todo={todo}
                                            onDoneChange={() => this.handleDoneChange(index)}
                                        />
                                    </li>
                                );
                            })
                        }
                    </ul>
                  )
                }
            </div>
            <div className={'new-todo-form'}>
                <NewTodoForm onNewToDo={ todo => this.addNewTodo(todo) } />
            </div>
        </div>
    );
  }
}

export default App;
