import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import HeaderData from '../../../resoures/Data/HeaderData'
import React from 'react'
const Layout = () => {
  const [pages, setPages] = useState(null)
  useEffect(() => {
    if (HeaderData && HeaderData.length > 0) {
      // ✅ если есть локальные данные — используем их
      setPages(HeaderData)
    } else {
      // 🔄 иначе — грузим с API
      const link = import.meta.env.VITE_API_URL
      axios
        .get(`${link}/api/Header`)
        .then((res) => setPages(res.data))
        .catch((err) => console.error('Ошибка при загрузке /api/Header:', err))
    }
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
