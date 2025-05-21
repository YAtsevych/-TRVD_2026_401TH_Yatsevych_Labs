import express from 'express'
import conn from '../DB/db.js'

const apiLessonOne = express.Router()

apiLessonOne.get('/:slug/:slug2/:slug3', async (req, res) => {
  try {
    const slug3 = req.params.slug3
    const sql = 'SELECT * FROM db_course_sql.lessons Where slug3 = ?'
    const [rows] = await conn.query(sql, [slug3])
    res.json(rows)
  } catch (err) {
    console.error('Error fetching page by slug:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})
export default apiLessonOne
