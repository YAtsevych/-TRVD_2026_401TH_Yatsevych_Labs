import express from 'express'
import conn from '../DB/db.js'
import { MY_LANGUAGE_ROM } from '../config.js'
const apiLessonOne = express.Router()

apiLessonOne.get('/:slug/:slug2/:slug3', async (req, res) => {
  try {
    const slug3 = req.params.slug3

    //Получить урок
    let lessonQuery = `SELECT
    lesson.*, rule.ruletext FROM lessons lesson LEFT JOIN rules rule ON lesson.idlesson = rule.connectiontolesson WHERE slug3 = $1;`
    const [lessonRows] = await conn.query(lessonQuery, [slug3])
    if (lessonRows.length === 0) {
      return res.status(404).json({ error: 'Lesson not found' })
    }

    const lessonVocabularQuery = `SELECT  V.*, L.idlesson FROM lessons L JOIN lessonsvocabular LV ON L.idlesson = LV.idlesson JOIN dictionary V ON LV.idword = V.idword WHERE L.idlesson = $1;`
    const [lessonVocabular] = await conn.query(lessonVocabularQuery, [
      lessonRows[0].idlesson,
    ])

    const tasksQuery = `SELECT * FROM tasks where lessonid = $1`
    const [tasksRows] = await conn.query(tasksQuery, [lessonRows[0].idlesson])
    tasksRows.forEach((task) => {
      try {
        task.options = JSON.parse(task.options)
      } catch (err) {
        console.error(
          `Помилка парсингу Options для task ID ${task.idtask}:`,
          err
        )
        task.options = []
      }
    })
    const GroupdTask = tasksRows.reduce((acc, task) => {
      const key = task.tasktype
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(task)
      return acc
    }, {})

    res.json({
      lesson: lessonRows[0],
      tasks: GroupdTask,
      lessonVocabular: lessonVocabular,
    })
  } catch (err) {
    console.error('Error fetching page by slug:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})
export default apiLessonOne
