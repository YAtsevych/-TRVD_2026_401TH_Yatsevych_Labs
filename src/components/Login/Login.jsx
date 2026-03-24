import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./style.module.css";
import { LoginFunction } from "./LoginFunc";
import React from "react";
const Login = (params) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await LoginFunction(email, password);

      console.log(data);
      setMessage(data.message + " " + data.userId);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className={styles.registrationContainer}>
      <div className={styles.formContainer}>
        <Link to="/">
          <div className={styles.logo}></div>
        </Link>
        <h1 className={styles.RegTitle}>Welcome Back</h1>
        <p className={styles.RegDescription}>
          Log in to your British Council account to continue your learning
          journey
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
              setEmail(e.target.value);
              setMessage("");
              setError("");
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
              setPassword(e.target.value);
              setMessage("");
              setError("");
            }}
          />

          <input type="submit" value="Log In" className={styles.formSubmit} />
          {message && (
            <p className={`${styles.formAlert} ${styles.good}`}>{message}</p>
          )}
          {error && <p className={styles.formAlert}>{error}</p>}
        </form>
        <p className={styles.RegDescription}>
          Don't have an account? Create one
          <Link to="/registration"> here</Link>?
        </p>
      </div>
    </div>
  );
};

export default Login;
