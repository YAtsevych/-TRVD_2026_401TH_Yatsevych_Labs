import { useState } from 'react'
import styles from './style.module.css'
import { useParams } from 'react-router-dom'
import Task from './Task.jsx'
import React from 'react'
const TasksBlock = ({ tasks }) => {
  const [activeIndex, setActiveIndex] = useState(null)
  const path = useParams()

  const handleTaskClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }
  let TaskNumber = 0
  return (
    <div className={styles.TaskContainer}>
      {Object.entries(tasks).map((type, index) => {
        return (
          <div key={index} className={styles.TaskMainLine}>
            <div
              className={styles.TaskTitle}
              onClick={() => handleTaskClick(index)}
            >
              Task{(TaskNumber = TaskNumber + 1)}
            </div>
            <div
              style={{
                maxHeight: activeIndex === index ? '1000px' : '0px', // задаём достаточно большой maxHeight
                padding: activeIndex === index ? '16px' : '0px',
                transition: 'max-height 0.3s ease',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              className={styles.TaskBlock}
            >
              <Task task={type}></Task>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default TasksBlock
