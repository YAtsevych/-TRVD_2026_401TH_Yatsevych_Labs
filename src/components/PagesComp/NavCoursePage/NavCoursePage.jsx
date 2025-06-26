import { NavLink } from 'react-router-dom'
import styles from './style.module.css'
import React from 'react'
const NavCoursePage = ({ data }) => {
  return (
    <>
      <div className={styles.NavCoursePage}>
        {data.map((li) => {
          return (
            <NavLink
              key={li.idcourse}
              to={li.courselink}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {li.coursetitle}
            </NavLink>
          )
        })}
      </div>
    </>
  )
}
export default NavCoursePage
