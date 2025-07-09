export default function CreateExerciseForVocabular(lessonVocabular, tasks) {
  if (!tasks.MultipleChoice) tasks.MultipleChoice = []
  if (!tasks.WordMatching) tasks.WordMatching = []
  if (!tasks.WordPuzzle) tasks.WordPuzzle = []
  if (!tasks.ShortInput) tasks.ShortInput = []

  // === MultipleChoice ===
  function addMultipleChoice(lang, count) {
    const direction = lang === 'ru' ? 'translation' : 'word'
    const reverse = lang === 'ru' ? 'word' : 'translation'

    const used = new Set()
    const candidates = []

    for (let i = 0; i < lessonVocabular.length; i++) {
      const vocab = lessonVocabular[i]
      const key = vocab[reverse]

      if (!vocab[direction] || !key || used.has(key)) continue

      used.add(key)

      const options = createRandomOptionsMultipleChoice(
        i,
        lessonVocabular,
        lang
      )

      candidates.push({
        idtask: `task-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 6)}`,
        lessonid: vocab.idlesson,
        tasktype: 'MultipleChoice',
        tasktext:
          lang === 'ru'
            ? `<strong><em>${vocab.word}</em></strong> (${
                vocab.transcription || ''
              })`
            : ` ${vocab.translation}`,
        taskObject: lang === 'ru' ? vocab.word : vocab.translation,
        correctanswer: vocab[direction],
        options,
        explanation:
          'Potato is a starchy plant tuber which is one of the most important food crops, cooked and eaten as a vegetable.',
        taskdescription: 'Choose the correct translation:',
        tasktitle: 'Odd one out',
      })
    }

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
    if (!vocab.word || wpUsed.has(vocab.word)) continue

    wpUsed.add(vocab.word)
    const AnswerArray = vocab.word.split('')
    tasks.WordPuzzle.push({
      idtask: `task-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 6)}`,
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
      idtask: `task-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 6)}`,
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

// === Вспомогательные функции ===

function createRandomOptionsMultipleChoice(index, lessonVocabular, language) {
  const options = new Set()
  const correctAnswer =
    language === 'ru'
      ? lessonVocabular[index].translation
      : lessonVocabular[index].word

  options.add(correctAnswer)

  let attempts = 0
  while (options.size < 4 && attempts < 50) {
    attempts++
    const rn = Math.floor(Math.random() * lessonVocabular.length)
    const candidate =
      language === 'ru'
        ? lessonVocabular[rn].translation
        : lessonVocabular[rn].word

    if (candidate && candidate !== correctAnswer) {
      options.add(candidate)
    }
  }

  return Array.from(options).sort(() => Math.random() - 0.5)
}

function generateWordMatchingTask(lessonVocabular, language, usedSet) {
  const [CorrectOption, TaskOption, Answers] = createRandomOptionsWordMatching(
    lessonVocabular,
    language,
    usedSet
  )
  if (CorrectOption.length === 0) return null

  return {
    idtask: `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    lessonid: lessonVocabular[0].idlesson,
    tasktype: 'WordMatching',
    tasktext:
      'Match the words with their translations by dragging options from the right side.',
    correctanswer: { CorrectOption, Answers },
    options: TaskOption,
    explanation: '',
    taskdescription: 'Match the pairs.',
    tasktitle: 'Word Matching',
  }
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
