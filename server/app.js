import express from 'express'
import cors from 'cors'
import headerRoute from './api/apiHeader.js'
import pagesRoute from './api/apiPages.js'
import courseRoute from './api/apiCourses.js'
import lessonsRoute from './api/apiLessons.js'
import lessonRoute from './api/apiLessonOne.js'
import apiRegistration from './api/apiRegistration.js'
import apiTaskGeneration from './api/apiEnglishTaskAI.js'
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/Header', headerRoute)
app.use('/api/pages', pagesRoute)
app.use('/api/courses', courseRoute)
app.use('/api/lessons', lessonsRoute)
app.use('/api/lessonMain', lessonRoute)
app.use('/api/register', apiRegistration)
app.use('/api/apiEnglishTaskAI', apiTaskGeneration)
app.listen(3001, () => {
  console.log('Server started on port 3001')
  console.log('Link: http://localhost:3001/api/')
})
