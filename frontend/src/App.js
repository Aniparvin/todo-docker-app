import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const API = "/api/todos/";

  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title) return;
    await axios.post(API, { title });
    setTitle("");
    fetchTodos();
  };
  const updateTodo = async (id, newTitle) => {
    await fetch(`/api/todos/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: newTitle }),
    });

    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}${id}/`);
    fetchTodos();
  };
  
  const toggleTodo = async (todo) => {
    await axios.put(`${API}${todo.id}/`, {
      ...todo,
      completed: !todo.completed,
    });
    fetchTodos();
  };

  return (
    <div className="container">
      <h1>📝 Todo App</h1>

      <div className="input-section">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span
              onClick={() => toggleTodo(todo)}
              className={todo.completed ? "completed" : ""}
            >
              {todo.title}
            </span>
            <button className="delete" onClick={() => deleteTodo(todo.id)}>
              ❌
            </button>
            <button onClick={() => updateTodo(todo.id, prompt("Edit todo:", todo.title))}>
              Edit
            </button>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;