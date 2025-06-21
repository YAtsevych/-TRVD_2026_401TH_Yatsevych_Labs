import { useParams } from 'react-router-dom'
import styles from '../style.module.css'
import { useState } from 'react'
import React from 'react'
const ExerciseMultipleChoice = ({ task }) => {
  const path = useParams()
  const [selected, setSelected] = useState(null)
  const [active, setActive] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [remainder, setRemainder] = useState(task[1].length - 1)
  const [hint, setHint] = useState(false)

  const [clicked, setClicked] = useState(false)
  const [taskNumber, setTaskNumber] = useState(0)
  const [CorrectAnswersCount, setCorrectAnswersCount] = useState(0)

  const handSubmit = () => {
    setSubmitted(true)
    if (selected === task[1][taskNumber].CorrectAnswer) {
      setCorrectAnswersCount((prev) => prev + 1)
    }
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
        <span>{task[1][taskNumber].TaskDescription}</span>
        <span>{remainder} items remaining</span>
        <span style={{ marginLeft: '15px' }}>
          ✅ Correct answers: {CorrectAnswersCount}
        </span>
      </div>

      <div
        className={styles.TaskBlockCardQueshion}
        dangerouslySetInnerHTML={{ __html: task[1][taskNumber].TaskText }}
      ></div>

      <div className={styles.TaskBlockCardAnswers}>
        {task[1][taskNumber].Options.map((option, index) => (
          <button
            className={`${styles.TaskBlockOptionButton} ${
              active === index ? styles.TaskBlockOptionButtonActive : ''
            }`}
            key={index}
            onClick={() => {
              setActive(index)
              setSelected(option)
              setSubmitted(false)
            }}
          >
            {option}
          </button>
        ))}

        {/* Результат перевірки */}
        {submitted && (
          <div>
            {selected === task[1][taskNumber].CorrectAnswer ? (
              <span>Correct!</span>
            ) : (
              <span>
                Incorrect. Correct answer {'  "'}
                <span style={{ fontWeight: 'bold' }}>
                  {task[1][taskNumber].CorrectAnswer}
                </span>
                {'"'}
              </span>
            )}
          </div>
        )}

        {/* Фінальний результат */}
        {submitted && remainder === 0 && (
          <div>
            <span>
              {CorrectAnswersCount} out of {task[1].length} correct
            </span>
          </div>
        )}

        {/* Підказка */}
        {hint && (
          <div className={styles.TaskBlockExplanation}>
            <span
              dangerouslySetInnerHTML={{
                __html: task[1][taskNumber].Explanation,
              }}
            ></span>
          </div>
        )}
      </div>

      <div className={styles.TaskBlockNavButtonsBlock}>
        <button
          onClick={() => {
            if (clicked) {
              setActive(null)
              setTaskNumber((prev) =>
                prev === task[1].length - 1 ? prev : prev + 1
              )
              setRemainder((prev) => (prev === 0 ? prev : prev - 1))
              setSelected(null)
              setClicked(false)
              setSubmitted(false)
              setHint(false)
            } else {
              handSubmit()
              setClicked(true)
            }
          }}
          className={styles.TaskBlockNavButton}
          disabled={selected === null || (clicked && remainder === 0)}
        >
          {clicked ? (remainder === 0 ? 'Done' : 'Next') : 'Check'}
        </button>

        {task[1][taskNumber].Explanation !== '' && (
          <button
            className={styles.TaskBlockNavButton}
            onClick={() => setHint((prev) => !prev)}
          >
            Show hint
          </button>
        )}
      </div>
    </>
  )
}

export default ExerciseMultipleChoice
