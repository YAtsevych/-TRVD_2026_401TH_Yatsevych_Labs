import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))
const apiTaskGeneration = express.Router()
apiTaskGeneration.post(`/:slug/:slug2/:slug3`, async (req, res) => {
  const { slug3 } = req.params
  const slug3Split = slug3.split(/(?=[A-Z])/)
  const topic = slug3Split.join(' ')
  const key = process.env.ENGLISHTASKS_API_KEY

  const prompt = `
Topic: ${topic}

You are an expert ESL task creator. Your job is to generate English grammar tasks for the topic: "${topic}"

STRICT RULES:
- All tasks must be 100% focused on the selected topic. Do NOT introduce unrelated grammar points.
- Sentences must be appropriate for A1–B1 level learners, unless topic requires otherwise.
- Each task must check the learner’s understanding of grammar — not just vocabulary.
- Each explanation must:
  - Be in English
  - Explain the rule clearly
  - Justify the correct answer
  - End the explanation by repeating the correct answer explicitly, e.g.:  
<br><br><span style='color:#00953B;'><strong>Correct answer: "goes"</strong></span>

Output format: Return ONLY a valid JSON object with this structure and DO NOT wrap it in markdown, comments, or any text:
{
  "MultipleChoice": [...],
  "ShortInput": [...],
  "WordPuzzle": [...]
}

Do not include any other text, markdown, code fences, or explanation before or after the JSON.
---

MultipleChoice (5 tasks)

Goal: Choose the correct grammar element based on context.

Each task must include:
- idTask: numeric ID (starting from 10)
- LessonId: 35
- TaskType: "MultipleChoice"
- TaskText: Sentence with a blank (e.g., "Tom ___ to school.")
- CorrectAnswer: One grammatically correct option
- Options: Array of 4 choices — one correct, three plausible but incorrect
- Explanation: Why this answer is correct (include rule + example)
- TaskDescription: short instruction in Russian (e.g., "Выберите правильный вариант.")
- TaskTitle: topic in Russian (translated topic name)

---
 ShortInput (8 tasks)

Goal: Type the correct word(s) based on the instruction and sentence.

Each task must include:
- idTask: continuing from above
- LessonId: 35
- TaskType: "ShortInput"
- TaskText: Instruction + sentence (e.g., "Insert the correct form: He ___ football.")
- CorrectAnswer: One correct answer
- Options: null
- Explanation: Explain the rule and provide one example
- TaskDescription: instruction in Russian (e.g., "Введите правильное слово.")
- TaskTitle: topic in Russian

---

WordPuzzle (8 задания)

Цель: Воссоздать предложение из перемешанных слов на основе заданной темы.

Каждое задание должно включать:
- idTask: продолжающаяся нумерация
- LessonId: 35
- TaskType: "WordPuzzle"
- TaskText: Соберите предложение: ... Далее идет превильный ответ, записаный на русском.
- CorrectAnswer: Полное предложение БЕЗ знаков препинания в конце (например: "They live in London")   
- Options: Все слова из CorrectAnswer, переделанные в массив и перемешанные. ВАЖНО: 
  - Включайте каждое слово — даже короткие, такие как "a", "the", "is", "to", "in", "on"
  - НЕ пропускайте ни одно слово
  - Только первое слово должно быть с заглавной буквы. Остальные — строчными
- Explanation: Объясните правило порядка слов, применимое к данному предложению
- TaskDescription: инструкция на русском языке (например: "Соберите предложение из слов.")
- TaskTitle: тема на русском языке

Пример:
- TaskText: "Соберите предложение: Собака во дворе"
  CorrectAnswer: "There is a dog in the garden"  
  Options: ["a", "in", "There", "the", "is", "garden", "dog"]
Notes:
- Do not reuse the same sentence patterns or words across tasks.
- All content must be freshly generated.
- Ensure all tasks are useful for a learner to understand the topic clearly.
Return ONLY the valid JSON. DO NOT write anything after it.
The output must end exactly with the closing curly brace "}" of the JSON.
`.trim()

  console.log('🔥 POST handler called')
  console.log(key)
  try {
    console.log('🚀 Sending request to Mistral...')
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral-medium',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    })

    const text = await response.text()

    // Пытаемся разобрать JSON
    const result = JSON.parse(text)
    if (result.choices && result.choices.length > 0) {
      const aiText = result.choices[0].message.content
      const cleaned = aiText
        .replace(/```json\s*/i, '')
        .replace(/```[\s]*$/, '')
        .trim()

      try {
        const parsed = JSON.parse(cleaned)
        res.status(200).json({
          MultipleChoice: parsed.MultipleChoice,
          ShortInput: parsed.ShortInput,
          WordPuzzle: parsed.WordPuzzle,
        })
      } catch (e) {
        console.error('❌ Failed to parse AI JSON:', cleaned)
        res
          .status(500)
          .json({ success: false, error: 'Invalid JSON structure from AI' })
      }
    } else {
      console.error('⚠️ Mistral gave empty response:', result)
      res.status(500).json({ success: false, error: 'No content from AI' })
    }
  } catch (error) {
    console.error('❌ FETCH FAILED:', error) // <--- обязательно
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})
export default apiTaskGeneration
