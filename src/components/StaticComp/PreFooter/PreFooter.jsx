import { HomeSmallCardThirdSlideData } from '../../../resoures/Data/HomeCardsData'
import { HomeSmallCardThirdSlide } from '../Main/Cards'
import styles from './style.module.css'
import React from 'react'

const PreFooter = () => {
  // Проверка на случай, если данные не пришли

  return (
    <section className={styles.preFooter}>
      <div className={styles.preFooterContainer}>
        <h2 className={styles.preFooterTitle}>Ready to take the next step?</h2>
        <p>
          Our popular online courses are designed to help you succeed. Join
          thousands of learners and start your journey to fluency today.
        </p>
        <div className={styles.preFooterCards}>
          <div className={styles.preFooterCard}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="6"></circle>
              <path d="M8 14v3l4 3 4-3v-3"></path>
              <path d="M10 14l2 1 2-1"></path>
            </svg>

            <span>Expert-designed courses</span>
          </div>
          <div className={styles.preFooterCard}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="5" y="2" width="13" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>

            <span>Learn on any device</span>
          </div>
          <div className={styles.preFooterCard}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>

            <span>Track your progress</span>
          </div>
        </div>{' '}
        <button className={styles.ctaButton}>Explore more courses</button>
      </div>
    </section>
  )
}

export default PreFooter
