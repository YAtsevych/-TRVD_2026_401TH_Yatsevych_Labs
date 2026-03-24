import express from "express";
import conn from "../DB/db.js"; // Ваш настроенный пул соединений для Neon
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const apiLogin = express.Router();

apiLogin.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1. Валидация входных данных (осталась без изменений)
    if (!email || !password) {
      return res.status(400).json({ message: "Email и пароль обязательны" });
    }
    if (!email.includes("@")) {
      return res.status(400).json({ message: "Некорректный email" });
    }
    if (password.length < 6) {
      // Сообщение об ошибке лучше унифицировать
      return res
        .status(400)
        .json({ message: "Пароль должен быть не менее 6 символов" });
    }

    const { rows } = await conn.query(
      `SELECT iduser, nameuser, userpassword FROM users WHERE nameuser = $1;`,
      [email],
    );
    if (rows.length === 0) {
      return res.status(401).json({ message: "Неверный email или пароль" });
    }

    const user = rows[0];

    // userpassword / nameuser / iduser — так pg часто возвращает (lowercase)
    const ok = await bcrypt.compare(password, user.userpassword);
    if (!ok) {
      return res.status(401).json({ message: "Неверный email или пароль" });
    }
    // JWT
    const token = jwt.sign(
      {
        idUser: user.iduser,
        email: user.nameuser,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
    );
    return res.status(200).json({
      message: "Login success",
      token,
      user: { idUser: user.iduser, email: user.nameuser },
    });
  } catch (err) {
    console.error("Ошибка при логине:", err);
    return res.status(500).json({ message: "Ошибка сервера при логине" });
  }
});
export default apiLogin;
