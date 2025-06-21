import { useParams } from 'react-router-dom'
import styles from '../style.module.css'
import { useState } from 'react'
import React from 'react'
const ExerciseWordMatching = ({ task }) => {
  const path = useParams()
  const [submitted, setSubmitted] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [taskNumber, setTaskNumber] = useState(0)
  const [remainder, setRemainder] = useState(task[1].length - 1)
  const [assigned, setAssigned] = useState({})
  const [selectedOption, setSelectedOption] = useState(null)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)

  const currentTask = task[1][taskNumber]
  const correctAnswers = currentTask.CorrectAnswer.Answers
  const correctOptions = currentTask.CorrectAnswer.CorrectOption
  const options = currentTask.Options

  const isOptionUsed = (option) => Object.values(assigned).includes(option)

  const handleOptionClick = (option) => {
    if (!submitted && !isOptionUsed(option)) {
      setSelectedOption(option)
    }
  }

  const handleDropClick = (index) => {
    if (!submitted && selectedOption) {
      setAssigned((prev) => ({
        ...prev,
        [index]: selectedOption,
      }))
      setSelectedOption(null)
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
    setSelectedOption(null)
  }
  function splitByDigit(text) {
    const match = text.match(/^([A-Z]\d)(.+)$/i)
    if (match) {
      return {
        level: match[1], // A1
        type: match[2], // vocabular
      }
    }
    return null
  }
  function splitByUppercase(text) {
    return text.split(/(?=[A-Z])/)
  }
  const slug2 = splitByDigit(path.slug2)
  const slug3 = splitByUppercase(path.slug3)
  return (
    <>
      <div className={styles.TaskBlockCardTitle}>
        <span style={{ textTransform: 'capitalize' }}>{path.slug}</span>{' '}
        {slug2.level}:{' '}
        {slug3.map((word, index) => (
          <span key={index} style={{ textTransform: 'capitalize' }}>
            {word + ' '}
          </span>
        ))}
      </div>

      <div className={styles.TaskBlockCardDescription}>
        <span>{currentTask.TaskDescription}</span>
        <span>{remainder} items remaining</span>
        <span style={{ marginLeft: '15px' }}>
          ✅ Correct answers: {correctAnswersCount}
        </span>
      </div>

      <div
        className={styles.TaskBlockCardQueshion}
        dangerouslySetInnerHTML={{ __html: currentTask.TaskText }}
      ></div>

      <div
        className={styles.TaskBlockCardAnswers}
        style={{ display: 'flex', gap: '30px' }}
      >
        {/* Ліва частина (вихідні слова) */}
        <div>
          {correctOptions.map((option, index) => (
            <div key={index} className={styles.TaskBlockOptionButton}>
              {option}
            </div>
          ))}
        </div>

        {/* Drop-зони */}
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
              <div
                key={index}
                onClick={() => handleDropClick(index)}
                className={`${styles.TaskBlockOptionButton} ${dropClass}`}
                style={{
                  border: '2px dashed gray',

                  textAlign: 'center',

                  cursor: 'pointer',
                }}
              >
                {assignedText || 'Click to drop'}
              </div>
            )
          })}
        </div>

        {/* Варіанти (для вибору) */}
        <div>
          {options.map((option, index) => {
            const isUsed = isOptionUsed(option)
            const isSelected = selectedOption === option

            return (
              <div
                className={styles.TaskBlockOptionButton}
                key={index}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
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
