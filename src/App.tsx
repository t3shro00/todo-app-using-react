import React, { useState } from "react";
import logo from "./logo.svg";

interface Todos {
  text: string;
  completed: boolean;
}
function App() {
  const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, completed: false }]);
      setInput("");
    }
  };

  const startEdit = (index: number) => {
    setEditIndex(index);
    setInput(todos[index].text);
  };
  const saveEdit = () => {
    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex].text = input;
      setTodos(updatedTodos);
      setEditIndex(null);
      setInput("");
    }
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="App">
        <h1>To-Do List</h1>
        <input
          type="text"
          value={input}
          placeholder="Add to do..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={editIndex !== null ? saveEdit : addTodo}>
          {editIndex !== null ? "Save" : "Add"}
        </button>
      </div>
      <div className="list-of-todos">
        <ul>
          {todos.map((todo, index) => {
            return (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => {
                    const newTodos = [...todos];
                    newTodos[index].completed = !newTodos[index].completed;
                    setTodos(newTodos);
                  }}
                />
                {todo.text}
                <button onClick={() => startEdit(index)}>Edit</button>

                <button onClick={() => deleteTodo(index)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
