import { useState, useEffect } from "react";
import styles from "./Post.module.css";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import CommentForm from "../CommentForm/CommentForm";

function Post({ postURL, auth }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({});
  const [commentForm, setCommentForm] = useState(false);
  const handleAddComm = () => {
    setCommentForm(!commentForm);
  };

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
  let date;
  let comments;
  const dataLength = Object.keys(postData).length;
  if (dataLength > 0) {
    date = postData.createdAt
    comments = postData.comments;
  }

  return (
    <div className={styles.post}>
      {loading && dataLength < 1 && (
        <div className={styles.loading}>
          <div className={styles.loader} />
          Loading
        </div>
      )}
      {dataLength > 0 && (
        <>
          <div className={styles.title}>{title}</div>
          <div className={styles.footer}>
            <img
              src="./user-check-svgrepo-com.svg"
              className={styles.thumbnail}
            />
            <div className={styles.info}>
              <div className={styles.author}>{author}</div>
              <div className={styles.date}>{date}</div>
            </div>
          </div>
          <div className={styles.content}>{content}</div>
          <div className={styles.comments}>
            <div className="section-title">Comments:</div>
            {comments &&
              Object.keys(comments).map((index) => {
                const commentAuthor = comments[index].author;
                const commentMessage = comments[index].message;
                const commentDate = comments[index].createdAt
                const key = uuidv4();
                return (
                  <div className={styles.comment} key={key}>
                    <div className={styles.commentAuthor}>{commentAuthor}</div>
                    <div className={styles.commentMessage}>
                      {commentMessage}
                    </div>
                    <div className={styles.commentDate}>{commentDate}</div>
                  </div>
                );
              })}
          </div>
          {auth && !commentForm && (
            <button className={styles.addComment} onClick={handleAddComm}>
              Add a comment
            </button>
          )}
          {auth && commentForm && (
            <CommentForm postURL={postURL} setCommentForm={setCommentForm} />
          )}
        </>
      )}
    </div>
  );
}

export default Post;
