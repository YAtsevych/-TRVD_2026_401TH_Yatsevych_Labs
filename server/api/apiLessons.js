import express from 'express'
import conn from '../DB/db.js'

const apiLessons = express.Router()
//Запрос всех уроков в курсе
apiLessons.get('/:slug/:slug2', async (req, res) => {
  try {
    const { slug2 } = req.params
    const sql =
      'SELECT c.* From db_course_sql.courses m Join db_course_sql.lessons c On m.idCourse = c.LessonConection where m.slug2  = ?'
    const [rows] = await conn.query(sql, [slug2])
    res.json(rows)
  } catch (err) {
    console.error('Error fetching pages:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})
export default apiLessons
