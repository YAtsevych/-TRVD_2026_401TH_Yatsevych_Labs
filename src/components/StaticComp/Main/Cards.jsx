import { Link } from 'react-router-dom'
const HomeBigCardSecondSlide = ({ data, styles }) => {
  return (
    <div className={`${styles[data.cardClass]} ${styles.secondSlideCard}`}>
      <div
        className={styles.secondSlideCardImg}
        style={{
          backgroundImage: `url(${data.cardImgSrc})`,
        }}
      ></div>
      <div className={styles.CardContent}>
        <div className={styles.CardContentTitle}>{data.title}</div>
        <div className={styles.CardContentDescription}>{data.description}</div>
        <div className={styles.CardContentList}>
          <ul>
            {data.list.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <Link to={data.link} className={styles.CardContentButton}>
          Start to learn
        </Link>
      </div>
    </div>
  )
}
const HomeSmallCardThirdSlide = ({ data, styles }) => {
  return (
    <div className={styles.preFooterCard}>
      <img src={data.cardImgSrc} alt="" />
      <div className={styles.preFooterCardTitle}>{data.title}</div>
      <div className={styles.preFooterCardText}>{data.description}</div>
    </div>
  )
}
const HomeSmallCardForthSlide = ({ data, styles }) => {
  return (
    <div className={styles.fourthSlideCard}>
      <img src={data.cardImgSrc} alt="" />
      <Link to="" className={styles.fourthSlideCardTitle}>
        {data.title}
      </Link>
      <div className={styles.fourthSlideCardText}>{data.description}</div>
    </div>
  )
}
const HomeSmallCardFivethSlide = ({ data, styles }) => {
  return (
    <div className={styles.fivethSlideCard}>
      <div className={styles.fivethSlideCardPoint}>
        <img src="/resoures/img/icons/check_mark_icon.png" alt="#" />
      </div>
      <div className={styles.fivethSlideCardContent}>
        <div className={styles.fivethSlideCardTitle}>{data.title}</div>
        <div className={styles.fivethSlideCardText}>
          {data.shortDescription}
        </div>
      </div>
    </div>
  )
}

export {
  HomeBigCardSecondSlide,
  HomeSmallCardFivethSlide,
  HomeSmallCardThirdSlide,
  HomeSmallCardForthSlide,
}
