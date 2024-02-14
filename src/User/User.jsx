import { v4 as uuidv4 } from "uuid";
import styles from "./User.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function User({ auth, user }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([])
  const [notEmptyData, setNotEmptyData] = useState(false)

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
        setUserData(actualData)
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setNotEmptyData(true)
      })
    }      
  }, [user])

  useEffect(() => {
    if (!auth) navigate("/home")
  }, [auth])

    return (
      <div className={styles.container}>
        <div className={styles.title}>Comments by {user.fullname}</div>
        <div className={styles.separator}></div>
        <div className={styles.commentContainer}>
        { notEmptyData && userData.map((comment) => {
            const key = uuidv4();
            return (
            <div key={key} className={styles.comment}>
              <p className={styles.date}>{comment.createdAt}</p>
              <p className={styles.post}>{comment.post}</p>
              <p>{comment.message}</p>
              </div>
              )
          })}
        </div>
      </ div>
    );
}

export default User;
