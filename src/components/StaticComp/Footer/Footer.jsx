import styles from './style.module.css'
import { Link } from 'react-router-dom'
import React from 'react'
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerFirstRow}>
        <div className="logo">
          <Link to="/">
            <img src="/resoures/img/logo/logo.svg" alt="acscas" />
          </Link>
        </div>
        <div className={styles.footerNav}>
          <Link to="" className={styles.footerNavItem}>
            About us
          </Link>
          <Link to="" className={styles.footerNavItem}>
            Getting start
          </Link>
          <Link to="" className={styles.footerNavItem}>
            Contact us
          </Link>
          <Link to="" className={styles.footerNavItem}>
            Site map
          </Link>
        </div>
        <div className={styles.footerContacts}>
          <Link to="" className={styles.footerContactsItem}>
            <img src="/resoures/img/icons/instagram_icon.png" alt="" />
          </Link>
          <Link to="" className={styles.footerContactsItem}>
            <img src="/resoures/img/icons/github_icon.png" alt="" />
          </Link>
          <Link to="" className={styles.footerContactsItem}>
            <img src="/resoures/img/icons/linkedin_icon.png" alt="" />
          </Link>
        </div>
      </div>
      <div className={styles.footerSecondRow}>
        © SpeackFree <br></br>A personal project by Yaroslav Yatsevych — a
        student from Ukraine. <br></br>An independent initiative focused on
        cultural exchange and educational opportunities. Not affiliated with any
        official organization.
      </div>
    </footer>
  )
}
export default Footer
