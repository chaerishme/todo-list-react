import "./Header.css";

const Header = () => {
  return (
    <div className="Header">
      <div>오늘은 📆</div>
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
};

export default Header;
