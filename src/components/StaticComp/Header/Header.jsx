import { isAuthenticated, logout } from "../../../resoures/auth.js";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./style.module.css"; // Подключаем новый файл стилей

const Header = ({ pages }) => {
  const authed = isAuthenticated();
  const navigate = useNavigate();
  if (!pages) {
    return <div>Загрузка...</div>;
  }

  // Фильтруем страницы, чтобы отделить "Home" и остальные
  const homePage = pages.find((p) => p.title === "Home" || p.title === "Acasă");
  const otherPages = pages.filter(
    (p) => p.title !== "Home" && p.title !== "Acasă",
  );

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Логотип */}
        <Link to="/" className={styles.logo}>
          Consul
        </Link>

        {/* Навигационные ссылки */}
        <div className={styles.navLinks}>
          {homePage && (
            <NavLink
              to={homePage.link}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              {homePage.title}
            </NavLink>
          )}
          {otherPages.map((page) => (
            <NavLink
              key={page.idpages}
              to={page.link}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              {page.title}
            </NavLink>
          ))}
        </div>
        {/* Кнопка входа */}
        <div>
          {!authed ? (
            <div>
              <Link to="/login" className={styles.loginButton}>
                Log In
              </Link>

              <Link to="/registration" className={styles.loginButton}>
                Sign In
              </Link>
            </div>
          ) : (
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className={styles.loginButton}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
