import styles from './style.module.css'
import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  HomeBigCardSecondSlide,
  InfoCard,
  HomeSmallCardForthSlide,
} from './Cards.jsx'
import {
  HomeCardsData,
  HomeSmallCardFourthSlideData,
} from '../../../resoures/Data/HomeCardsData.js'

import FirstView from '../../PagesComp/FirstView/FirstView.jsx'
import PreFooter from '../PreFooter/PreFooter.jsx'
const Main = () => {
  const [slugs, setSlugs] = useState(null)
  const link = `${import.meta.env.VITE_API_URL}`

  // 1. Отримуємо всі slug-и
  useEffect(() => {
    axios
      .get(`${link}/api/apiPagesAll/slugs`)
      .then((res) => {
        console.log('✅ Slugs отримано:', res.data)
        setSlugs(res.data) // [{ slug: "home" }, { slug: "about" }]
      })
      .catch((err) => console.error('❌ Помилка при отриманні slug-ів:', err))
  }, [])

  // 2. Для кожного slug — підгружаємо і кешуємо дані
  useEffect(() => {
    if (slugs && Array.isArray(slugs)) {
      slugs.forEach(({ slug }) => {
        Promise.all([
          axios.get(`${link}/api/pages/${slug}`),
          axios.get(`${link}/api/courses/${slug}`),
        ])
          .then(([res1, res2]) => {
            console.log(`📦 Збережено у localStorage: ${slug}`)
            localStorage.setItem(slug, JSON.stringify(res1.data))
            localStorage.setItem(`${slug}Courses`, JSON.stringify(res2.data))
          })
          .catch((err) =>
            console.error(`❌ Помилка при отриманні для ${slug}:`, err)
          )
      })
    }
  }, [slugs])
  const First = {
    id: 1,
    slug: 'home',
    title: 'Home',
    firstviewbackgroundimg: '/resoures/img/backgrounds/Home.webp',
    firstviewtext:
      'Learn English online and boost your skills with our engaging tools and materials.',
    link: '/',
    description: '',
    stylespecial: { backgroundPosition: '100%' },
    firstviewtitle: 'Master English with Confidence',
    firstviewsubtitle:
      'Learn English online and boost your skills with our engaging tools and materials.',
  }
  return (
    <main className={styles.main}>
      <FirstView key={First.id} data={First} />

      <section className={styles.contentSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            We provide you with the right tools to help you interact confidently
            in the real world.
          </h2>
        </div>

        <div className={styles.cardsContainer}>
          {HomeCardsData.map((card) => (
            <HomeBigCardSecondSlide key={card.id} data={card} styles={styles} />
          ))}
        </div>
      </section>

      <section className={styles.sectionContainer}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.title}>
            Explore our site to improve your English with our bite-sized
            lessons, quizzes and games.
          </h2>
          <p className={styles.subtitle}>
            With our varied selection of learning materials, you can practice
            your English for free.
          </p>

          <div className={styles.cardsGrid}>
            {HomeCardsData.slice()
              .reverse()
              .map((card) => (
                <InfoCard key={card.id} data={card} styles={styles} />
              ))}
          </div>

          <div className={styles.buttonContainer}>
            <Link to="/start" className={styles.ctaButton}>
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <div className={styles.fourthSlide}>
        <div className={styles.fourthSlideCards}>
          {HomeSmallCardFourthSlideData.map((card) => (
            <HomeSmallCardForthSlide
              key={card.id}
              data={card}
              styles={styles}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
export default Main
