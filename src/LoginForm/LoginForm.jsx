import { useEffect } from "react";
import styles from "./LoginForm.module.css";

function LoginForm({ setActiveElement }) {
  useEffect(() => {
    setActiveElement("login");
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.querySelector("#username").value;
    const password = e.target.querySelector("#password").value;
    console.log([username, password]);
    // Add fetch logic
  };
  return (
    <div className={styles.login}>
      <div className={styles.title}>Log in to your account</div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" placeholder="Enter your username" />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <input className={styles.submit} type="submit" />
      </form>
    </div>
  );
}

export default LoginForm;
