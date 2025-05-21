import styles from './style.module.css'
import { Link } from 'react-router-dom'
const LessonLink = ({ data }) => {
  return (
    <>
      <div className={styles.LessonLink}>
        <Link to={data.LessonLink}>
          <div
            className={styles.LessonLinkImg}
            style={{
              backgroundImage: `url(${data.LessonImgSrs})`,
            }}
          ></div>
        </Link>
        <div className={styles.LessonLinkTexts}>
          <div className={styles.LessonLinkTitle}>
            <Link key={data.idLesson} to={data.LessonLink}>
              <h3>{data.LessonTitle}</h3>
            </Link>
          </div>
          <div className={styles.LessonLinkDescription}>
            {data.LessonDescription}
          </div>
        </div>
      </div>
    </>
  )
}
export default LessonLink
