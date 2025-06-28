export default function CreateExerciseForVocabular(lessonVocabular, tasks) {
  if (!tasks.MultipleChoice) tasks.MultipleChoice = []
  if (!tasks.WordMatching) tasks.WordMatching = []
  if (!tasks.WordPuzzle) tasks.WordPuzzle = []
  if (!tasks.ShortInput) tasks.ShortInput = []

  // === lessonVocabular ===

  // === MultipleChoice ===

  function addMultipleChoice(lang, count) {
    const direction = lang === 'ru' ? 'Translation' : 'Word'
    const reverse = lang === 'ru' ? 'Word' : 'Translation'

    const used = new Set()
    const candidates = []

    // Собираем все подходящие слова
    for (let i = 0; i < lessonVocabular.length; i++) {
      const vocab = lessonVocabular[i]
      const key = vocab[reverse]

      if (!key || used.has(key)) continue

      used.add(key)
      candidates.push({
        lessonid: vocab.idlesson,
        tasktype: 'MultipleChoice',
        tasktext:
          lang === 'ru'
            ? 'Chose the correct translation: <strong><em>' +
              vocab.Word +
              '</em></strong> (' +
              vocab.Transcription +
              ')'
            : 'Chose the correct translation: ' + vocab.translation,
        torrectanswer: vocab[direction],
        options: createRandomOptionsMultipleChoice(i, lessonvocabular, lang),
        explanation: '',
        taskdescription: 'Choose only one correct answer.',
        tasktitle: 'Odd one out',
      })
    }

    // Перемешиваем и выбираем max `count`
    const shuffled = candidates.sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, count)

    tasks.MultipleChoice.push(...selected)
  }

  addMultipleChoice('ru', 8)
  addMultipleChoice('en', 8)

  // === WordMatching ===
  const wmUsed = new Set()
  const wmCount = Math.floor(lessonVocabular.length / 5)
  for (let i = 0; i < wmCount; i++) {
    const taskEn = generateWordMatchingTask(lessonVocabular, 'en', wmUsed)
    const taskRu = generateWordMatchingTask(lessonVocabular, 'ru', wmUsed)
    if (taskEn) tasks.WordMatching.push(taskEn)
    if (taskRu) tasks.WordMatching.push(taskRu)
  }

  // === WordPuzzle ===
  const wpUsed = new Set()
  const wpCount = Math.floor(lessonVocabular.length / 3)
  let tries = 0
  while (wpUsed.size < wpCount && tries < 100) {
    tries++
    const i = Math.floor(Math.random() * lessonVocabular.length)
    const vocab = lessonVocabular[i]
    if (!vocab.Word || wpUsed.has(vocab.Word)) continue

    wpUsed.add(vocab.word)
    const AnswerArray = vocab.word.split('')
    tasks.WordPuzzle.push({
      lessonid: vocab.idlesson,
      tasktype: 'WordPuzzle',
      tasktext: vocab.translation,
      correctanswer: AnswerArray,
      options: [...AnswerArray].sort(() => Math.random() - 0.5),
      explanation: '',
      taskdescription: 'Collect the correct word or sentence.',
      tasktitle: 'Word Puzzle',
    })
  }

  // === ShortInput ===
  const siUsed = new Set()
  const siCount = Math.floor(lessonVocabular.length / 3)
  tries = 0
  while (siUsed.size < siCount && tries < 100) {
    tries++
    const i = Math.floor(Math.random() * lessonVocabular.length)
    const vocab = lessonVocabular[i]
    if (!vocab.word || siUsed.has(vocab.word)) continue

    siUsed.add(vocab.word)
    tasks.ShortInput.push({
      lessonid: vocab.idlesson,
      tasktype: 'ShortInput',
      tasktext: 'Write the translation of the word:',
      correctanswer: vocab.word,
      options: vocab.translation,
      explanation: '',
      taskdescription: 'Write it correctly.',
      tasktitle: 'Short Input',
    })
  }

  return tasks
}

function generateWordMatchingTask(lessonVocabular, language, usedSet) {
  const [CorrectOption, TaskOption, Answers] = createRandomOptionsWordMatching(
    lessonVocabular,
    language,
    usedSet
  )
  if (CorrectOption.length === 0) return null

  return {
    lessonid: lessonVocabular[0].idlesson,
    tasktype: 'WordMatching',
    tasktext: 'Match the word and translation:',
    correctanswer: { CorrectOption, Answers },
    options: TaskOption,
    explanation: '',
    taskdescription: 'Match the pairs.',
    tasktitle: 'Word Matching',
  }
}

function createRandomOptionsMultipleChoice(
  CorrectAnswerNumber,
  lessonVocabular,
  language
) {
  const options = new Set()

  // 1. Додаємо правильну відповідь
  const correctAnswer =
    language === 'ru'
      ? lessonVocabular[CorrectAnswerNumber].translation
      : lessonVocabular[CorrectAnswerNumber].word

  options.add(correctAnswer)

  // 2. Додаємо унікальні випадкові варіанти до 5
  while (options.size < 5) {
    const rn = Math.floor(Math.random() * lessonVocabular.length)
    const candidate =
      language === 'ru'
        ? lessonVocabular[rn].translation
        : lessonVocabular[rn].word

    options.add(candidate)
  }

  // 3. Перетворення в масив та перемішування
  const array = Array.from(options).sort(() => Math.random() - 0.5)

  return array
}
function createRandomOptionsWordMatching(lessonVocabular, language, usedSet) {
  let CorrectOptions = new Set()
  let TaskOptions = new Set()
  let Answer = new Set()

  const limit = 5
  let tries = 0

  while (CorrectOptions.size < limit && tries < 200) {
    tries++
    const i = Math.floor(Math.random() * lessonVocabular.length)
    const wordObj = lessonVocabular[i]

    const word = language === 'ru' ? wordObj.translation : wordObj.word
    const answer = language === 'ru' ? wordObj.word : wordObj.translation

    if (!word || !answer || usedSet.has(word)) continue

    CorrectOptions.add(word)
    TaskOptions.add(answer)
    Answer.add(answer)
    usedSet.add(word)
  }

  return [
    Array.from(CorrectOptions),
    Array.from(TaskOptions).sort(() => Math.random() - 0.5),
    Array.from(Answer),
  ]
}
