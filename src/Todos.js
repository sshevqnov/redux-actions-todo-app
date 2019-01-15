import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo, checkTodo, fetchTodos } from "./redux/TodosStore";
import nanoid from 'nanoid'

class Todos extends Component {
  state = {
    title: "",
    text: ""
  };

  componentDidMount() {
    this.props.fetchTodos()
  }

  handleInputChange = e => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }


  render() {
    const {todos, addTodo, checkTodo} = this.props
    const {title, text} = this.state
    return <div>
        <input name="title" onChange={this.handleInputChange} />
        <input name="text" onChange={this.handleInputChange} />
        <button
          onClick={() =>
            addTodo({ title, text, id: nanoid(), checked: false })
          }
        >
          Add Todo
        </button>
        <br />
        <ul>
          {todos.map(todo => (
            <li
              key={todo.id}
              style={{ color: todo.checked ? "black" : "lightblue" }}
            >
              <strong style={{cursor: 'pointer'}} onClick={() =>  checkTodo(todo.id)}>
                {todo.title}
              </strong>
              <br />
              <i>{todo.text}</i>
            </li>
          ))}
        </ul>
      </div>;
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch => ({
  addTodo: payload => dispatch(addTodo(payload)),
  checkTodo: id => dispatch(checkTodo(id)),
  fetchTodos: () => dispatch(fetchTodos())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);
