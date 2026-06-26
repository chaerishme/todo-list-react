import "./Header.css";
import { memo } from "react";

const Header = () => {
  return (
    <div className="Header">
      <div>오늘은 📆</div>
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
};

const memoizedHeader = memo(Header);

export default memoizedHeader;
