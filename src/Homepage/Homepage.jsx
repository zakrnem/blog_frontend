import { useState, useEffect } from "react";
import styles from "./Homepage.module.css";
import Posts from "../Posts/Posts";

function Homepage({ setActiveElement, setPostURL }) {
  useEffect(() => {
    setActiveElement("home");
  }, []);
  const [page, setPage] = useState(1);
  const handleNextPage = () => {
    let count = page + 1;
    setPage(count);
  };

  return (
    <div className={styles.homepage}>
      <Posts
        page={page}
        setPage={setPage}
        setPostURL={setPostURL}
        setActiveElement={setActiveElement}
      />
      <button className={styles.next_page} onClick={handleNextPage}>
        Older posts
      </button>

      {/* <CommentForm apiURL={apiURL} /> */}
    </div>
  );
}

export default Homepage;
