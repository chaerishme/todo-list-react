import "./App.css";
import { useReducer, useRef, useCallback, createContext, useMemo } from "react";
import Editor from "./components/Editor";
import Header from "./components/Header";
import List from "./components/List";

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.newItem, ...state];
    case "UPDATE":
      return state.map((todo) =>
        todo.id === action.targetId ? { ...todo, isDone: !todo.isDone } : todo,
      );
    case "DELETE":
      return state.filter((todo) => todo.id !== action.targetId);
    default:
      return state;
  }
}

// 특수한 경우가 아니면 컨텍스트는 컴포넌트 외부에 생성
export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  // 콜백함수를 메모 메서드에 전달하지 않아도 onUpdate, onDelete 함수가 다시 생성되지 않음
  // 따라서 TodoItem.jsx의 HOC는 주석 처리
  const onCreate = useCallback((content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
  }, []);

  // create, update, delete 함수 다시 생성되지 않도록 메모이제이션
  const memoizedDispatch = useMemo(() => {
    return {
      onCreate,
      onUpdate,
      onDelete,
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
