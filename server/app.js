import cors from 'cors'
import express from 'express'
import courseRoute from './api/apiCourses.js'
import apiTaskGeneration from './api/apiEnglishTaskAI.js'
import headerRoute from './api/apiHeader.js'
import lessonRoute from './api/apiLessonOne.js'
import lessonsRoute from './api/apiLessons.js'
import pagesRoute from './api/apiPages.js'
import apiPagesAll from './api/apiPagesAll.js'
import apiRegistration from './api/apiRegistration.js'
const app = express()
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://con-dyp1.onrender.com',
      'https://reactfront-9sll.onrender.com',
    ],
    credentials: true,
  })
)
app.use(express.json())
app.use('/api/Header', headerRoute)
app.use('/api/pages', pagesRoute)
app.use('/api/courses', courseRoute)
app.use('/api/lessons', lessonsRoute)
app.use('/api/lessonMain', lessonRoute)
app.use('/api/register', apiRegistration)
app.use('/api/apiEnglishTaskAI', apiTaskGeneration)
app.use('/api/apiPagesAll', apiPagesAll)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
