import { useParams } from 'react-router-dom'
import styles from '../style.module.css'
// import styles from './StylesNew.module.css'
import { useState } from 'react'
import React from 'react'
const ExerciseMultipleChoice = ({ task }) => {
  console.log(task)
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
    if (selected === task[1][taskNumber].correctanswer) {
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

  const rawSlug2 = path.slug2
  const rawSlug3 = path.slug3

  let parsedSlug2 = null
  let parsedSlug3 = []

  if (rawSlug2 !== 'reading') {
    parsedSlug2 = splitByDigit(rawSlug2)
  }
  parsedSlug3 = splitByUppercase(rawSlug3)
  const speak = (text, lang = 'en-US') => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    speechSynthesis.speak(utterance)
  }
  return (
    <>
      {/* Заглавие раздела "Vocabular A1: Food And Drinks" */}
      <div className={styles.TaskBlockCardTitle}>
        <span style={{ textTransform: 'capitalize' }}>
          {path.slug}{' '}
          <span style={{ textTransform: 'capitalize' }}>
            {parsedSlug2 ? parsedSlug2.level : path.slug2}
            {''}
          </span>
        </span>
        {''}:{' '}
        {parsedSlug3.map((word, index) => (
          <span key={index} style={{ textTransform: 'capitalize' }}>
            {word + ' '}
          </span>
        ))}
      </div>
      {/* Счет правильных и оставшихся вопросов */}
      <div
        className={styles.TaskBlockCardDescription}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start', // ключевой момент — выравнивание по ВЕРХУ
          flexWrap: 'wrap',
        }}
      >
        <span style={{ maxWidth: '45%', marginRight: '10px' }}>
          {task[1][taskNumber].taskdescription}
        </span>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column', // счетчики в столбик
            gap: '5px',
            marginRight: '25px',
          }}
        >
          <span>{task[1].length - taskNumber} items remaining</span>
          <span>✅ Correct answers: {CorrectAnswersCount}</span>
        </div>
      </div>

      {/* Блок с вопросом(слово + транскрипция + аудио) */}
      <div className={styles.TaskBlockCardQueshionBlock}>
        <div
          className={styles.TaskBlockCardQueshion}
          dangerouslySetInnerHTML={{ __html: task[1][taskNumber].tasktext }}
        ></div>
        <button onClick={() => speak(task[1][taskNumber].tasktext)}>
          <img
            className={styles.TaskBlockCardAudioBtn}
            src="/resoures/img/icons/audio_icon1.png"
          ></img>
        </button>
      </div>

      {/* Ответы */}
      <div className={styles.TaskBlockCardAnswers}>
        {task[1][taskNumber].options.map((option, index) => {
          // --- НАЧАЛО ИЗМЕНЕНИЙ ---
          const getButtonClasses = () => {
            const classes = [styles.TaskBlockOptionButton]
            if (submitted) {
              if (option === task[1][taskNumber].correctanswer) {
                classes.push(styles.correct)
              } else if (option === selected) {
                classes.push(styles.incorrect)
              }
            } else {
              if (active === index) {
                classes.push(styles.TaskBlockOptionButtonActive)
              }
            }
            return classes.join(' ')
          }
          // --- КОНЕЦ ИЗМЕНЕНИЙ ---

          return (
            <button
              key={index}
              disabled={submitted} // --- ДОБАВЛЕНО ---
              className={getButtonClasses()} // --- ИЗМЕНЕНО ---
              onClick={() => {
                setActive(index)
                setSelected(option)
                setSubmitted(false)
              }}
            >
              {option}
            </button>
          )
        })}

        {/* Фінальний результат */}
        {submitted && remainder === 0 && (
          <div>
            <span>
              {CorrectAnswersCount} out of {task[1].length} correct
            </span>
          </div>
        )}
      </div>
      {/* Результат перевірки */}
      {submitted && (
        <>
          {selected === task[1][taskNumber].correctanswer ? (
            <div className={styles.TaskBlockResultBlockCorrect}>
              <span>Correct!</span>
            </div>
          ) : (
            <div className={styles.TaskBlockResultBlockIncorrect}>
              <span>
                Incorrect. Correct answer {'  "'}
                <span>{task[1][taskNumber].correctanswer}</span>
                {'"'}
              </span>
            </div>
          )}
        </>
      )}
      {/* Підказка */}
      {hint && (
        <div className={styles.TaskBlockExplanationBlock}>
          <span>{task[1][taskNumber].explanation}</span>
        </div>
      )}

      {/* Блок с кнопками Подскаска и Проверить */}
      <div className={styles.TaskBlockNavButtonsBlock}>
        <button
          className={styles.TaskBlockHintButton}
          onClick={() => setHint((prev) => !prev)}
        >
          ? Show hint
        </button>

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
      </div>
    </>
  )
}

export default ExerciseMultipleChoice
