import { useParams } from 'react-router-dom'
import styles from './style.module.css'
import { useState } from 'react'
import ExerciseMultipleChoice from './Exercises/ExerciseMultipleChoice'
import ExerciseWordMatching from './Exercises/ExerciseWordMatching'
import WordPuzzle from './Exercises/WordPuzzle'
import ShortInput from './Exercises/ShortInput'
import React from 'react'
const Task = ({ task }) => {
  const path = useParams()

  return (
    <div className={styles.TaskBlockFrameFirst}>
      <div style={{ minHeight: '400px' }} className={styles.TaskBlockCard}>
        {task[0] == 'MultipleChoice' ? (
          <ExerciseMultipleChoice task={task} />
        ) : task[0] == 'WordMatching' ? (
          <ExerciseWordMatching task={task} />
        ) : task[0] == 'WordPuzzle' ? (
          <WordPuzzle task={task} />
        ) : task[0] == 'ShortInput' ? (
          <ShortInput task={task} />
        ) : (
          'There are not exercises'
        )}
      </div>
    </div>
  )
}
export default Task
