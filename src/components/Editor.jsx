import "./Editor.css";
import { useState, useRef } from "react";

const Editor = ({ onCreate }) => {
  const [content, setContent] = useState("");
  const contentRef = useRef("");

  const onChangeConsent = (e) => {
    setContent(e.target.value);
  };

  const onKeydown = (e) => {
    // 키보드 누를 때 동작 (엔터 13번)
    if (e.keyCode === 13) onSubmit();
  };

  const onSubmit = () => {
    if (content === "") {
      contentRef.current.focus();
      return;
    }
    onCreate(content); // App 컴포넌트에 content 값 전달
    setContent("");
  };

  return (
    <div className="Editor">
      <input
        ref={contentRef}
        value={content}
        onChange={onChangeConsent}
        onKeyDown={onKeydown}
        placeholder="새로운 Todo..."
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;
