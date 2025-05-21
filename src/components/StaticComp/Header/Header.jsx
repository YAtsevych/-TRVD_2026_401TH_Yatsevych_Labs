import styles from './style.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Header = ({ pages }) => {
  if (!pages) return <div>Загрузка...</div>
  else
    return (
      <header className={styles.header}>
        <div className={styles.headerNavTop}>
          <div className="logoBlock">
            <div className="logo">
              <Link to="/" className={styles.headerNavBottomItem}>
                <img src="/resoures/img/logo/logo.svg" alt="logo" />
              </Link>
            </div>
          </div>
          <div className={styles.headerNavTopLogin}>
            <Link to="/registration" className={styles.headerNavBottomItem}>
              Log in
            </Link>
          </div>
        </div>

        <div className={styles.headerNavBottom}>
          {pages.map((card) => (
            <Link
              key={card.idPages}
              to={card.link}
              className={styles.headerNavBottomItem}
            >
              {card.title}
            </Link>
          ))}
        </div>
      </header>
    )
}
export default Header
