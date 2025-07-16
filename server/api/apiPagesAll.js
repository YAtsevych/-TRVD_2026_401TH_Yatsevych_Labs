import express from 'express'
import conn from '../DB/db.js'
import { MY_LANGUAGE_ROM } from '../config.js'

const apiPagesAll = express.Router()

// /routes/apiPagesAll.js (або будь-який інший файл маршруту)
apiPagesAll.get('/:type/:slug', async (req, res) => {
  const { type, slug } = req.params

  try {
    if (type === 'slugs') {
      const sql = `SELECT slug FROM pages`
      const result = await conn.query(sql)
      return res.json(result.rows) // ✅ return
    }

    if (type === 'slugs2') {
      if (!slug) {
        return res.status(400).json({ error: 'Slug is required for slugs2' })
      }
      const sql = `SELECT slug2 FROM courses JOIN pages ON courseconection = idpages WHERE slug = $1`
      const result = await conn.query(sql, [slug])
      return res.json(result.rows) // ✅ return
    }

    // ⛔️ спрацює тільки якщо жодна з умов вище не виконалась
    return res.status(400).json({ error: `Unknown type: ${type}` })
  } catch (err) {
    console.error('❌ Error fetching slugs:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

export default apiPagesAll
