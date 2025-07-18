import { useParams } from 'react-router-dom'
import LinkPath from '../../LinkPath/LinkPath'
import NavCoursePage from '../../PagesComp/NavCoursePage/NavCoursePage.jsx'
import LessonLink from '../LessonLink/LessonLink.jsx'
import styles from './style.module.css'

const LessonsBlock = ({
  course,
  lessons,
  NavParts,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const path = useParams()

  return (
    <div className={styles.LessonBlock}>
      <div className={styles.LessonBlockContainer}>
        <div className={styles.LessonBlockFirst}>
          <div className={styles.LessonBlockFirstColumn}>
            <div className={styles.LessonBlockFirstColumnTitle}>
              <LinkPath {...path} />
              <h1>{course.coursetitle}</h1>
            </div>
            <div className={styles.LessonBlockFirstColumnPreviewImage}>
              <img src={course.courseimgsrs} alt={course.coursetitle} />
            </div>
            <div
              className={styles.LessonBlockFirstColumnDescription}
              dangerouslySetInnerHTML={{ __html: course.coursedescription }}
            ></div>
            <div className={styles.LessonBlockFirstColumnTitle}>
              <h1>Choose a lesson</h1>
            </div>
            <div className={styles.LessonBlockFirstColumnLinks}>
              {lessons &&
                lessons.map((link) => (
                  <LessonLink key={link.idlesson} data={link} />
                ))}
            </div>
            <div>
              {lessons &&
                Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    disabled={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
            </div>
          </div>
          <div className={styles.LessonBlockSecondColumn}>
            <NavCoursePage data={NavParts} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonsBlock
