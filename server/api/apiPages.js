import express from 'express'
import conn from '../DB/db.js'
import { MY_LANGUAGE_ROM } from '../config.js'

const apiPages = express.Router()

// 1. Запрос страницы по slug
apiPages.get('/:slug', async (req, res) => {
  try {
    const slug = req.params.slug

    const sql = `SELECT * FROM pages WHERE slug = $1`
    const result = await conn.query(sql, [slug])

    res.json(result.rows)
  } catch (err) {
    console.error('Error fetching page by slug:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// 2. Главная страница (Home/Acasă)
apiPages.get('/', async (req, res) => {
  try {
    const titleHome =
      MY_LANGUAGE_ROM.dbName === 'db_courserom_sql' ? 'Acasă' : 'Home'

    const sql = `SELECT * FROM pages WHERE title = $1`
    const result = await conn.query(sql, [titleHome])

    res.json(result.rows)
  } catch (err) {
    console.error('Error fetching home page:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

export default apiPages
