import { Link } from 'react-router-dom'
import React from 'react'
const HomeBigCardSecondSlide = ({ data, styles }) => {
  return (
    <div className={styles.card}>
      <div
        className={styles.cardImage}
        style={{ backgroundImage: `url(${data.cardImgSrc})` }}
      ></div>
      <div className={styles.cardContent}>
        <h3 className={styles.contentTitle}>{data.title}</h3>
        <p className={styles.contentDescription}>{data.description}</p>
        <ul className={styles.contentList}>
          {data.list.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <Link to={data.link} className={styles.contentButton}>
          Start to learn
        </Link>
      </div>
    </div>
  )
}

const HomeSmallCardThirdSlide = ({ data, styles }) => {
  return (
    <div className={styles.preFooterCard}>
      <img
        src={data.cardImgSrc}
        alt={data.title}
        className={styles.preFooterCardIcon}
      />
      <h3 className={styles.preFooterCardTitle}>{data.title}</h3>
      <p className={styles.preFooterCardText}>{data.description}</p>
    </div>
  )
}
const HomeSmallCardForthSlide = ({ data, styles }) => {
  return (
    <div className={styles.fourthSlideCard}>
      <img src={data.cardImgSrc} alt="" />
      <Link to={data.link} className={styles.fourthSlideCardTitle}>
        {data.title}
      </Link>
      <div className={styles.fourthSlideCardText}>{data.description}</div>
      <Link to={data.link} className={styles.fourthSlideCardTitle}>
        Learn more
      </Link>
    </div>
  )
}
const InfoCard = ({ data, styles }) => {
  return (
    <div className={styles.infoCard}>
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}>
          {' '}
          <img
            className={styles.icon}
            src="/resoures/img/icons/check_mark_icon.png"
            alt="#"
          />
        </div>
        <h3 className={styles.cardTitle}>{data.title}</h3>
      </div>
      <p className={styles.cardText}>{data.shortDescription}</p>
    </div>
  )
}

export {
  HomeBigCardSecondSlide,
  InfoCard,
  HomeSmallCardThirdSlide,
  HomeSmallCardForthSlide,
}
