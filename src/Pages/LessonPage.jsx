import PreFooter from '../components/StaticComp/PreFooter/PreFooter'
import LessonPages from '../components/LessonComp/LessonPages'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const LessonPage = () => {
  const { slug, slug2, slug3 } = useParams()
  const { lesson, setLesson } = useState(null)
  useEffect(() => {
    axios
      .get(`/api/lessonMain/${slug}/${slug2}/${slug3}`)
      .then((res) => {
        setLesson(res.data)
      })
      .catch((err) => console.error('Ошибка:', err))
  }, [slug, slug2, slug3])
  return (
    <>
      <LessonPages lesson={lesson}></LessonPages>
      <PreFooter></PreFooter>
    </>
  )
}

export default LessonPage
