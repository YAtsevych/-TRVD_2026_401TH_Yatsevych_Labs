import PreFooter from '../components/StaticComp/PreFooter/PreFooter'
import React from 'react'
import { useParams } from 'react-router-dom'
import LessonsBlock from '../components/CourseComp/LessonsBlock/LessonsBlock'
import { useEffect, useState } from 'react'
import axios from 'axios'

const CoursePage = () => {
  const [courses, setCourses] = useState(null)
  const [lessons, setLessons] = useState(null)
  const { slug, slug2 } = useParams()
  useEffect(() => {
    Promise.all([
      axios.get(`/api/lessons/${slug}/${slug2}`),
      axios.get(`/api/courses/${slug}`),
    ])
      .then(([res1, res2]) => {
        setLessons(res1.data)
        setCourses(res2.data)
      })
      .catch((err) => console.error('Ошибка:', err))
  }, [slug, slug2])

  const courseSlug = slug2

  return (
    <>
      {courses &&
        courses.map((course) => {
          if (courseSlug === course.slug2) {
            return (
              <React.Fragment key={course.idCourse}>
                <LessonsBlock
                  course={course}
                  lessons={lessons}
                  NavParts={courses}
                />
                <PreFooter />
              </React.Fragment>
            )
          }
          return null
        })}
    </>
  )
}

export default CoursePage
