import { NavLink, useParams } from 'react-router-dom'
import styles from './style.module.css'

const generatePathArray = (params) => {
  const entries = Object.entries(params)
  let fullPath = ''
  return entries.map(([key, value]) => {
    fullPath += `/${value}`
    return {
      title: value,
      path: fullPath,
    }
  })
}

const LinkPath = (params) => {
  const pathArray = generatePathArray(params)

  return (
    <div className={styles.path}>
      {pathArray.map((link, index) => (
        <div>
          <NavLink key={index} to={link.path} className={styles.pathLink}>
            {link.title}
          </NavLink>
          <span>{' > '}</span>
        </div>
      ))}
    </div>
  )
}

export default LinkPath
