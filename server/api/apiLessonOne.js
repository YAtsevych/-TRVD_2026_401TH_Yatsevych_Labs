import express from 'express'
import conn from '../DB/db.js'
import { MY_LANGUAGE_ROM } from '../config.js'
const apiLessonOne = express.Router()

apiLessonOne.get('/:slug/:slug2/:slug3', async (req, res) => {
  try {
    const slug3 = req.params.slug3

    // Получить урок
    const lessonQuery = `
      SELECT
    lesson.*, rule.ruletext FROM lessons lesson LEFT JOIN rules rule ON lesson.idlesson = rule.connectiontolesson WHERE slug3 = $1;
    `
    const { rows: lessonRows } = await conn.query(lessonQuery, [slug3])

    if (lessonRows.length === 0) {
      return res.status(404).json({ error: 'Lesson not found' })
    }

    // Получить словарь урока
    const lessonVocabularQuery = `
      SELECT V.*, L.idlesson
      FROM lessons L
      JOIN lessonsvocabular LV ON L.idlesson = LV.idlesson
      JOIN dictionary V ON LV.idword = V.idword
      WHERE L.idlesson = $1;
    `
    const { rows: lessonVocabular } = await conn.query(lessonVocabularQuery, [
      lessonRows[0].idlesson,
    ])

    // Получить задания
    const tasksQuery = `SELECT * FROM tasks WHERE lessonid = $1`
    const { rows: tasksRows } = await conn.query(tasksQuery, [
      lessonRows[0].idlesson,
    ])

    // Парсим options в каждом задании
    tasksRows.forEach((task) => {
      try {
        task.options = JSON.parse(task.options)
      } catch (err) {
        console.error(
          `Ошибка парсинга options для task ID ${task.idtask}:`,
          err
        )
        task.options = []
      }
    })

    // Группируем задания по типу
    const groupedTasks = tasksRows.reduce((acc, task) => {
      const key = task.tasktype
      if (!acc[key]) acc[key] = []
      acc[key].push(task)
      return acc
    }, {})

    // Отправляем ответ
    res.json({
      lesson: lessonRows[0],
      tasks: groupedTasks,
      lessonVocabular,
    })
  } catch (err) {
    console.error('Error fetching lesson by slug:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default apiLessonOne
