import { useState, useEffect } from "react";
import styles from "./Posts.module.css";

function Posts(page) {
  const apiURL = import.meta.env.VITE_API_URL + "/posts";
  const [blogData, setblogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(apiURL, { method: "get" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`,
          );
        }
        return response.json();
      })
      .then((actualData) => setblogData(actualData))
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.posts}>
      {loading && blogData.length < 1 && (
        <div className={styles.loading}>
          <div className={styles.loader} />
          Loading
        </div>
      )}
      <h2>Posts</h2>
      {Object.keys(blogData).map((key) => {
        const title = blogData[key].title;
        const summary = blogData[key].summary;
        const date = blogData[key].date;
        const visible = blogData[key].visible;
        const commentsNumber = blogData[key].commentsNumber;
        const url = blogData[key].url;
        return (
          <>
            {visible && (
              <div key={key} className={styles.post}>
                <a href={url}>
                  <div className={styles.title}>{title}</div>
                </a>
                <div className={styles.summary}>{summary}</div>
                <div className={styles.date}>Date: {date}</div>
                <div className={styles.comments}>
                  Comments: {commentsNumber}
                </div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}

export default Posts;
