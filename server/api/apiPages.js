import express from 'express'
import conn from '../DB/db.js'
import { MY_LANGUAGE_ROM } from '../config.js'
const apiPages = express.Router()
//Запрос странички
apiPages.get('/:slug', async (req, res) => {
  try {
    const slug = req.params.slug
    const sql = `SELECT * FROM ${MY_LANGUAGE_ROM.dbName}.pages WHERE slug = ?;`

    const [rows] = await conn.query(sql, [slug])
    res.json(rows)
  } catch (err) {
    console.error('Error fetching page by slug:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})
apiPages.get('/', async (req, res) => {
  try {
    if (MY_LANGUAGE_ROM.dbName == 'db_courserom_sql') {
      const titleHome = 'Acasă'
    } else {
      const titleHome = 'Home'
    }
    const sql = `SELECT * FROM ${MY_LANGUAGE_ROM.dbName}.pages WHERE title = ?;`
    const [rows] = await conn.query(sql, [titleHome])
    res.json(rows)
  } catch (err) {
    console.error('Error fetching home page:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

export default apiPages
