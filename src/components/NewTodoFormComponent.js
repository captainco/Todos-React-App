import React from "react";

export default class NewTodoForm extends React.Component {
  state = {
    newTodoName: ""
  };

  onInputChange(newTodoName) {
    this.setState({
      newTodoName
    });
  }

  render() {
    const { onNewToDo } = this.props;
    return (
      <div>
        <input
          type="text"
          placeholder={"Add new todo"}
          className={"form-control"}
          name={"newTodo"}
          onChange={even => this.onInputChange(even.target.value)}
          value={this.state.newTodoName}
        ></input>
        &nbsp;
        <input
          type="submit"
          className={"btn btn-primary btn-block"}
          onClick={() => {
            onNewToDo({
              name: this.state.newTodoName,
              done: false
            });
          }}
          value="ADD"
        ></input>
      </div>
    );
  }
}
