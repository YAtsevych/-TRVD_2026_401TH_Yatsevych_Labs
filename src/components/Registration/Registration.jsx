import { Link } from 'react-router-dom'
import { useState } from 'react'
import styles from './style.module.css'
import { Register } from './RegistrotionFunc'

const Registration = (params) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await Register(email, password)
      console.log(data)
      setMessage(data.message + ' ' + data.userId)
    } catch (err) {
      setError(err.message)
    }
  }
  return (
    <div className={styles.registrationContainer}>
      <div className={styles.formContainer}>
        <div className={styles.logo}></div>
        <h1 className={styles.RegTitle}>Register for an account</h1>
        <p className={styles.RegDescription}>
          You need a British Council account to access our services. If you
          already have an account you can sign in.
        </p>

        <form className={styles.formRegLog} onSubmit={handleSubmit}>
          <label htmlFor="email" className={styles.formlabel}>
            Email
          </label>

          <input
            type="text"
            required
            value={email}
            className={styles.formInput}
            onChange={(e) => {
              setEmail(e.target.value)
              setMessage('')
              setError('')
            }}
          />

          <label htmlFor="password" className={styles.formlabel}>
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            className={styles.formInput}
            onChange={(e) => {
              setPassword(e.target.value)
              setMessage('')
              setError('')
            }}
          />

          <input
            type="submit"
            value="Register for an account"
            className={styles.formSubmit}
          />
          {message && (
            <p className={`${styles.formAlert} ${styles.good}`}>{message}</p>
          )}
          {error && <p className={styles.formAlert}>{error}</p>}
        </form>
        <p className={styles.RegDescription}>
          If you’re not ready, you can <Link to="/">go back</Link>.
        </p>
      </div>
    </div>
  )
}

export default Registration
