import express from 'express'
import conn from '../DB/db.js'
import { MY_LANGUAGE_ROM } from '../config.js'
const apiLessonOne = express.Router()

apiLessonOne.get('/:slug/:slug2/:slug3', async (req, res) => {
  try {
    const slug3 = req.params.slug3

    //Получить урок
    let lessonQuery = `SELECT lesson.*, rule.RuleText FROM ${MY_LANGUAGE_ROM.dbName}.lessons lesson LEFT JOIN ${MY_LANGUAGE_ROM.dbName}.rules rule ON lesson.idLesson = rule.ConnectionToLesson WHERE slug3 = ?`
    const [lessonRows] = await conn.query(lessonQuery, [slug3])
    if (lessonRows.length === 0) {
      return res.status(404).json({ error: 'Lesson not found' })
    }

    const lessonVocabularQuery = `SELECT  V.*, L.idLesson FROM ${MY_LANGUAGE_ROM.dbName}.lessons L JOIN ${MY_LANGUAGE_ROM.dbName}.lessonsvocabular LV ON L.idLesson = LV.idLesson JOIN ${MY_LANGUAGE_ROM.dbName}.dictionary V ON LV.idWord = V.idWord WHERE L.idLesson = ?;`
    const [lessonVocabular] = await conn.query(lessonVocabularQuery, [
      lessonRows[0].idLesson,
    ])

    const tasksQuery = `SELECT * FROM ${MY_LANGUAGE_ROM.dbName}.tasks where LessonId = ?`
    const [tasksRows] = await conn.query(tasksQuery, [lessonRows[0].idLesson])
    tasksRows.forEach((task) => {
      try {
        task.Options = JSON.parse(task.Options)
      } catch (err) {
        console.error(
          `Помилка парсингу Options для task ID ${task.idTask}:`,
          err
        )
        task.Options = []
      }
    })
    const GroupdTask = tasksRows.reduce((acc, task) => {
      const key = task.TaskType
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
