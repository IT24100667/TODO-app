import React, { useState, useEffect} from 'react'
import './App.css';
import axios from 'axios';



const API = 'http://localhost:5000/api/todos';

function App() {

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  // fetch all todos when page loads 
  useEffect(
    () => { 
      fetchTodos();
    },[]
  )

  const fetchTodos = async () => { 
    const res = await axios.get(API); 
    setTodos(res.data);
  }

  const addTodo = async () => {
    if (!text.trim()) return;
    const res = await axios.post(API, { text });
    setTodos([...todos, res.data]);
    setText('');
  };

  const toggleTodo = async (id) => {
    const res = await axios.patch(`${API}/${id}`);
    setTodos(todos.map(todo => todo._id === id ? res.data : todo));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div className="app">
      <h1>📝 Todo App</h1>

      {/* Add Todo */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo._id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggleTodo(todo._id)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
