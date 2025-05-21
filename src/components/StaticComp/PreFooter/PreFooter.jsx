import { HomeSmallCardThirdSlideData } from '../../../resoures/Data/HomeCardsData'
import { HomeSmallCardThirdSlide } from '../Main/Cards'
import styles from './style.module.css'

const PreFooter = () => {
  return (
    <div className={styles.preFooter}>
      <div className={styles.preFooterTitle}>
        Learn with one of our popular online courses
      </div>
      <div className={styles.preFooterCards}>
        {HomeSmallCardThirdSlideData.map((card) => (
          <HomeSmallCardThirdSlide key={card.id} data={card} styles={styles} />
        ))}
      </div>
    </div>
  )
}
export default PreFooter
