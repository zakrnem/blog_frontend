import { useEffect } from "react";
import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";

function LoginForm({ setActiveElement }) {
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL + "/login"
  useEffect(() => {
    setActiveElement("login");
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.querySelector("#username").value;
    const password = e.target.querySelector("#password").value;
    const data = {username, password}
    fetch(apiURL, { 
      method: "post",
      credentials: "include",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .finally(() => {
      navigate("/home");
    });
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
