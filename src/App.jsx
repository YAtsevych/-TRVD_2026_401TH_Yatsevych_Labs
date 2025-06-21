import Layout from './components/StaticComp/layout/Layout.jsx'
import Home from './Pages/Home.jsx'
import { Routes, Route, Link } from 'react-router-dom'
import MainPages from './Pages/MainPages.jsx'
import CoursePage from './Pages/CoursePages.jsx'
import Registration from './Pages/Registration.jsx'
import LessonPage from './Pages/LessonPage.jsx'
import React from 'react'
import ScrollToTop from './resoures/ScrollTop.jsx'
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/:slug" element={<MainPages />} />
          <Route path="/:slug/:slug2" element={<CoursePage />} />
          <Route path="/:slug/:slug2/:slug3" element={<LessonPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
