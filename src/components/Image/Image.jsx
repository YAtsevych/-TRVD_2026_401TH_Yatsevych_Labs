import styles from './style.module.css'
const Image = ({ image }) => {
  return (
    <div className={styles.wrapper}>
      {image ? <img src={image} className={styles.image}></img> : null}
    </div>
  )
}
export default Image
