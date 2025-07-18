import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LessonsBlock from '../components/CourseComp/LessonsBlock/LessonsBlock'
import PreFooter from '../components/StaticComp/PreFooter/PreFooter'

const CoursePage = () => {
  const link = import.meta.env.VITE_API_URL
  const { slug, slug2 } = useParams()

  const [courses, setCourses] = useState(null)
  const [lessons, setLessons] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const lessonsPerPage = 10

  useEffect(() => {
    const pageCoursesData = localStorage.getItem(`${slug}Courses`)

    if (pageCoursesData) {
      setCourses(JSON.parse(pageCoursesData))
    } else {
      axios
        .get(`${link}/api/courses/${slug}`)
        .then((res) => {
          setCourses(res.data)
          localStorage.setItem(`${slug}Courses`, JSON.stringify(res.data))
        })
        .catch((err) => console.error('Ошибка:', err))
    }
  }, [slug])

  useEffect(() => {
    axios
      .get(`${link}/api/lessons/${slug}/${slug2}`, {
        params: { page: currentPage, limit: lessonsPerPage },
      })
      .then((res) => {
        setLessons(res.data.lessons)
        setTotalPages(res.data.totalPages)
      })
      .catch((err) => console.error('Ошибка:', err))
  }, [slug, slug2, currentPage])

  const courseSlug = slug2

  return (
    <>
      {courses &&
        courses.map((course) => {
          if (courseSlug === course.slug2) {
            return (
              <React.Fragment key={course.idcourse}>
                <LessonsBlock
                  course={course}
                  lessons={lessons}
                  NavParts={courses}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
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
