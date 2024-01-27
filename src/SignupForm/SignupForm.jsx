import { useEffect } from "react";
import styles from "./SignupForm.module.css";

function SignupForm({ setActiveElement }) {
  useEffect(() => {
    setActiveElement("signup");
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const firstName = e.target.querySelector("#firstName").value;
    const lastName = e.target.querySelector("#lastName").value;
    const username = e.target.querySelector("#username").value;
    const password = e.target.querySelector("#password").value;
    console.log({ firstName, lastName, username, password });
    // Add fetch logic
  };
  return (
    <div className={styles.signup}>
      <div className={styles.title}>Create an account</div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name: </label>
          <input type="text" id="lastName" placeholder="Enter your last name" />
        </div>
        <div>
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" placeholder="Enter your username" />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <input className={styles.submit} type="submit" />
      </form>
    </div>
  );
}

export default SignupForm;
