import { useParams, Link } from 'react-router-dom'
import styles from '../style.module.css' // Подключаем новый файл стилей
import React, { useState, useMemo, useEffect } from 'react'

const WordPuzzle = ({ task }) => {
  const path = useParams()
  const [taskNumber, setTaskNumber] = useState(0)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [hint, setHint] = useState(false)

  // --- Новая логика состояния для слов ---
  const [availableWords, setAvailableWords] = useState([])
  const [placedWords, setPlacedWords] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const currentTask = task[1][taskNumber]
  const correctAnswerArray = Array.isArray(currentTask.correctanswer)
    ? currentTask.correctanswer
    : currentTask.correctanswer.split(' ')

  // Инициализация и сброс состояния при смене задания
  useEffect(() => {
    const initialOptions = currentTask.options.map((word, index) => ({
      id: `${taskNumber}-${index}`, // Уникальный ID для каждого слова
      text: word,
    }))
    setAvailableWords(initialOptions)
    setPlacedWords([])
    setIsSubmitted(false)
  }, [taskNumber, currentTask])

  const isCorrect = useMemo(() => {
    if (!isSubmitted) return false
    const userAnswer = placedWords.map((w) => w.text)
    return JSON.stringify(userAnswer) === JSON.stringify(correctAnswerArray)
  }, [isSubmitted, placedWords, correctAnswerArray])

  // --- Обработчики действий ---
  const handleSelectWord = (wordObject) => {
    if (isSubmitted) return
    setPlacedWords([...placedWords, wordObject])
    setAvailableWords(availableWords.filter((w) => w.id !== wordObject.id))
  }

  const handleRemoveWord = (wordObject) => {
    if (isSubmitted) return
    setPlacedWords(placedWords.filter((w) => w.id !== wordObject.id))
    setAvailableWords([...availableWords, wordObject])
  }

  const handleSubmit = () => {
    const userAnswer = placedWords.map((w) => w.text)
    const isAnswerCorrect =
      JSON.stringify(userAnswer) === JSON.stringify(correctAnswerArray)
    setIsSubmitted(true)
    if (isAnswerCorrect) {
      setCorrectAnswersCount((prev) => prev + 1)
    }
  }

  const goToNextTask = () => {
    if (taskNumber < task[1].length - 1) {
      setTaskNumber((prev) => prev + 1)
    } else {
      // Логика завершения всех заданий
      alert('All tasks completed!')
    }
  }

  // Вспомогательные функции для заголовка (оставлены без изменений)
  function splitByDigit(text) {
    const match = text.match(/^([A-Z]\d)(.+)$/i)
    return match ? { level: match[1], type: match[2] } : null
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
    <div className={styles.taskContainer}>
      {/* Заголовок и счетчики */}
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
          <span>✅ Correct answers: {correctAnswersCount}</span>
        </div>
      </div>
      {/*Предложение на английском */}
      <div
        className={styles.englishSentence}
        dangerouslySetInnerHTML={{ __html: currentTask.tasktext }}
      ></div>

      {/* Зона для ответа пользователя */}
      <div className="mb-6">
        <p className={styles.zoneTitle}>Your sentence:</p>
        <div
          className={`${styles.answerContainer} ${
            isSubmitted ? (isCorrect ? styles.correct : styles.incorrect) : ''
          }`}
        >
          {placedWords.map((word) => (
            <button
              key={word.id}
              onClick={() => handleRemoveWord(word)}
              className={styles.wordButton}
            >
              {word.text}
            </button>
          ))}
        </div>
      </div>

      {/* Доступные слова */}
      <div className="mb-8">
        <p className={styles.zoneTitle}>Available words:</p>
        <div className={styles.availableWordsContainer}>
          {availableWords.map((word) => (
            <button
              key={word.id}
              onClick={() => handleSelectWord(word)}
              className={styles.wordButton}
            >
              {word.text}
            </button>
          ))}
        </div>
      </div>

      {/* Сообщение о результате */}
      {isSubmitted && !isCorrect && (
        <div className={styles.resultBannerIncorrect}>
          Correct answer: "{correctAnswerArray.join(' ')}"
        </div>
      )}
      {hint && (
        <div className={styles.TaskBlockExplanationBlock}>
          <span>{task[1][taskNumber].explanation}</span>
        </div>
      )}
      {/* Кнопки действий */}
      <div className={styles.actions}>
        <button
          className={styles.hintButton}
          onClick={() => setHint((prev) => !prev)}
        >
          ? Show hint
        </button>
        {isSubmitted ? (
          <button onClick={goToNextTask} className={styles.checkButton}>
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={placedWords.length !== currentTask.options.length}
            className={styles.checkButton}
          >
            Check
          </button>
        )}
      </div>
    </div>
  )
}

export default WordPuzzle
