import React from 'react'
import { Link } from 'react-router-dom'
import styles from './style.module.css' // Подключаем новый файл стилей

// Компонент для иконок, чтобы было проще их использовать
const Icon = ({ name }) => <i data-lucide={name} className={styles.icon}></i>

const Footer = () => {
  // В реальном приложении React, вам нужно будет убедиться,
  // что скрипт lucide.createIcons() вызывается после рендеринга.
  // React.useEffect(() => { if(window.lucide) window.lucide.createIcons() }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerMain}>
          {/* Блок с информацией */}
          <div className={styles.footerInfo}>
            <Link to="/" className={styles.logo}>
              Consul
            </Link>
            <p className={styles.footerText}>
              A personal project by Yaroslav Yatsevych — a student from Ukraine.
              <br />
              An independent initiative focused on cultural exchange and
              educational opportunities.
            </p>
          </div>

          {/* Блок с навигацией и социальными сетями */}
          <div className={styles.footerLinksContainer}>
            <div className={styles.footerNav}>
              <Link to="/about" className={styles.footerLink}>
                About us
              </Link>
              <Link to="/start" className={styles.footerLink}>
                Getting start
              </Link>
              <Link to="/contact" className={styles.footerLink}>
                Contact us
              </Link>
            </div>
            <div className={styles.footerSocials}>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <Icon name="instagram" />
              </a>
              <a href="#" className={styles.socialLink} aria-label="GitHub">
                <Icon name="github" />
              </a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <Icon name="linkedin" />
              </a>
            </div>
          </div>
        </div>

        {/* Копирайт */}
        <div className={styles.footerCopyright}>
          © {new Date().getFullYear()} Consul. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
