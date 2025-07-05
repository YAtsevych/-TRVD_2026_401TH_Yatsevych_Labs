import { useParams } from 'react-router-dom'
import styles from '../style.module.css'
import { useState } from 'react'
import React from 'react'
import { DraggableItem, DropZone } from '../Drop/DraggableItem' // путь скорректируй под свой

const ExerciseWordMatching = ({ task }) => {
  const path = useParams()
  const [submitted, setSubmitted] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [taskNumber, setTaskNumber] = useState(0)
  const [remainder, setRemainder] = useState(task?.[1]?.length - 1 || 0)
  const [assigned, setAssigned] = useState({})
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)

  const currentTask = task?.[1]?.[taskNumber]
  if (!currentTask) return <div>Задача отсутствует</div>

  const correctAnswers = currentTask.correctanswer?.Answers || []
  const correctOptions = currentTask.correctanswer?.CorrectOption || []
  const options = currentTask.options || []

  // === drag-state ===
  const [draggedId, setDraggedId] = useState(null)

  const handleDropClick = (index) => {
    if (!submitted && draggedId) {
      setAssigned((prev) => ({
        ...prev,
        [index]: draggedId,
      }))
      setDraggedId(null)
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
    const isCorrect = correctAnswers.every(
      (answer, index) => assigned[index] === answer
    )
    if (isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1)
    }
  }

  const goToNext = () => {
    setTaskNumber((prev) => (prev === task[1].length - 1 ? prev : prev + 1))
    setRemainder((prev) => (prev === 0 ? prev : prev - 1))
    setSubmitted(false)
    setClicked(false)
    setAssigned({})
    setDraggedId(null)
  }

  function splitByDigit(text) {
    const match = text?.match(/^([A-Z]\d)(.+)$/i)
    if (match) {
      return {
        level: match[1],
        type: match[2],
      }
    }
    return null
  }

  function splitByUppercase(text) {
    if (typeof text !== 'string') return []
    return text.split(/(?=[A-Z])/)
  }

  const slug2 = splitByDigit(path.slug2)
  const slug3 = splitByUppercase(path.slug3)

  const isOptionUsed = (option) => Object.values(assigned).includes(option)

  return (
    <>
      <div className={styles.TaskBlockCardTitle}>
        <span style={{ textTransform: 'capitalize' }}>{path.slug}</span>{' '}
        {slug2?.level}:{' '}
        {slug3.map((word, index) => (
          <span
            key={index}
            style={{ textTransform: 'capitalize', cursor: 'default' }}
          >
            {word + ' '}
          </span>
        ))}
      </div>

      <div className={styles.TaskBlockCardDescription}>
        <span>{currentTask.taskdescription}</span>
        <span>{remainder} items remaining</span>
        <span style={{ marginLeft: '15px' }}>
          ✅ Correct answers: {correctAnswersCount}
        </span>
      </div>

      <div
        className={styles.TaskBlockCardQueshion}
        dangerouslySetInnerHTML={{ __html: currentTask.tasktext }}
      ></div>

      <div
        className={styles.TaskBlockCardAnswers}
        style={{ display: 'flex', gap: '30px' }}
      >
        {/* Левый столбец — правильные слова */}
        <div>
          {correctOptions.map((option, index) => (
            <div
              key={index}
              className={styles.TaskBlockOptionButton}
              style={{ cursor: 'default' }}
            >
              {option}
            </div>
          ))}
        </div>

        {/* Центр — Drop-зоны */}
        <div>
          {correctAnswers.map((_, index) => {
            const assignedText = assigned[index] || ''
            const isCorrect = assignedText === correctAnswers[index]

            let dropClass = styles.DropZoneDefault
            if (submitted) {
              dropClass = isCorrect
                ? styles.DropZoneCorrect
                : styles.DropZoneWrong
            }

            return (
              <DropZone
                key={index}
                id={`drop-${index}`}
                onClick={() => handleDropClick(index)}
              >
                <div
                  className={`${styles.TaskBlockOptionButton} ${dropClass}`}
                  style={{
                    border: '2px dashed gray',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {assignedText || 'Drop here'}
                </div>
              </DropZone>
            )
          })}
        </div>

        {/* Правый столбец — draggable опции */}
        <div>
          {options.map((option, index) => {
            const isUsed = isOptionUsed(option)
            return (
              <DraggableItem
                key={index}
                id={option}
                onClick={(id) => {
                  if (!submitted && !isUsed) {
                    setDraggedId(id)
                  }
                }}
              >
                <div
                  className={styles.TaskBlockOptionButton}
                  style={{
                    opacity: isUsed ? 0.5 : 1,
                    userSelect: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {option}
                </div>
              </DraggableItem>
            )
          })}
        </div>
      </div>

      <div className={styles.TaskBlockNavButtonsBlock}>
        <button
          onClick={() => {
            if (clicked) {
              goToNext()
            } else {
              handleSubmit()
              setClicked(true)
            }
          }}
          className={styles.TaskBlockNavButton}
        >
          {clicked
            ? remainder === 0
              ? 'Everything is done'
              : 'Next'
            : 'Check'}
        </button>
      </div>
    </>
  )
}

export default ExerciseWordMatching
