import express from "express";
import conn from "../DB/db.js";
import { requireAuth } from "../middleware/requireAuth.js";

const apiMe = express.Router();

apiMe.get("/", requireAuth, async (req, res) => {
  try {
    const { idUser } = req.user;

    const { rows } = await conn.query(
      `SELECT idUser as "idUser", NameUser as "email" FROM users WHERE idUser = $1;`,
      [idUser],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: rows[0] });
  } catch (err) {
    console.error("Ошибка /api/me:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default apiMe;
