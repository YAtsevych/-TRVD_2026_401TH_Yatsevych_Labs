import { useParams } from 'react-router-dom'
// import styles from './StylesNew.module.css' // Возвращаем импорт CSS Modules

import styles from '../style.module.css'
import { useState } from 'react'
import React from 'react'
import { useDroppable, useDraggable } from '@dnd-kit/core' // Предполагается, что вы используете dnd-kit

// --- Компоненты для перетаскивания (предполагается, что они в отдельном файле) ---
// Вам нужно будет адаптировать их под вашу реализацию dnd-kit или другую библиотеку.

function DraggableItem({ id, children, onClick, isUsed }) {
  const { setNodeRef } = useDraggable({ id })
  // Динамически добавляем класс 'used'
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

// --- Основной компонент задания ---
const ExerciseWordMatching = ({ task }) => {
  const path = useParams()
  const [submitted, setSubmitted] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [taskNumber, setTaskNumber] = useState(0)
  const [remainder, setRemainder] = useState(task?.[1]?.length - 1 || 0)
  const [assigned, setAssigned] = useState({})
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [draggedId, setDraggedId] = useState(null)

  const currentTask = task?.[1]?.[taskNumber]
  if (!currentTask) return <div>Задача отсутствует</div>

  const correctAnswers = currentTask.correctanswer?.Answers || []
  const correctOptions = currentTask.correctanswer?.CorrectOption || []
  const options = currentTask.options || []

  const handleDropClick = (index) => {
    if (!submitted && draggedId) {
      setAssigned((prev) => ({ ...prev, [index]: draggedId }))
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

  // Вспомогательные функции для парсинга заголовка
  function splitByDigit(text) {
    const match = text?.match(/^([A-Z]\d)(.+)$/i)
    return match ? { level: match[1], type: match[2] } : null
  }

  function splitByUppercase(text) {
    return typeof text === 'string' ? text.split(/(?=[A-Z])/) : []
  }

  const slug2 = splitByDigit(path.slug2)
  const slug3 = splitByUppercase(path.slug3)
  const isOptionUsed = (option) => Object.values(assigned).includes(option)

  return (
    <div className={styles.TaskBlockContainer}>
      <div className={styles.TaskBlockCardTitle}>
        <span style={{ textTransform: 'capitalize' }}>{path.slug}</span>{' '}
        {slug2?.level}:{' '}
        {slug3.map((word, index) => (
          <span key={index} style={{ textTransform: 'capitalize' }}>
            {word + ' '}
          </span>
        ))}
      </div>

      {/* Счет правильных и оставшихся вопросов */}
      <div className={styles.TaskBlockCardDescription}>
        <span>{task[1][taskNumber].taskdescription}</span>
        <div>
          <span>{remainder} items remaining</span>
          <span style={{ marginLeft: '15px' }}>
            ✅ Correct answers: {correctAnswersCount}
          </span>
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

            // Формируем классы для drop-зоны
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
          {clicked ? (remainder === 0 ? 'Завершить' : 'Далее') : 'Проверить'}
        </button>
      </div>
    </div>
  )
}

export default ExerciseWordMatching
