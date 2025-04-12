import styles from './style.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerFirstRow}>
        <div className="logo">
          <img src="src/resoures/img/logo.svg" alt="acscas" />
        </div>
        <div className={styles.footerNav}>
          <a href="" className={styles.footerNavItem}>
            About us
          </a>
          <a href="" className={styles.footerNavItem}>
            Getting start
          </a>
          <a href="" className={styles.footerNavItem}>
            Contact us
          </a>
          <a href="" className={styles.footerNavItem}>
            Site map
          </a>
        </div>
        <div className={styles.footerContacts}>
          <a href="" className={styles.footerContactsItem}>
            <img src="src/resoures/img/instagram_icon.png" alt="" srcset="" />
          </a>
          <a href="" className={styles.footerContactsItem}>
            <img src="src/resoures/img/github_icon.png" alt="" srcset="" />
          </a>
          <a href="" className={styles.footerContactsItem}>
            <img src="src/resoures/img/linkedin_icon.png" alt="" srcset="" />
          </a>
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
