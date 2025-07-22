import { useParams } from 'react-router-dom'
import styles from '../style.module.css'
import { useState } from 'react'
import React from 'react'
import { useDroppable, useDraggable } from '@dnd-kit/core'

function DraggableItem({ id, children, onClick, isUsed }) {
  const { setNodeRef } = useDraggable({ id })
  const finalClassName = `${styles.TaskBlockOptionButton} ${
    isUsed ? styles.used : ''
  }`

  return (
    <div
      ref={setNodeRef}
      onClick={() => onClick(id)}
      className={finalClassName}
    >
      {children}
    </div>
  )
}

function DropZone({ id, children, onClick }) {
  const { setNodeRef } = useDroppable({ id })
  return (
    <div onClick={() => onClick(id)} ref={setNodeRef}>
      {children}
    </div>
  )
}

const ExerciseWordMatching = ({ task }) => {
  const path = useParams()
  const [submitted, setSubmitted] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [taskNumber, setTaskNumber] = useState(0)
  const [assigned, setAssigned] = useState({})
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [draggedId, setDraggedId] = useState(null)

  // Текущая задача
  const currentTask = task?.[1]?.[taskNumber]
  if (!currentTask) return <div>Задача отсутствует</div>

  // Парсим correctanswer из текущей задачи
  let correctanswer
  if (typeof currentTask.correctanswer === 'string') {
    try {
      correctanswer = JSON.parse(currentTask.correctanswer)
    } catch {
      correctanswer = currentTask.correctanswer
    }
  } else {
    correctanswer = currentTask.correctanswer
  }

  const correctAnswers = correctanswer?.Answers || []
  const correctOptions = correctanswer?.CorrectOption || []
  const options = currentTask.options || []

  // Проверка, использован ли вариант
  const isOptionUsed = (option) => Object.values(assigned).includes(option)

  // Обработка клика на DropZone (зона сброса)
  const handleDropClick = (index) => {
    if (!submitted && draggedId) {
      setAssigned((prev) => ({ ...prev, [index]: draggedId }))
      setDraggedId(null)
    }
  }

  // Проверка ответов при отправке
  const handleSubmit = () => {
    setSubmitted(true)

    // Проверяем, что все правильно сопоставлено
    const isCorrect = correctAnswers.every(
      (answer, index) => assigned[index] === answer
    )

    if (isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1)
    }
  }

  // Переход к следующему заданию
  const goToNext = () => {
    setTaskNumber((prev) => (prev === task[1].length - 1 ? prev : prev + 1))
    setSubmitted(false)
    setClicked(false)
    setAssigned({})
    setDraggedId(null)
  }

  // Парсинг slug (можно подправить под свои нужды)
  function splitByDigit(text) {
    const match = text?.match(/^([A-Z]\d)(.+)$/i)
    return match ? { level: match[1], type: match[2] } : null
  }

  function splitByUppercase(text) {
    return typeof text === 'string' ? text.split(/(?=[A-Z])/) : []
  }

  const rawSlug2 = path.slug2
  const rawSlug3 = path.slug3

  let parsedSlug2 = null
  let parsedSlug3 = []

  if (rawSlug2 !== 'reading') {
    parsedSlug2 = splitByDigit(rawSlug2)
  }
  parsedSlug3 = splitByUppercase(rawSlug3)

  return (
    <div className={styles.TaskBlockContainer}>
      <div className={styles.TaskBlockCardTitle}>
        <span style={{ textTransform: 'capitalize' }}>
          {path.slug}{' '}
          <span style={{ textTransform: 'capitalize' }}>
            {parsedSlug2 ? parsedSlug2.level : path.slug2}
          </span>
        </span>
        :{' '}
        {parsedSlug3.map((word, index) => (
          <span key={index} style={{ textTransform: 'capitalize' }}>
            {word + ' '}
          </span>
        ))}
      </div>

      <div
        className={styles.TaskBlockCardDescription}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        <span style={{ maxWidth: '45%', marginRight: '10px' }}>
          {currentTask.taskdescription}
        </span>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            marginRight: '25px',
          }}
        >
          <span>{task[1].length - taskNumber} items remaining</span>
          <span>✅ Correct answers: {correctAnswersCount}</span>
        </div>
      </div>

      <div
        className={styles.TaskBlockCardQueshion}
        dangerouslySetInnerHTML={{ __html: currentTask.tasktext }}
      ></div>

      <div className={styles.ColumnsContainer}>
        {/* Левая колонка — слова для сопоставления */}
        <div className={styles.TaskColumn}>
          {correctOptions.map((option, index) => (
            <div key={index} className={styles.OptionItemStatic}>
              {option}
            </div>
          ))}
        </div>

        {/* Центр — Drop-зоны */}
        <div className={styles.TaskColumn}>
          {correctAnswers.map((_, index) => {
            const assignedText = assigned[index] || ''
            const isCorrect = assignedText === correctAnswers[index]

            let dropZoneClasses = styles.DropZone
            if (submitted) {
              dropZoneClasses += isCorrect
                ? ` ${styles.correct}`
                : ` ${styles.incorrect}`
            }

            return (
              <DropZone
                key={index}
                id={`drop-${index}`}
                onClick={() => handleDropClick(index)}
              >
                <div className={dropZoneClasses}>
                  {assignedText || (
                    <span className={styles.DropZonePlaceholder}>
                      Drop here
                    </span>
                  )}
                </div>
              </DropZone>
            )
          })}
        </div>

        {/* Правый столбец — перетаскиваемые опции */}
        <div className={styles.TaskColumn}>
          {options.map((option, index) => (
            <DraggableItem
              key={index}
              id={option}
              isUsed={isOptionUsed(option)}
              onClick={(id) => {
                if (!submitted && !isOptionUsed(id)) {
                  setDraggedId(id)
                }
              }}
            >
              {option}
            </DraggableItem>
          ))}
        </div>
      </div>

      {/* Навигационные кнопки */}
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
            ? task[1].length - taskNumber - 1 === 0
              ? 'Завершить'
              : 'Далее'
            : 'Проверить'}
        </button>
      </div>
    </div>
  )
}

export default ExerciseWordMatching
