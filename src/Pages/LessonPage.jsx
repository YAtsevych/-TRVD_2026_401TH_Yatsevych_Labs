import PreFooter from '../components/StaticComp/PreFooter/PreFooter'
import LessonPages from '../components/LessonComp/LessonPages'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CreateExerciseForVocabular from '../resoures/CreateExerciseForVocabular'
const LessonPage = () => {
  const { slug, slug2, slug3 } = useParams()
  const [lesson, setLesson] = useState(null)
  const [tasks, setTasks] = useState(null)
  const [lessonVocabular, setLessonVocabular] = useState(null)
  useEffect(() => {
    const link = import.meta.env.VITE_API_URL
    axios
      .get(`${link}/api/lessonMain/${slug}/${slug2}/${slug3}`)
      .then((res) => {
        if (res.data.lessonvocabular) {
          setLessonVocabular(res.data.lessonvocabular)
        }
        setLesson(res.data.lesson)
        console.log(lesson)
        if (res.data.lessonvocabular && res.data.lessonvocabular.length !== 0) {
          setTasks(
            CreateExerciseForVocabular(res.data.lessonvocabular, res.data.tasks)
          )
        } else {
          setTasks(res.data.tasks)
        }
      })
      .catch((err) => console.error('Ошибка:', err))
  }, [slug, slug2, slug3])

  return (
    <>
      <LessonPages lesson={lesson} tasks={tasks}></LessonPages>
      <PreFooter></PreFooter>
    </>
  )
}

export default LessonPage
