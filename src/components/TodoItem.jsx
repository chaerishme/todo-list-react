import "./TodoItem.css";
import { memo } from "react";

const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onClickDeleteButton = () => {
    onDelete(id);
  };

  return (
    <div className="TodoItem">
      <input onChange={onChangeCheckbox} checked={isDone} type="checkbox" />{" "}
      {/*button이 아니라 input 요소이기 때문에 onClick이 아닌 onChange 사용*/}
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickDeleteButton}>삭제</button>
    </div>
  );
};

export default memo(TodoItem, (prevProps, nextProps) => {
  // 변화에 따라 props가 바뀌었는지 안 바뀌었는지 판단
  // T -> Props 바뀌지 않았으므로 리렌더링 X
  // F -> Props 바뀌었으므로 리렌더링 O

  if (prevProps.id !== nextProps.id) return false;
  if (prevProps.isDone !== nextProps.isDone) return false;
  if (prevProps.content !== nextProps.isDone) return false;
  if (prevProps.date !== nextProps.date) return false;

  return true;
});
