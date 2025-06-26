import styles from './style.module.css'
import CoursLink from '../CourseLink/CourseLink.jsx'
import NavCoursePage from '../NavCoursePage/NavCoursePage.jsx'
import React from 'react'
const CoursesBlock = ({ data, courses }) => {
  return (
    <>
      <div className={styles.CoursesBlock}>
        <div className={styles.CoursesBlockContainer}>
          <div className={styles.CoursesBlockFirst}>
            <div className={styles.CoursesBlockFirstColumn}>
              <div
                className={styles.CoursesBlockFirstColumnTitle}
                dangerouslySetInnerHTML={{ __html: data.descriptionpages }}
              ></div>
              <div className={styles.CoursesBlockFirstColumnLinks}>
                {courses.map((link) => {
                  if (link.idcourse !== 0)
                    return <CoursLink key={link.idcourse} data={link} />
                })}
              </div>
            </div>
            <div className={styles.CoursesBlockSecondColumn}>
              <NavCoursePage data={courses} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CoursesBlock
