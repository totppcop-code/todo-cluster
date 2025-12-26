import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/todos/";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  // 取得所有 Todo
  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setTodos(res.data);
    });
  }, []);

  // 新增 Todo
  const addTodo = () => {
    if (!title.trim()) return;
    axios.post(API_URL, { title, content: "預設內容", is_done: false }).then((res) => {
      setTodos([...todos, res.data]);
      setTitle("");
    });
  };

  // 刪除 Todo
  const deleteTodo = (id) => {
    axios.delete(`${API_URL}${id}/`).then(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
    });
  };

  // 切換完成/未完成 (用 PATCH，只送 is_done)
  const toggleTodo = (id, is_done) => {
    axios.patch(`${API_URL}${id}/`, { is_done: !is_done }).then((res) => {
      setTodos(todos.map((todo) => (todo.id === id ? res.data : todo)));
    });
  };

  // 編輯 Todo（簡單示範：只改標題）
  const editTodo = (id, oldTitle) => {
    const newTitle = prompt("輸入新的標題：", oldTitle);
    if (newTitle && newTitle.trim()) {
      axios.patch(`${API_URL}${id}/`, { title: newTitle }).then((res) => {
        setTodos(todos.map((todo) => (todo.id === id ? res.data : todo)));
      });
    }
  };

  return (
    <div>
      <h1>📋 Todo List</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="輸入標題"
      />
      <button onClick={addTodo}>新增</button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "15px" }}>
            {todo.title}
            <button
              onClick={() => toggleTodo(todo.id, todo.is_done)}
              style={{
                marginLeft: "10px",
                backgroundColor: todo.is_done ? "green" : "orange",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              {todo.is_done ? " 完成" : " 未完成"}
            </button>
            <button
              onClick={() => editTodo(todo.id, todo.title)}
              style={{ marginLeft: "10px" }}
            >
              ✏️ 編輯
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                marginLeft: "10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              🗑️ 刪除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
