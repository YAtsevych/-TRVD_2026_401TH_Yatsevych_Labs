import express from 'express'
import conn from '../DB/db.js'
import bcrypt from 'bcrypt'
import { MY_LANGUAGE_ROM } from '../config.js'
const apiRegistration = express.Router()

apiRegistration.post('/', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email и пароль обязательны' })
    }
    if (!email.includes('@')) {
      return res.status(400).json({ message: 'Некоректный email' })
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password isn`t availeble' })
    }

    const [research] = await conn.query(
      `SELECT idUser FROM ${MY_LANGUAGE_ROM.dbName}.users WHERE NameUser = ?;`,
      [email]
    )
    if (research.length > 0) {
      return res.status(400).json({
        message: 'User was already added',
      })
    }

    const passwordHashed = await bcrypt.hash(password, 10)

    const [result] = await conn.query(
      `INSERT INTO users (NameUser, UserPassword) VALUES (?, ?)`,
      [email, passwordHashed]
    )
    if (result.affectedRows === 0) {
      return res.status(500).json({ message: 'Ошибка вставки в базу данных' })
    } else {
      return res.status(201).json({
        message: 'Пользователь добавлен',
        userId: result.insertId,
      })
    }
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'Error from server with registration' })
  }
})

export default apiRegistration
