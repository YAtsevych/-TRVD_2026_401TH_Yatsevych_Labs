import express from 'express'
import conn from '../DB/db.js' // Ваш настроенный пул соединений для Neon
import bcrypt from 'bcrypt'

const apiRegistration = express.Router()

apiRegistration.post('/', async (req, res) => {
  try {
    const { email, password } = req.body

    // 1. Валидация входных данных (осталась без изменений)
    if (!email || !password) {
      return res.status(400).json({ message: 'Email и пароль обязательны' })
    }
    if (!email.includes('@')) {
      return res.status(400).json({ message: 'Некорректный email' })
    }
    if (password.length < 6) {
      // Сообщение об ошибке лучше унифицировать
      return res
        .status(400)
        .json({ message: 'Пароль должен быть не менее 6 символов' })
    }

    // 2. Проверка, существует ли пользователь (синтаксис pg)
    // Используем { rows } для получения результата
    const { rows: existingUsers } = await conn.query(
      `SELECT idUser FROM users WHERE NameUser = $1;`, // Плейсхолдер $1 вместо ?
      [email]
    )

    if (existingUsers.length > 0) {
      return res.status(409).json({
        // 409 Conflict - более подходящий статус
        message: 'Пользователь с таким email уже существует',
      })
    }

    // 3. Хеширование пароля (осталось без изменений)
    const passwordHashed = await bcrypt.hash(password, 10)

    // 4. Вставка нового пользователя (синтаксис pg + RETURNING)
    const insertQuery = `
      INSERT INTO users (NameUser, UserPassword) 
      VALUES ($1, $2) 
      RETURNING idUser;
    ` // Используем $1, $2 и добавляем RETURNING, чтобы получить ID

    const { rows } = await conn.query(insertQuery, [email, passwordHashed])

    // 5. Отправка успешного ответа
    // Если rows[0] существует, значит вставка прошла успешно
    return res.status(201).json({
      message: 'Пользователь успешно зарегистрирован',
      userId: rows[0].iduser, // Получаем ID из результата RETURNING. Имя поля может быть в нижнем регистре
    })
  } catch (err) {
    // 6. Улучшенная обработка ошибок сервера
    console.error('Ошибка при регистрации:', err) // Логируем ошибку на сервере
    return res
      .status(500)
      .json({ message: 'Внутренняя ошибка сервера при регистрации' })
  }
})

export default apiRegistration
