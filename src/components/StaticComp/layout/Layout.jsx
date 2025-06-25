import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import React from 'react'
const Layout = () => {
  const [pages, setPages] = useState(null)

  useEffect(() => {
    const link = import.meta.env.VITE_API_URL
    axios
      .get(`${link}/api/Header`)
      .then((res) => setPages(res.data))
      .catch((err) => console.error('Ошибка:', err))
  }, [])

  return (
    <>
      <Header pages={pages} /> {/* Передаём данные в Header */}
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
