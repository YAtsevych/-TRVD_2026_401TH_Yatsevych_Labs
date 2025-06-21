import express from 'express'
import conn from '../DB/db.js'
import { MY_LANGUAGE_ROM } from '../config.js'
const apiHeader = express.Router()

apiHeader.get('/', async (req, res) => {
  try {
    const sql = `SELECT idPages, title, link FROM ${MY_LANGUAGE_ROM.dbName}.pages;`
    const [rows] = await conn.query(sql)
    res.json(rows)
  } catch (err) {
    console.error('Error fetching pages:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

export default apiHeader
