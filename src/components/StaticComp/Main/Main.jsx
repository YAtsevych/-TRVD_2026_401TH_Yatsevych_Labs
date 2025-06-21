import styles from './style.module.css'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  HomeBigCardSecondSlide,
  HomeSmallCardFivethSlide,
  HomeSmallCardThirdSlide,
  HomeSmallCardForthSlide,
} from './Cards.jsx'
import {
  HomeCardsData,
  HomeSmallCardThirdSlideData,
  HomeSmallCardFourthSlideData,
} from '../../../resoures/Data/HomeCardsData.js'

import PagesData from '../../../resoures/Data/PagesData.js'
import FirstView from '../../PagesComp/FirstView/FirstView.jsx'
import PreFooter from '../PreFooter/PreFooter.jsx'
const Main = () => {
  return (
    <main className={styles.main}>
      {PagesData.map((First) => {
        if (First.title == 'Home')
          return <FirstView key={First.id} data={First} />
      })}
      <div className={styles.firstSlideInclude2}>
        Everything you find here has been specially created by the British
        Council, the world's English teaching experts.
      </div>

      <div className={styles.secondSlide}>
        <div className={styles.secondSlideTitle}>
          We provide you with the right tools to help you interact confidently
          in the real world.
        </div>
        <div className={`${styles.secondSlideCards}`}>
          {HomeCardsData.map((card) => {
            return (
              <HomeBigCardSecondSlide
                key={card.id}
                data={card}
                styles={styles}
              />
            )
          })}
        </div>
      </div>

      <div className={styles.thirdSlide}>
        <PreFooter />
      </div>

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

      <div className={styles.fivethSlide}>
        <div className={styles.fivethSlideTitle}>
          Explore our site to improve your English with our bite-sized lessons,
          quizzes and games. With our varied selection of learning materials,
          you can practise your English for free.
        </div>
        <div className={styles.fivethSlideCards}>
          {HomeCardsData.slice()
            .reverse()
            .map((card) => {
              return (
                <HomeSmallCardFivethSlide
                  key={card.id}
                  data={card}
                  styles={styles}
                />
              )
            })}
        </div>

        <Link to="" className={styles.fivethSlideButton}>
          Get Start
        </Link>
      </div>
    </main>
  )
}
export default Main
