import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Header({ activeElement, setActiveElement, setPage, auth }) {
  const navigate = useNavigate();
  const handleSignout = () => {
    e.preventDefault()
    const apiURL = import.meta.env.VITE_API_URL + "/logout"
    fetch(apiURL, { 
      method: "post"
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      setAuth(false)
      return response.json();
    })
    .finally(() => {
      navigate("/home");
    });
  }
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <a href="https://github.com/zakrnem/"><img src="/laptop-svgrepo-com.svg" /></a>
        <div className={styles.title}>Zakrnem's Tech Blog</div>
      </div>
      <div className={styles.links}>
        <Link
          to="home"
          className={activeElement === "home" ? styles.active : ""}
          onClick={() => {
            setActiveElement("home");
            setPage(1);
          }}
        >
          Home
        </Link>
        {auth && (
          <>
            <Link>Your comments</Link>
            <Link>Your account</Link>
            <Link to="#" onClick={handleSignout}>Sign out</Link>
          </>
        )}
        {!auth && (
          <>
            <Link
              to="login"
              className={activeElement === "login" ? styles.active : ""}
              onClick={() => setActiveElement("login")}
            >
              Log in
            </Link>
            <Link
              to="signup"
              className={activeElement === "signup" ? styles.active : ""}
              onClick={() => setActiveElement("signup")}
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
