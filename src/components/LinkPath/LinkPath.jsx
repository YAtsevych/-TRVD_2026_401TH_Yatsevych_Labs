import { NavLink, useParams } from 'react-router-dom'
import styles from './style.module.css'
import React from 'react'

function splitByUppercase(text) {
  // Сначала ищем в начале последовательность: буква + цифра(ы), например "A1" или "B12"
  const match = text.match(/^([A-Z]\d+)(.*)$/)
  if (match) {
    const [, prefix, rest] = match
    // rest разбиваем по заглавным буквам
    const parts = rest.split(/(?=[A-Z])/)
    return [prefix, ...parts]
  }
  // Если не совпало — обычный разбор по заглавным буквам
  return text.split(/(?=[A-Z])/)
}

const generatePathArray = (params) => {
  const entries = Object.entries(params)
  let fullPath = ''
  return entries.map(([key, value]) => {
    const parts = splitByUppercase(value)
    fullPath += `/${value}`
    return {
      title: parts.join(' '), // Масив → рядок
      path: fullPath,
    }
  })
}

const LinkPath = () => {
  const params = useParams()
  const pathArray = generatePathArray(params)

  return (
    <div className={styles.path}>
      {pathArray.map((link, index) => (
        <div key={index} className={styles.link}>
          <NavLink to={link.path} className={styles.pathlink}>
            {link.title}
          </NavLink>
          {index < pathArray.length - 1 && <span>{' > '}</span>}
        </div>
      ))}
    </div>
  )
}

export default LinkPath
