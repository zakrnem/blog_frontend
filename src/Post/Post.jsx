import { useState, useEffect } from "react";
import styles from "./Post.module.css";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function Post({ postURL }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({});

  useEffect(() => {
    if (error !== null) console.log(error);
  }, [error]);

  useEffect(() => {
    if (!postURL) {
      navigate("/home");
    } else {
      fetch(postURL, { method: "get" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`,
          );
        }
        return response.json();
      })
      .then((actualData) => setPostData(actualData))
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
    }
  }, [postURL]);

  const author = postData.author;
  const title = postData.title;
  const content = postData.content;
  const dbDate = postData.createdAt;
  let parsedDate;
  let date;
  let comments;
  const dataLength = Object.keys(postData).length;
  if (dataLength > 0) {
    parsedDate = new Date(dbDate);
    date = format(parsedDate, "MM-dd-yyyy");
    comments = postData.comments;
  }

  return (
    <>
      {loading && dataLength < 1 && (
        <div className={styles.loading}>
          <div className={styles.loader} />
          Loading
        </div>
      )}
      {dataLength > 0 && (
        <>
          <div className={styles.title}>{title}</div>
          <div className={styles.author}>Author: {author}</div>
          <div className={styles.date}>Date: {date}</div>
          <div className={styles.content}>{content}</div>
        </>
      )}
      {comments &&
        Object.keys(comments).map((index) => {
          const commentAuthor = comments[index].author;
          const commentMessage = comments[index].message;
          const commentDate = comments[index].createdAt;
          const key = uuidv4();
          return (
            <div key={key}>
              <div className={styles.commentAuthor}>{commentAuthor}</div>
              <div className={styles.commentMessage}>{commentMessage}</div>
              <div className={styles.commentDate}>{commentDate}</div>
            </div>
          );
        })}
    </>
  );
}

export default Post;
