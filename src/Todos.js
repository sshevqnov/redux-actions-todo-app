import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo } from "./redux/TodosStore";

class Todos extends Component {
  state = {
    title: "",
    text: ""
  };

  handleInputChange = e => {
    const {name, value} = e
    this.setState({
      [name]: value
    })
  }

  render() {
    const {todos, addTodo} = this.props
    return (
      <div>
        {Object.keys(
          this.state).map(i => (
            <input name={i} key={i} onChange={this.handleInputChange} />
          ))
        }
        <button onClick={() => addTodo({...this.state})}>Add Todo</button>
        <br />
        <ul>
          {todos.map(todo => (
            <li>
              <strong>{todo.title}</strong>
              <i>{todo.text}</i>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch => ({
  addTodo: payload => dispatch(addTodo(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);
