import styles from './style.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerNavTop}>
        <div className="logoBlock">
          <div className="logo">
            <img src="src/resoures/img/logo.svg" alt="acscas" />
          </div>
        </div>
        <div className={styles.headerNavTopLogin}>
          <button className={styles.loginButton}>Log in</button>
        </div>
      </div>

      <div className={styles.headerNavBottom}>
        <a href="" className={styles.headerNavBottomItem}>
          Home
        </a>
        <a
          href="src/Pages/Vocabular/Vocabular.jsx"
          className={styles.headerNavBottomItem}
        >
          Vocabular
        </a>
        <a href="" className={styles.headerNavBottomItem}>
          Grammar
        </a>
        <a href="" className={styles.headerNavBottomItem}>
          Levels
        </a>
        <a href="" className={styles.headerNavBottomItem}>
          Skills
        </a>
        <a href="" className={styles.headerNavBottomItem}>
          Special language
        </a>
        <a href="" className={styles.headerNavBottomItem}>
          General
        </a>
        <a href="" className={styles.headerNavBottomItem}>
          Tests
        </a>
      </div>
    </header>
  )
}
export default Header
