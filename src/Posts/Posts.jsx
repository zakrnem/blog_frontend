import { useState, useEffect } from "react";
import styles from "./Posts.module.css";
import { v4 as uuidv4 } from 'uuid';

function Posts(page) {
  const [blogData, setblogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error !== null) console.log(error);
  }, [error]);

  useEffect(() => {
    const apiURL = import.meta.env.VITE_API_URL + "/posts/page/" + page.page;
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
  }, [page]);


  return (
    <div className={styles.posts}>
      {loading && blogData.length < 1 && (
        <div className={styles.loading}>
          <div className={styles.loader} />
          Loading
        </div>
      )}
      <h2>Posts</h2>
      {Object.keys(blogData).map((index) => {
        const key = uuidv4()
        const title = blogData[index].title;
        const summary = blogData[index].summary;
        const date = blogData[index].date;
        const visible = blogData[index].visible;
        const commentsNumber = blogData[index].commentsNumber;
        const url = blogData[index].url;
        return (
          <div key={key}>
            {visible && (
              <div className={styles.post}>
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
          </ div>
        );
      })}
    </div>
  );
}

export default Posts;
