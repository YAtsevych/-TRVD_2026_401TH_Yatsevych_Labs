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
        LessonId: vocab.idLesson,
        TaskType: 'MultipleChoice',
        TaskText:
          lang === 'ru'
            ? 'Chose the correct translation: <strong><em>' +
              vocab.Word +
              '</em></strong> (' +
              vocab.Transcription +
              ')'
            : 'Chose the correct translation: ' + vocab.Translation,
        CorrectAnswer: vocab[direction],
        Options: createRandomOptionsMultipleChoice(i, lessonVocabular, lang),
        Explanation: '',
        TaskDescription: 'Choose only one correct answer.',
        TaskTitle: 'Odd one out',
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

    wpUsed.add(vocab.Word)
    const AnswerArray = vocab.Word.split('')
    tasks.WordPuzzle.push({
      LessonId: vocab.idLesson,
      TaskType: 'WordPuzzle',
      TaskText: vocab.Translation,
      CorrectAnswer: AnswerArray,
      Options: [...AnswerArray].sort(() => Math.random() - 0.5),
      Explanation: '',
      TaskDescription: 'Collect the correct word or sentence.',
      TaskTitle: 'Word Puzzle',
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
    if (!vocab.Word || siUsed.has(vocab.Word)) continue

    siUsed.add(vocab.Word)
    tasks.ShortInput.push({
      LessonId: vocab.idLesson,
      TaskType: 'ShortInput',
      TaskText: 'Write the translation of the word:',
      CorrectAnswer: vocab.Word,
      Options: vocab.Translation,
      Explanation: '',
      TaskDescription: 'Write it correctly.',
      TaskTitle: 'Short Input',
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
    LessonId: lessonVocabular[0].idLesson,
    TaskType: 'WordMatching',
    TaskText: 'Match the word and translation:',
    CorrectAnswer: { CorrectOption, Answers },
    Options: TaskOption,
    Explanation: '',
    TaskDescription: 'Match the pairs.',
    TaskTitle: 'Word Matching',
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
      ? lessonVocabular[CorrectAnswerNumber].Translation
      : lessonVocabular[CorrectAnswerNumber].Word

  options.add(correctAnswer)

  // 2. Додаємо унікальні випадкові варіанти до 5
  while (options.size < 5) {
    const rn = Math.floor(Math.random() * lessonVocabular.length)
    const candidate =
      language === 'ru'
        ? lessonVocabular[rn].Translation
        : lessonVocabular[rn].Word

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

    const word = language === 'ru' ? wordObj.Translation : wordObj.Word
    const answer = language === 'ru' ? wordObj.Word : wordObj.Translation

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
