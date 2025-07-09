import { NavLink, useParams } from 'react-router-dom'
import LinkPath from '../../LinkPath/LinkPath.jsx'
import styles from './style.module.css'
import TasksBlock from '../../LessonComp/Tasks/TasksBlock.jsx'

import axios from 'axios'
import { useState } from 'react'
import React from 'react'
import { useEffect } from 'react'
const LessonPages = ({ lesson, tasks }) => {
  const [genaratedTasks, setGenaratedTasks] = useState({})
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
                  __html: lesson.lessondescription,
                }}
              ></div>
              <div
                className={styles.LessonPageFirstColumnDescription}
                dangerouslySetInnerHTML={{
                  __html: lesson.ruletext,
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
export default LessonPages
