import express from 'express'
import conn from '../DB/db.js'
const apiLessons = express.Router()

// Запрос уроков с пагинацией
apiLessons.get('/:slug/:slug2', async (req, res) => {
  try {
    const { slug2 } = req.params
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit

    const sql = `
      SELECT c.* 
      FROM courses m 
      JOIN lessons c ON m.idCourse = c.LessonConection 
      WHERE m.slug2 = $1
      ORDER BY c.idlesson
      LIMIT $2 OFFSET $3
    `
    const { rows } = await conn.query(sql, [slug2, limit, offset])

    const countSql = `
      SELECT COUNT(*) 
      FROM courses m 
      JOIN lessons c ON m.idCourse = c.LessonConection 
      WHERE m.slug2 = $1
    `
    const countResult = await conn.query(countSql, [slug2])
    const total = parseInt(countResult.rows[0].count)

    res.json({
      lessons: rows,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (err) {
    console.error('Error fetching lessons with pagination:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

export default apiLessons
