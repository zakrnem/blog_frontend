import styles from "./CommentForm.module.css";
import { useNavigate } from "react-router-dom";

function CommentForm({ postURL, setCommentForm }) {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const userComment = e.target.parentElement.querySelector("#message").value
    const message = { "message": userComment}
    fetch(postURL, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).catch((error) => {
      console.error('Error:', error);
   }).finally(() => {
    setCommentForm(false)
   });
  };
  return (
    <>
      <div className="section-title">Submit a comment</div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea id="message" rows="5" cols="40" className={styles.textarea}></textarea>
        <button className={styles.submit} onClick={handleSubmit}>Post comment</button>
      </form>
    </>
  );
}

export default CommentForm;
