import { v4 as uuidv4 } from "uuid";
import styles from "./User.module.css";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function User({ setActiveElement, auth, user, setPostURL }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [notEmptyData, setNotEmptyData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setActiveElement("user");
  });

  useEffect(() => {
    if (user.length !== 0) {
      const apiURL = import.meta.env.VITE_API_URL + "/user/" + user.userId;
      fetch(apiURL, { method: "get" })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`,
            );
          }
          return response.json();
        })
        .then((actualData) => {
          setUserData(actualData);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
          setNotEmptyData(true);
        });
    }
  }, [user]);

  useEffect(() => {
    if (!auth) navigate("/home");
  }, [auth]);

  const handleClick = (postId) => {
    setPostURL(import.meta.env.VITE_API_URL + "/posts/" + postId);
  };

  return (
    <div className={styles.container}>
      {loading && !notEmptyData && (
        <div className={styles.loading}>
          <div className={styles.loader} />
          Loading
        </div>
      )}
      {notEmptyData && (
        <>
          <div className={styles.title}>Comments by {user.fullname}</div>
          <div className={styles.separator}></div>
          <div className={styles.commentContainer}>
            {userData.map((comment) => {
              const key = uuidv4();
              return (
                <div key={key} className={styles.comment}>
                  <Link
                    to="/post"
                    className={styles.postTitle}
                    onClick={() => handleClick(comment.post._id)}
                  >
                    {comment.post.title}
                  </Link>
                  <div className={styles.date}>{comment.createdAt}</div>
                  <div className={styles.commentText}>{comment.message}</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default User;
