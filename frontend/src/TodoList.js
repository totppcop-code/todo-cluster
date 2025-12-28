import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/todos/";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 取得所有 Todo
  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setTodos(res.data);
    });
  }, []);

  // 新增 Todo
  const addTodo = () => {
    if (!title.trim()) return;
    axios
      .post(API_URL, { title, content: content || "預設內容", is_done: false })
      .then((res) => {
        setTodos([...todos, res.data]);
        setTitle("");
        setContent("");
      });
  };

  // 刪除 Todo
  const deleteTodo = (id) => {
    axios.delete(`${API_URL}${id}/`).then(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
    });
  };

  // 切換完成/未完成
  const toggleTodo = (id, is_done) => {
    axios.patch(`${API_URL}${id}/`, { is_done: !is_done }).then((res) => {
      setTodos(todos.map((todo) => (todo.id === id ? res.data : todo)));
    });
  };

  // 編輯 Todo（標題與內容）
  const editTodo = (id, oldTitle, oldContent) => {
    const newTitle = prompt("輸入新的標題：", oldTitle);
    const newContent = prompt("輸入新的內容：", oldContent);
    if ((newTitle && newTitle.trim()) || (newContent && newContent.trim())) {
      axios
        .patch(`${API_URL}${id}/`, {
          title: newTitle || oldTitle,
          content: newContent || oldContent,
        })
        .then((res) => {
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
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="輸入內容"
        style={{ marginLeft: "10px" }}
      />
      <button onClick={addTodo}>新增</button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "15px" }}>
            {/* 標題 + 狀態，完成的加刪除線 */}
            <strong
              style={{
                textDecoration: todo.is_done ? "line-through" : "none",
                color: todo.is_done ? "gray" : "black",
              }}
            >
              {todo.title}
            </strong>{" "}
            {todo.is_done ? "完成" : "未完成"}

            {/* 顯示內容 */}
            <div style={{ marginTop: "5px", color: "#555" }}>
              內容: {todo.content}
            </div>

            {/* 操作按鈕 */}
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
              {todo.is_done ? "✅ 完成" : "⭕ 未完成"}
            </button>
            <button
              onClick={() => editTodo(todo.id, todo.title, todo.content)}
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
