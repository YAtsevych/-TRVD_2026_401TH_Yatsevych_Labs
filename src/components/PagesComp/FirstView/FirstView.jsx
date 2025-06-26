import styles from './style.module.css'
import React from 'react'
const FirstView = ({ data }) => {
  const styleSpecial =
    typeof data.stylespecial === 'string'
      ? JSON.parse(data.stylespecial)
      : data.stylespecial || {}
  return (
    <div
      className={styles.firstSlide}
      style={{
        backgroundImage: `url(${data.firstviewbackgroundimg})`,
        ...styleSpecial,
      }}
    >
      <div className={styles.firstSlideInclude1}>
        <img
          src="/resoures/img/logo/logoBlack.png"
          alt="logo"
          className={styles.logo}
        />
        <h3>{data.title}</h3>
        {data.firstviewtext}
      </div>
    </div>
  )
}
export default FirstView
