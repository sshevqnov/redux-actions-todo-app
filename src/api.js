import axios from 'axios'

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: "3000",
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
});

export const fetchTodos = () => api.get("/todos/1")