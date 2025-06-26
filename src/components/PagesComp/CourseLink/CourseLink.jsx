import styles from './style.module.css'
import { Link } from 'react-router-dom'
import React from 'react'
const CourseLink = ({ data }) => {
  return (
    <>
      <div className={styles.CourseLink}>
        <Link to={data.courselink}>
          <div
            className={styles.CourseLinkImg}
            style={{
              backgroundImage: `url(${data.courseimgsrs})`,
            }}
          ></div>
        </Link>
        <div className={styles.CourseLinkTexts}>
          <div className={styles.CourseLinkTitle}>
            <Link key={data.idcourse} to={data.courselink}>
              <h3>{data.coursetitle}</h3>
            </Link>
          </div>
          <div className={styles.courselinkdescription}>
            {data.coursedescription}
          </div>
        </div>
      </div>
    </>
  )
}
export default CourseLink
