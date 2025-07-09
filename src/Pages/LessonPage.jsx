import PreFooter from '../components/StaticComp/PreFooter/PreFooter'
import LessonPages from '../components/LessonComp/LessonPages'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CreateExerciseForVocabular from '../resoures/CreateExerciseForVocabular'

import LessonPageVocabular from '../components/Lessons/Vocabular/LessonPageVocabular'
import LessonPageGrammar from '../components/Lessons/Grammar/LessonPageGrammar'

const LessonPage = () => {
  const { slug, slug2, slug3 } = useParams()
  const [lessond, setLesson] = useState(null)
  const [tasks, setTasks] = useState(null)
  const [lessonVocabular, setLessonVocabular] = useState(null)
  useEffect(() => {
    const link = import.meta.env.VITE_API_URL
    axios
      .get(`${link}/api/lessonMain/${slug}/${slug2}/${slug3}`)
      .then((res) => {
        if (res.data.lessonVocabular) {
          setLessonVocabular(res.data.lessonVocabular)
        }
        setLesson(res.data.lesson)

        if (res.data.lessonVocabular && slug == 'vocabular') {
          setTasks(
            CreateExerciseForVocabular(res.data.lessonVocabular, res.data.tasks)
          )
        } else {
          setTasks(res.data.tasks)
        }
      })
      .catch((err) => console.error('Ошибка:', err))
  }, [slug, slug2, slug3])
  const LessonPageComponentMap = {
    vocabular: LessonPageVocabular,
    grammar: LessonPageGrammar,
  }
  const Component = LessonPageComponentMap[slug] || DefaultLessonPage
  return (
    <>
      <Component lesson={lessond} tasks={tasks}></Component>
      <PreFooter></PreFooter>
    </>
  )
}

export default LessonPage
