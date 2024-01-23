import { useState, useEffect } from "react";
import styles from "./Homepage.module.css";
import Posts from "../Posts/Posts";

function Homepage() {
  const [page, setPage] = useState(1)
  const handleNextPage = () => {
    let count = page + 1
    setPage(count)
  }

  return (
    <div className={styles.homepage}>
      <h1>Homepage</h1>
      <Posts page={page} />
      <button className={styles.next_page} onClick={handleNextPage}>Older posts</ button>
    </div>
  );
}

export default Homepage;
