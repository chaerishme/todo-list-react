import "./App.css";
import { useState, useRef } from "react";
import Editor from "./components/Editor";
import Header from "./components/Header";
import List from "./components/List";

function App() {
  const [todos, setTodos] = useState([]);
  const idRef = useRef(0);

  const onCreate = (content) => {
    // 새로운 Todo 아이템을 객체 형태로 만듦
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };
    setTodos([newTodo, ...todos]);
  };

  const onUpdate = (targetId) => {
    // todos state 값 중 targetId와 일치하는 id를 갖는 todo item의 isDone 변경
    // 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 새로운 배열
    setTodos(
      todos.map((todo) =>
        todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo,
      ),
    );
  };

  const onDelete = (targetId) => {
    // 인수: todos 배열에서 targetId와 일치하는 id 요소를 제외한 새로운 배열
    setTodos(todos.filter((todo) => todo.id !== targetId));
  };

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
