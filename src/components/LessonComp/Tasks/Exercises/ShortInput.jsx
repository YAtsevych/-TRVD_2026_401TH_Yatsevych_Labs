import { useParams } from 'react-router-dom'
import styles from '../style.module.css'
import { useState } from 'react'
import React from 'react'
const ShortInput = ({ task }) => {
  const path = useParams()
  const [selected, setSelected] = useState('')
  const [active, setActive] = useState(false)
  const [submitted, setSubmitted] = useState(false) //отправка на проверку
  const [remainder, setRemainder] = useState(task[1].length - 1) //счет оставшихся вопросов
  const [hint, setHint] = useState(false) //Показать ли подсказку
  const [clicked, setClicked] = useState(false) //Была ли нажата кнопка
  const [taskNumber, setTaskNumber] = useState(0) //Номер вопроса сейчас
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
  return (
    <>
      {/* Верхняя часть (ожидание: Vorcabular A1: topic) */}
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
      {/* Описание задания + счет ответов */}

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
      <div
        className={styles.TaskBlockCardQueshionBlock}
        style={{ flexDirection: 'column' }}
      >
        <div
          className={styles.TaskBlockCardQueshion}
          dangerouslySetInnerHTML={{ __html: task[1][taskNumber].tasktext }}
        ></div>
        {/* Слово к которому нужен перевод */}
        <div
          style={{
            textTransform: 'capitalize',
            margin: '3px 0px 5px',
            fontWeight: 'bold',
            fontSize: '20px',
          }}
        >
          {task[1][taskNumber].options}
        </div>
        <input
          type="text"
          className={styles.TaskBlockCardQueshionInput}
          onChange={(e) => {
            setSelected(e.target.value)
          }}
          value={selected}
        />
      </div>

      {/* Варианты ответа или поля ввода */}

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
              setSelected('')
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

export default ShortInput
