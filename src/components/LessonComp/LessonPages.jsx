import { NavLink, useParams } from 'react-router-dom'
import LinkPath from '../LinkPath/LinkPath.jsx'
import styles from './style.module.css'
import TasksBlock from './Tasks/TasksBlock.jsx'
import tasksRows from '../../resoures/Data/TaskRows.js'
import axios from 'axios'
import { useState } from 'react'
import React from 'react'
import { useEffect } from 'react'
const LessonPages = ({ lesson, tasks }) => {
  const [genaratedTasks, setGenaratedTasks] = useState({})
  const [loading, setLoading] = useState(false)
  const path = useParams()
  //Запрос генерації
  const GenerateTasks = async () => {
    try {
      setLoading(true)
      const link = `${import.meta.env.VITE_API_URL}`
      const res = await axios.post(
        `${link}/api/apiEnglishTaskAI/${path.slug}/${path.slug2}/${path.slug3}`
      )

      setGenaratedTasks(res.data || {})
      console.log(res.data)
    } catch (err) {
      console.error('Ошибка:', err)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    console.log('🔄 Обновлено genaratedTasks:', genaratedTasks)
  }, [genaratedTasks])
  if (!lesson || !tasks) return <div>Завантаження...</div>
  return (
    <>
      <div className={styles.LessonPage}>
        <div className={styles.LessonPageContainer}>
          <div className={styles.LessonPageFirst}>
            <div className={styles.LessonPageFirstColumn}>
              <div className={styles.LessonPageFirstColumnTitle}>
                <LinkPath {...path} />
                <h1 className={styles.LessonPageTitle}>{lesson.lessontitle}</h1>
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

              <h3 style={{ color: '#00953F', marginTop: '25px' }}>
                6. Extra Tasks (AI-Generated)
              </h3>
              <p className={styles.LessonPageAiDescription}>
                If you need more exercises, we offer the option to automatically
                generate additional tasks using AI. Please note that we do not
                take responsibility for the accuracy of these AI-generated
                tasks. Use this feature only when absolutely necessary, as the
                number of requests is limited.
              </p>
              <button
                className={styles.LessonPageAiButton}
                onClick={GenerateTasks}
              >
                Generate More Tasks with AI
              </button>
              {loading && (
                <div className={styles.spinnerText}>
                  Генерація завдань<span className={styles.dots}></span>
                </div>
              )}
              {Object.values(genaratedTasks).some(
                (arr) => Array.isArray(arr) && arr.length > 0
              ) && <TasksBlock tasks={genaratedTasks}></TasksBlock>}
            </div>
            <div className={styles.LessonPageSecondColumn}></div>
          </div>
        </div>
      </div>
    </>
  )
}
export default LessonPages
