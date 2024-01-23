import styles from "./Homepage.module.css";
import Posts from "../Posts/Posts";

function Homepage() {
  return (
    <div className={styles.homepage}>
      <h1>Homepage</h1>
      <Posts />
    </div>
  );
}

export default Homepage;
