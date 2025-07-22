import { useParams } from 'react-router-dom'
import TasksBlock from '../../LessonComp/Tasks/TasksBlock.jsx'
import LinkPath from '../../LinkPath/LinkPath.jsx'
import styles from './style.module.css'

import { useState } from 'react'
const LessonPageListening = ({ lesson, tasks }) => {
  const [loading, setLoading] = useState(false)
  const path = useParams()

  if (!lesson || !tasks) return <div>Завантаження...</div>
  return (
    <>
      <div className={styles.LessonPage}>
        <div className={styles.LessonPageContainer}>
          <div className={styles.LessonPageFirst}>
            <div className={styles.LessonPageFirstColumn}>
              <div className={styles.LessonPageFirstColumnTitle}>
                <LinkPath {...path} />
                <h1>{lesson.lessontitle}</h1>
              </div>
              <div
                className={styles.LessonPageFirstColumnDescription}
                dangerouslySetInnerHTML={{
                  __html: lesson.lessoncontent,
                }}
              ></div>

              <TasksBlock tasks={tasks}></TasksBlock>
            </div>
            <div className={styles.LessonPageSecondColumn}></div>
          </div>
        </div>
      </div>
    </>
  )
}
export default LessonPageListening
