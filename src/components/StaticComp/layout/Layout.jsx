import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Layout = () => {
  const [pages, setPages] = useState(null)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/Header`)
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
