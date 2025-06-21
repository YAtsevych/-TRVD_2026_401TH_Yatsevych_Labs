import styles from './style.module.css'
import { Link } from 'react-router-dom'
import React from 'react'
const CourseLink = ({ data }) => {
  return (
    <>
      <div className={styles.CourseLink}>
        <Link to={data.CourseLink}>
          <div
            className={styles.CourseLinkImg}
            style={{
              backgroundImage: `url(${data.CourseImgSrs})`,
            }}
          ></div>
        </Link>
        <div className={styles.CourseLinkTexts}>
          <div className={styles.CourseLinkTitle}>
            <Link key={data.idCourse} to={data.CourseLink}>
              <h3>{data.CourseTitle}</h3>
            </Link>
          </div>
          <div className={styles.CourseLinkDescription}>
            {data.CourseDescription}
          </div>
        </div>
      </div>
    </>
  )
}
export default CourseLink
