import express from 'express'
import conn from '../DB/db.js'

const apiCourses = express.Router()
//ЗАпрос курсов
apiCourses.get('/:slug', async (req, res) => {
  try {
    const slug = req.params.slug

    const sql =
      'SELECT a.* From db_course_sql.pages m Join db_course_sql.courses a On m.idPages = a.CourseConection where m.slug = ?'

    const [rows] = await conn.query(sql, [slug])

    res.json(rows)
  } catch (err) {
    console.error('Error fetching pages:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})
export default apiCourses
