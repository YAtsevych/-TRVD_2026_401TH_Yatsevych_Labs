import styles from './style.module.css'
import { Link } from 'react-router-dom'
import React from 'react'
const LessonLink = ({ data }) => {
  return (
    <>
      <div className={styles.LessonLink}>
        <Link to={data.lessonlink}>
          <div
            className={styles.LessonLinkImg}
            style={{
              backgroundImage: `url(${data.lessonimgsrs})`,
            }}
          ></div>
        </Link>
        <div className={styles.LessonLinkTexts}>
          <div className={styles.LessonLinkTitle}>
            <Link key={data.idlesson} to={data.lessonlink}>
              <h3>{data.lessontitle}</h3>
            </Link>
          </div>
          <div className={styles.LessonLinkDescription}>
            {data.lessondescription}
          </div>
        </div>
      </div>
    </>
  )
}
export default LessonLink
