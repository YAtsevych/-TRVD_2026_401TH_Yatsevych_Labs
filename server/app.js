import cors from "cors";
import express from "express";
import courseRoute from "./api/apiCourses.js";
import apiTaskGeneration from "./api/apiEnglishTaskAI.js";
import headerRoute from "./api/apiHeader.js";
import lessonRoute from "./api/apiLessonOne.js";
import lessonsRoute from "./api/apiLessons.js";
import pagesRoute from "./api/apiPages.js";
import apiPagesAll from "./api/apiPagesAll.js";
import apiRegistration from "./api/apiRegistration.js";
import apiLogin from "./api/apiLogin.js";
import apiMe from "./api/apiMe.js";
import rateLimit from "express-rate-limit";
const app = express();
// 1. Глобальний ліміт для всіх запитів
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 хвилин
  max: 100, // Максимум 100 запgn на IP за 15 хвилин
  message: "Занадто багато запитів з цієї IP, спробуйте пізніше",
  standardHeaders: true, // Повертає інформацію про ліміт в RateLimit-* headers
  legacyHeaders: false, // Вимикає X-RateLimit-* headers
});

// 2. Суворіший ліміт для авторизації
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 хвилин
  max: 5, // Макмум 5 спроб за 15 хвилин
  message: "Занадто багато спроб входу. Спробуйте пізніше.",
  skipSuccessfulRequests: true, // Не рахує успішні запити
});

// 3. Ліміт для реєстрації
const registrationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 година
  max: 3, // Максимум 3 реєстрації на IP за годину
  message: "Занадто багато спроб реєстрації. Спробуйте пізніше.",
});

// 4. Ліміт для AI API (дорогий запит)
const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 година
  max: 10, // Максимум 10 запитів на годину
  message: "Перевищено ліміт запитів до AI. Спробуйте пізніше.",
});
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://con-dyp1.onrender.com",
      "https://reactfront-9sll.onrender.com",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use("/api/me", apiMe);
app.use("/api/login", authLimiter, apiLogin);
app.use("/api/Header", headerRoute);
app.use("/api/pages", pagesRoute);
app.use("/api/courses", courseRoute);
app.use("/api/lessons", lessonsRoute);
app.use("/api/lessonMain", lessonRoute);
app.use("/api/register", registrationLimiter, apiRegistration);
app.use("/api/apiEnglishTaskAI", aiLimiter, apiTaskGeneration);
app.use("/api/apiPagesAll", apiPagesAll);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
