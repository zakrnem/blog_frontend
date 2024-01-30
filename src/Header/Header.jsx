import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Header({ activeElement, setActiveElement, setPage }) {
  const loggedIn = false;
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src="/laptop-svgrepo-com.svg" />
        <div className={styles.title}>Zakrnem's Tech Blog</div>
      </div>
      <div className={styles.links}>
        <Link
          to="home"
          className={activeElement === "home" ? styles.active : ""}
          onClick={() => {
            setActiveElement("home")
            setPage(1)
          }}
        >
          Home
        </Link>
        {loggedIn && (
          <>
            <Link>Your comments</Link>
            <Link>Your account</Link>
            <Link>Sign out</Link>
          </>
        )}
        {!loggedIn && (
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
