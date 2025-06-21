import { useParams } from 'react-router-dom'
import styles from '../style.module.css'
import { useState } from 'react'

const WordPuzzle = ({ task }) => {
  const path = useParams()
  const [submitted, setSubmitted] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [taskNumber, setTaskNumber] = useState(0)
  const [assigned, setAssigned] = useState({})
  const [selectedText, setSelectedText] = useState(null)
  const [remainder, setRemainder] = useState(task[1].length - 1)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [correctAnswerShow, setCorrectAnswerShow] = useState(false)
  const currentTask = task[1][taskNumber]
  let correct
  if (typeof currentTask.CorrectAnswer == 'string') {
    correct = currentTask.CorrectAnswer.split(' ')
  } else {
    correct = currentTask.CorrectAnswer
  }

  const options = currentTask.Options

  const isAllCorrect = () =>
    correct.every((letter, index) => assigned[index] === letter)

  const handleSubmit = () => {
    setSubmitted(true)
    setClicked(true)

    if (isAllCorrect()) {
      setCorrectAnswersCount((prev) => prev + 1)
    } else {
      setCorrectAnswerShow(true)
    }
  }

  const goToNextTask = () => {
    setTaskNumber((prev) => (prev === task[1].length - 1 ? prev : prev + 1))
    setRemainder((prev) => (prev === 0 ? prev : prev - 1))
    setAssigned({})
    setSelectedText(null)
    setSubmitted(false)
    setClicked(false)
    setCorrectAnswerShow(false)
  }

  const handleDropClick = (index) => {
    if (submitted) return

    // Если ячейка уже занята — убрать букву (отмена)
    if (assigned[index]) {
      setAssigned((prev) => {
        const updated = { ...prev }
        delete updated[index]
        return updated
      })
      return
    }

    // Если есть выбранная буква — вставить её, если она ещё не исчерпана
    if (selectedText !== null && !isOptionUsedUp(selectedText)) {
      setAssigned((prev) => ({
        ...prev,
        [index]: selectedText,
      }))
      setSelectedText(null)
    }
  }

  const getOptionUsageCount = (option) =>
    Object.values(assigned).filter((val) => val === option).length

  const getOptionTotalCount = (option) =>
    options.filter((val) => val === option).length

  const isOptionUsedUp = (option) =>
    getOptionUsageCount(option) >= getOptionTotalCount(option)

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

      <div className={styles.TaskBlockCardQueshion}>
        Make the correct expression: <br></br>
        <strong>
          <em dangerouslySetInnerHTML={{ __html: currentTask.TaskText }}></em>
        </strong>
      </div>

      <div className={styles.TaskBlockCardAnswers}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Варіанти */}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {options.map((option, index) => {
              const isSelected = selectedText === option
              const isUsed = isOptionUsedUp(option)
              const isSingleChar = option.length === 1
              return (
                <div
                  key={index}
                  onClick={() =>
                    !submitted &&
                    !isOptionUsedUp(option) &&
                    setSelectedText(option)
                  }
                  style={{
                    backgroundColor: isSelected
                      ? '#cce5ff'
                      : isUsed
                      ? '#ddd'
                      : 'white',
                    border: '1px solid #ccc',
                    padding: '6px 12px',
                    margin: '4px',
                    borderRadius: '6px',
                    cursor: submitted || isUsed ? 'not-allowed' : 'pointer',
                    opacity: isUsed ? 0.5 : 1,
                    width: isSingleChar ? '40px' : 'auto',
                  }}
                  className={`${styles.WordPuzzleItem} ${
                    option.length === 1 ? styles.singleChar : ''
                  }`}
                >
                  {option}
                </div>
              )
            })}
          </div>

          {/* Drop-зони */}
          <div style={{ display: 'flex', marginTop: '10px' }}>
            {correct.map((_, index) => {
              const assignedText = assigned[index] || ''
              const isCorrect = assignedText === correct[index]
              const dropClass = submitted
                ? isCorrect
                  ? styles.DropZoneCorrect
                  : styles.DropZoneWrong
                : styles.DropZoneDefault

              return (
                <div
                  key={index}
                  onClick={() => handleDropClick(index)}
                  className={`${styles.WordPuzzleItemDrop} ${dropClass}`}
                  style={{
                    minWidth: '40px',
                    minHeight: '40px',
                    border: '2px dashed gray',
                    margin: '5px',
                    textAlign: 'center',
                    lineHeight: '36px',
                    fontWeight: 'bold',
                    backgroundColor: dropClass,
                    cursor: 'pointer',
                  }}
                >
                  {assignedText}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {correctAnswerShow && (
        <div>
          <span>
            Incorrect. Correct answer{'  "'}
            <span style={{ fontWeight: 'bold' }}>
              {task[1][taskNumber].CorrectAnswer}
            </span>
            {'"'}
          </span>
        </div>
      )}

      {/* Кнопка переходу */}
      <div className={styles.TaskBlockNavButtonsBlock}>
        <button
          onClick={() => {
            clicked ? goToNextTask() : handleSubmit()
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

export default WordPuzzle
