import PreFooter from '../components/StaticComp/PreFooter/PreFooter'
import React from 'react'
import { useParams } from 'react-router-dom'
import LessonsBlock from '../components/CourseComp/LessonsBlock/LessonsBlock'
import { useEffect, useState } from 'react'
import axios from 'axios'

const CoursePage = () => {
  const link = import.meta.env.VITE_API_URL
  const [courses, setCourses] = useState(null)
  const [lessons, setLessons] = useState(null)
  const { slug, slug2 } = useParams()

  useEffect(() => {
    //Здесь lessons = Список уроков в A1vocbular
    const LessonsData = localStorage.getItem(`${slug}CourseLessons_${slug2}`)
    //Здесь courses = A1vocbular etc.
    const pageCoursesData = localStorage.getItem(`${slug}Courses`)

    if (LessonsData) {
      setLessons(JSON.parse(LessonsData))
    } else {
      ///////////////////////////////////////////////////////////////////////////
      axios
        .get(`${link}/api/lessons/${slug}/${slug2}`)

        .then((res1) => {
          setLessons(res1.data)

          localStorage.setItem(
            `${slug}CourseLessons_${slug2}`,
            JSON.stringify(res1.data)
          )
        })
        .catch((err) => console.error('Ошибка:', err))
    }

    if (pageCoursesData) {
      setCourses(JSON.parse(pageCoursesData))
    } else {
      axios
        .get(`${link}/api/courses/${slug}`)

        .then(([res1, res2]) => {
          setCourses(res2.data)

          localStorage.setItem(`${slug}Courses`, JSON.stringify(res2.data))
        })
        .catch((err) => console.error('Ошибка:', err))
    }
  }, [slug, slug2])
  const courseSlug = slug2

  return (
    <>
      {courses &&
        courses.map((course) => {
          if (courseSlug === course.slug2) {
            return (
              <React.Fragment key={course.idсourse}>
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
