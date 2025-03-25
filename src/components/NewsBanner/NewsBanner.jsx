import { formatTime } from '../../helpers/formatTimeAgo'
import Image from '../Image/Image'
import styles from './style.module.css'
const NewsBanner = ({ item }) => {
  return (
    <div className={styles.banner}>
      <Image image={item?.image}></Image>
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.extra}>
        {formatTime(item.published)} by {item.author}
      </p>
    </div>
  )
}
export default NewsBanner
