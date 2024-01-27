import Homepage from "../Homepage/Homepage";
import Post from "../Post/Post";
import CommentForm from "../CommentForm/CommentForm";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";
import Header from "../Header/Header";

function Root() {
  const apiURL =
    "http://localhost:3000/api/client/posts/65a67b1e62e3bbd681d2d36d";
  return (
    <>
      <Header />
      <h1>Root</h1>

      {/* < SignupForm /> */}
      {/*       <LoginForm /> */}
      {/* <CommentForm apiURL={apiURL} /> */}
      {/* <Post apiURL={apiURL} /> */}
      {/* <Homepage /> */}
    </>
  );
}

export default Root;
