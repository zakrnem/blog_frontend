import { useState, useEffect } from "react";
import styles from "./Homepage.module.css";
import Posts from "../Posts/Posts";

function Homepage({ setActiveElement, setPostURL, page, setPage }) {
  useEffect(() => {
    setActiveElement("home");
  }, []);
  

  return (
    <div className={styles.homepage}>
      <Posts
        page={page}
        setPage={setPage}
        setPostURL={setPostURL}
        setActiveElement={setActiveElement}
      />

      {/* <CommentForm apiURL={apiURL} /> */}
    </div>
  );
}

export default Homepage;
