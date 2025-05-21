import { NavLink } from 'react-router-dom'
import styles from './style.module.css'

const NavCoursePage = ({ data }) => {
  return (
    <>
      <div className={styles.NavCoursePage}>
        {data.map((li) => {
          return (
            <NavLink
              key={li.idCourse}
              to={li.CourseLink}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {li.CourseTitle}
            </NavLink>
          )
        })}
      </div>
    </>
  )
}
export default NavCoursePage
