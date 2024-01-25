import styles from "./CommentForm.module.css";

function CommentForm(apiURL) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const userComment = e.target.querySelector("#message").value;
    // Fetch logic not working
    fetch(apiURL.apiURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userComment),
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  };
  return (
    <>
      <div className={styles.title}>Submit a comment</div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="message">Message: </label>
        <textarea id="message" rows="5" cols="40"></textarea>
        <input type="submit" />
      </form>
    </>
  );
}

export default CommentForm;
