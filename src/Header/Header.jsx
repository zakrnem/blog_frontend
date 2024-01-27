import styles from "./Header.module.css";

function Header() {
  const loggedIn = false;
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src="/laptop-svgrepo-com.svg" />
        <div className={styles.title}>Zakrnem's Tech Blog</div>
      </div>
      <div className={styles.links}>
        <button>Home</button>
        {loggedIn && (
          <>
            <button>Your comments</button>
            <button>Your account</button>
            <button>Sign out</button>
          </>
        )}
        {!loggedIn && (
          <>
            <button>Sign up</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
