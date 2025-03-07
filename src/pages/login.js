import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN_REQUEST } from "../constants/actions";
import styles from "../styles/Login.module.css";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: LOGIN_REQUEST, payload: credentials });
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              required
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
