import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import FirstView from '../components/PagesComp/FirstView/FirstView'
import CoursesBlock from '../components/PagesComp/CoursesBlock/CoursesBlock'
import PreFooter from '../components/StaticComp/PreFooter/PreFooter'

const parseLocalObject = (data) => {
  if (!data) return null
  try {
    const parsed = JSON.parse(data)
    if (
      Array.isArray(parsed) &&
      parsed.length === 1 &&
      typeof parsed[0] === 'object'
    ) {
      return parsed[0]
    }
    if (
      parsed !== null &&
      typeof parsed === 'object' &&
      !Array.isArray(parsed)
    ) {
      return parsed
    }
    return null
  } catch {
    return null
  }
}

const MainPages = () => {
  const link = import.meta.env.VITE_API_URL
  const { slug } = useParams()

  const [page, setPage] = useState(null)
  const [courses, setCourses] = useState(null)
  const [slugs2, setSlugs2] = useState(null)

  useEffect(() => {
    // Функция для загрузки страницы с api и сохранения в localStorage
    const fetchPageFromApi = () => {
      axios
        .get(`${link}/api/pages/${slug}`)
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setPage(res.data[0])
            localStorage.setItem(slug, JSON.stringify(res.data[0])) // Сохраняем объект, не массив
          }
        })
        .catch((err) => console.error('Ошибка:', err))
    }

    // Чтение из localStorage с проверкой формата
    const pageData = parseLocalObject(localStorage.getItem(slug))
    if (pageData) {
      setPage(pageData)
    } else {
      localStorage.removeItem(slug)
      fetchPageFromApi()
    }

    // Аналогично для курсов
    const coursesDataRaw = localStorage.getItem(`${slug}Courses`)
    if (coursesDataRaw) {
      try {
        const parsedCourses = JSON.parse(coursesDataRaw)
        setCourses(parsedCourses)
      } catch {
        localStorage.removeItem(`${slug}Courses`)
        axios
          .get(`${link}/api/courses/${slug}`)
          .then((res) => {
            setCourses(res.data)
            localStorage.setItem(`${slug}Courses`, JSON.stringify(res.data))
          })
          .catch((err) => console.error('Ошибка:', err))
      }
    } else {
      axios
        .get(`${link}/api/courses/${slug}`)
        .then((res) => {
          setCourses(res.data)
          localStorage.setItem(`${slug}Courses`, JSON.stringify(res.data))
        })
        .catch((err) => console.error('Ошибка:', err))
    }
  }, [slug, link])

  // Получаем slugs2
  useEffect(() => {
    axios
      .get(`${link}/api/apiPagesAll/slugs2/${slug}`)
      .then((res) => {
        setSlugs2(res.data)
      })
      .catch((err) => console.error('❌ Ошибка при получении slug2:', err))
  }, [slug, link])

  // Кэшируем уроки для каждого slug2
  useEffect(() => {
    if (slugs2 && Array.isArray(slugs2)) {
      slugs2.forEach(({ slug2 }) => {
        const key = `${slug}CourseLessons_${slug2}`
        const cachedLesson = localStorage.getItem(key)
        if (!cachedLesson) {
          axios
            .get(`${link}/api/lessons/${slug}/${slug2}`)
            .then((res) => {
              console.log(`Получено и сохранено уроки для ${slug2}`)
              localStorage.setItem(key, JSON.stringify(res.data))
            })
            .catch((err) =>
              console.error(`❌ Ошибка при получении уроков ${slug2}:`, err)
            )
        }
      })
    }
  }, [slugs2, slug, link])

  return (
    <>
      {page ? (
        <>
          <FirstView data={page} />
          <CoursesBlock data={page} courses={courses} />
          <PreFooter />
        </>
      ) : null}
    </>
  )
}

export default MainPages
