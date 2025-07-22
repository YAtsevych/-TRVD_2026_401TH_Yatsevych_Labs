import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './style.module.css'
import Task from './Task.jsx'
const TasksBlock = ({ tasks }) => {
  const [activeIndex, setActiveIndex] = useState(null)
  console.log(tasks)
  const path = useParams()

  const handleTaskClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const taskOrder = [
    'MultipleChoice',
    'WordMatching',
    'WordPuzzle',
    'ShortInput',
  ]
  let visibleTaskIndex = 1
  return (
    <div className={styles.TaskContainer}>
      {taskOrder.map((typeName, index) => {
        const taskGroup = tasks[typeName]
        if (!taskGroup || taskGroup.length == 0) return null // если типа нет, пропускаем
        const currentIndex = visibleTaskIndex++
        return (
          <div key={typeName} className={styles.TaskMainLine}>
            <div
              className={styles.TaskTitle}
              onClick={() => handleTaskClick(index)}
            >
              <span className={styles.TaskMainLineNumber}>{currentIndex}</span>
              <span className={styles.TaskMainLine}>{typeName}</span>
            </div>
            <div
              style={{
                maxHeight: activeIndex === index ? '1000px' : '0px',
                padding: activeIndex === index ? '16px' : '0px',
                transition: 'max-height 0.3s ease',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              className={styles.TaskBlock}
            >
              <Task task={[typeName, taskGroup]} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default TasksBlock
