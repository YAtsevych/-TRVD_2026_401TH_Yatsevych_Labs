import express from 'express'
import conn from '../DB/db.js'
import { MY_LANGUAGE_ROM } from '../config.js'

const apiPagesAll = express.Router()

// /routes/apiPagesAll.js (або будь-який інший файл маршруту)
apiPagesAll.get('/:type/:slug', async (req, res) => {
  const type = req.params.type
  const slug = req.params.slug
  try {
    if (type === 'slugs') {
      const sql = `SELECT slug FROM pages`
      const result = await conn.query(sql)

      res.json(result.rows) // [{ slug: 'home' }, { slug: 'about' }, ...]
    } else if (type === 'slugs2') {
      if (!slug) {
        return res.status(400).json({ error: 'Slug is required for slugs2' })
      }
      const sql = `SELECT slug2 FROM courses Join pages on courseconection = idpages where slug = $1 `
      const result = await conn.query(sql, [slug])

      res.json(result.rows) // [{ slug: 'home' }, { slug: 'about' }, ...]
    }
    return res.status(400).json({ error: `Unknown type: ${type}` })
  } catch (err) {
    console.error('❌ Error fetching slugs:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default apiPagesAll
