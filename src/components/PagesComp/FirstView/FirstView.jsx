import styles from './style.module.css'
import React from 'react'
const FirstView = ({ data }) => {
  console.log(data)
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
      <div className={styles.overview}>
        <div className={styles.firstSlideInclude1}>
          <h1 className={styles.title}>{data.firstviewtitle}</h1>
          <p className={styles.subtitle}>{data.firstviewsubtitle}</p>
          <button className={styles.ctaButton}>Get Start</button>
        </div>
      </div>
    </div>
  )
}
export default FirstView
