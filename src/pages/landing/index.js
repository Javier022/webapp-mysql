import { Link } from "react-router-dom";
import "./style.css";
import todoList from "../../assets/todo.svg";

const PublicPage = () => {
  return (
    <header className="header">
      <nav className="nav container">
        <figure className="nav__picture">
          <img
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
            className="nav__img"
          ></img>
        </figure>
        <div className="nav__links">
          <Link to="login" className="nav__link">
            Sign In
          </Link>
          <Link to="signup" className="nav__link nav__link--border">
            Sign Up
          </Link>
        </div>
      </nav>

      <section className="header__info container">
        <div className="info__container">
          <h1 className="info__title">Start adding tasks to do</h1>
          <p className="info__paragraph">Any task to do</p>
          <Link to="signup" className="info__btn">
            Get started
          </Link>
        </div>

        <figure className="header__picture">
          <img src={todoList} className="header__img"></img>
        </figure>
      </section>

      <div className="header__wave"></div>
    </header>
  );
};

export default PublicPage;
