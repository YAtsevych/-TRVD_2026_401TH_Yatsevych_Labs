import { HomeSmallCardThirdSlideData } from '../../../resoures/Data/HomeCardsData'
import { HomeSmallCardThirdSlide } from '../Main/Cards'
import styles from './style.module.css'
import React from 'react'

const PreFooter = () => {
  // Проверка на случай, если данные не пришли

  return (
    <section className={styles.preFooter}>
      <div className={styles.preFooterContainer}>
        <h2 className={styles.preFooterTitle}>
          Learn with one of our popular online courses
        </h2>
        <div className={styles.preFooterCards}>
          {HomeSmallCardThirdSlideData.map((card) => (
            <HomeSmallCardThirdSlide
              key={card.id}
              data={card}
              styles={styles}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PreFooter
