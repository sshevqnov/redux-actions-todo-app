import {createStore, applyMiddleware} from 'redux'
import {createAction, createActions, handleActions} from 'redux-actions'
import promiseMiddleware from 'redux-promise'
import * as api from "../api"

const defaultState = {
  todos: []
}

export const {addTodo, deleteTodo, checkTodo} = createActions(
  "ADD_TODO", "DELETE_TODO", "CHECK_TODO"
)

export const fetchTodos = createAction("FETCH_TODOS", async () => {
  const response = await api.fetchTodos()
  return response.data
})

const reducer = handleActions({
  [fetchTodos]: (state, {payload}) => console.log(payload),
  [addTodo]: (state, {payload}) => {
    return {...state, todos: [...state.todos, payload]}
  },
  [deleteTodo]: (state, {payload}) => {
    return {...state, todos: state.todos.filter(todo => todo.id !== payload)}
  },
  [checkTodo]: (state, {payload}) => {
    return {...state, todos: state.todos.map(todo => {
      if(todo.id === payload) return {...todo, checked: true}
      return todo
    })}
  }
}, defaultState)

export const store = createStore(reducer, defaultState,applyMiddleware(promiseMiddleware));