import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './style.module.css' // Подключаем новый файл стилей

const Header = ({ pages }) => {
  if (!pages) {
    return <div>Загрузка...</div>
  }

  // Фильтруем страницы, чтобы отделить "Home" и остальные
  const homePage = pages.find((p) => p.title === 'Home' || p.title === 'Acasă')
  const otherPages = pages.filter(
    (p) => p.title !== 'Home' && p.title !== 'Acasă'
  )

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
                `${styles.navLink} ${isActive ? styles.active : ''}`
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
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              {page.title}
            </NavLink>
          ))}
        </div>

        {/* Кнопка входа */}
        <Link to="/registration" className={styles.loginButton}>
          Log In
        </Link>
      </nav>
    </header>
  )
}

export default Header
