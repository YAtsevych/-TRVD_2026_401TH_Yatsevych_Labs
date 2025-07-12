import express from 'express'
import pool from '../DB/db.js' // підключення до PostgreSQL через pg
import { MY_LANGUAGE_ROM } from '../config.js'
import fs from 'fs'
const apiHeader = express.Router()

apiHeader.get('/', async (req, res) => {
  try {
    const sql = `SELECT idPages, title, link FROM pages;`
    const { rows } = await pool.query(sql)

    res.json(rows)
  } catch (err) {
    console.error('Error fetching pages:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

export default apiHeader
