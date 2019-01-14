import {createStore} from 'redux'
import { createActions, handleActions} from 'redux-actions'

const defaultState = {
  todos: []
}

export const {addTodo, deleteTodo, checkTodo} = createActions(
  "ADD_TODO", "DELETE_TODO", "CHECK_TODO"
)


const reducer = handleActions({
  [addTodo]: (state, {payload}) => {
    return {...state, todos: [...state.todos, payload]}
  },
  [deleteTodo]: (state, payload) => {
    return {...state, todos: state.todos.filter(todo => todo.id !== payload)}
  },
  [checkTodo]: (state, payload) => {
    return {...state, todos: [...state.todos, ...state.todos.map(todo => {
      if (todo.id === payload) return {...todo, checked: true}
    })]}
  }
  
}, defaultState)

export const store = createStore(reducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());