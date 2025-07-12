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
  const [page, setPage] = useState(null)
  const [courses, setCourses] = useState(null)
  const { slug } = useParams()
  useEffect(() => {
    const link = `${import.meta.env.VITE_API_URL}`
    Promise.all([
      axios.get(`${link}/api/pages/${slug}`),
      axios.get(`${link}/api/courses/${slug}`),
    ])
      .then(([res1, res2]) => {
        setPage(res1.data[0])

        setCourses(res2.data)
      })
      .catch((err) => console.error('Ошибка:', err))
  }, [slug])

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
