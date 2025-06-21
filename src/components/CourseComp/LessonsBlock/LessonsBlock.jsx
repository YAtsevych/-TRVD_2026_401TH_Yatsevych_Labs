import styles from './style.module.css'
import LessonLink from '../LessonLink/LessonLink.jsx'
import NavCoursePage from '../../PagesComp/NavCoursePage/NavCoursePage.jsx'
import LinkPath from '../../LinkPath/LinkPath'
import { useParams } from 'react-router-dom'
import React from 'react'
const LessonsBlock = ({ course, lessons, NavParts }) => {
  const path = useParams()
  return (
    <>
      <div className={styles.LessonBlock}>
        <div className={styles.LessonBlockContainer}>
          <div className={styles.LessonBlockFirst}>
            <div className={styles.LessonBlockFirstColumn}>
              <div className={styles.LessonBlockFirstColumnTitle}>
                <LinkPath {...path} />
                <h1>{course.CourseTitle}</h1>
              </div>
              <div className={styles.LessonBlockFirstColumnPreviewImage}>
                <img src={course.CourseImgSrs} />
              </div>
              <div
                className={styles.LessonBlockFirstColumnDescription}
                dangerouslySetInnerHTML={{ __html: course.CourseDescription }}
              ></div>
              <div className={styles.LessonBlockFirstColumnTitle}>
                <h1>Choose a lesson</h1>
              </div>
              <div className={styles.LessonBlockFirstColumnLinks}>
                {lessons &&
                  lessons.map((link) => (
                    <LessonLink key={link.idLesson} data={link} />
                  ))}
              </div>
            </div>
            <div className={styles.LessonBlockSecondColumn}>
              <NavCoursePage data={NavParts} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default LessonsBlock
