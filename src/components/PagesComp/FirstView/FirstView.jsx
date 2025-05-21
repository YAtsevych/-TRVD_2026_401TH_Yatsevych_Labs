import styles from './style.module.css'

const FirstView = ({ data }) => {
  const styleSpecial =
    typeof data.styleSpecial === 'string'
      ? JSON.parse(data.styleSpecial)
      : data.styleSpecial || {}
  return (
    <div
      className={styles.firstSlide}
      style={{
        backgroundImage: `url(${data.FirstViewBackGroundImg})`,
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
        {data.FirstViewText}
      </div>
    </div>
  )
}
export default FirstView
