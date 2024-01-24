import Homepage from "../Homepage/Homepage";
import Post from "../Post/Post";
import CommentForm from "../CommentForm/CommentForm";

function Root() {
  const apiURL =
    "http://localhost:3000/api/client/posts/65a67b1e62e3bbd681d2d36d";
  return (
    <div>
      <h1>Root</h1>
      <CommentForm apiURL={apiURL} />
      {/* <Post apiURL={apiURL} /> */}
      {/* <Homepage /> */}
    </div>
  );
}

export default Root;
