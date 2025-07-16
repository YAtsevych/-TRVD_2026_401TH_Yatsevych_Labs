import FirstView from '../components/PagesComp/FirstView/FirstView'
import CoursesBlock from '../components/PagesComp/CoursesBlock/CoursesBlock'
import PreFooter from '../components/StaticComp/PreFooter/PreFooter'
import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import fs from 'fs'

//Страницы Vocabular и тп
const MainPages = () => {
  const link = `${import.meta.env.VITE_API_URL}`
  const [page, setPage] = useState(null)
  const [courses, setCourses] = useState(null)
  const [slugs2, setSlugs2] = useState(null)
  const { slug } = useParams()
  useEffect(() => {
    const pageData = localStorage.getItem(slug)
    const pageCoursesData = localStorage.getItem(`${slug}Courses`)
    if (pageData) {
      setPage(JSON.parse(pageData)[0])
    } else {
      axios
        .get(`${link}/api/pages/${slug}`)

        .then((res1) => {
          setPage(res1.data[0])
          localStorage.setItem(slug, JSON.stringify(res1.data[0]))
        })
        .catch((err) => console.error('Ошибка:', err))
    }

    if (pageCoursesData) {
      setCourses(JSON.parse(pageCoursesData))
    } else {
      axios
        .get(`${link}/api/courses/${slug}`)

        .then((res1) => {
          setCourses(res1.data)

          localStorage.setItem(`${slug}Courses`, JSON.stringify(res1.data))
        })
        .catch((err) => console.error('Ошибка:', err))
    }
  }, [slug])
  // 1. Отримуємо всі slug2-и
  useEffect(() => {
    axios
      .get(`${link}/api/apiPagesAll/slugs2/${slug}`)
      .then((res) => {
        /////////////////////////////////////////////////////////////////
        console.log('✅ Slugs2 отримано:', res.data)
        setSlugs2(res.data)
      })
      .catch((err) => console.error('❌ Помилка при отриманні slug2-ів:', err))
  }, [slug])

  // // 2. Для кожного slug2 — підгружаємо і кешуємо дані
  // useEffect(() => {
  //   if (slugs2 && Array.isArray(slugs2)) {
  //     slugs2.forEach(({ slug2 }) => {
  //       const key = `${slug}CourseLessons_${slug2}` // Ключ унікальний для кожного уроку
  //       const cachedLesson = localStorage.getItem(key)

  //       if (!cachedLesson) {
  //         axios
  //           .get(`${link}/api/lessons/${slug}/${slug2}`)
  //           .then((res) => {
  //             localStorage.setItem(key, JSON.stringify(res.data))
  //           })
  //           .catch((err) =>
  //             console.error(`❌ Помилка при отриманні уроку ${slug2}:`, err)
  //           )
  //       } else {
  //         return
  //       }
  //     })
  //   }
  // }, [slugs2, slug])
  return (
    <>
      {page ? (
        <React.Fragment>
          <FirstView data={page} />
          {/* ожидается обьект страницы */}
          <CoursesBlock data={page} courses={courses} />
          <PreFooter />
        </React.Fragment>
      ) : null}
    </>
  )
}
export default MainPages
