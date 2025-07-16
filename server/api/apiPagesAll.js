import express from 'express'
import conn from '../DB/db.js'
import { MY_LANGUAGE_ROM } from '../config.js'

const apiPagesAll = express.Router()

// /routes/apiPagesAll.js (або будь-який інший файл маршруту)
apiPagesAll.get('/', async (req, res) => {
  try {
    const sql = `SELECT slug FROM pages`
    const result = await conn.query(sql)

    res.json(result.rows) // [{ slug: 'home' }, { slug: 'about' }, ...]
  } catch (err) {
    console.error('❌ Error fetching slugs:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default apiPagesAll
