import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "../error-page";
import Homepage from "../Homepage/Homepage";
import Post from "../Post/Post";
import CommentForm from "../CommentForm/CommentForm";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";
import Header from "../Header/Header";

function Root() {
  const [apiURL, setApiURL] = useState(
    "http://localhost:3000/api/client/posts/65a67b1e62e3bbd681d2d36d",
  );
  const [postURL, setPostURL] = useState("");
  const [activeElement, setActiveElement] = useState("");
  const [page, setPage] = useState(1);
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    console.log(auth)
  }, [auth])
  /* 
 useEffect(() => {
    console.log(activeElement);
  }, [activeElement]); */
  return (
    <>
      <Header
        activeElement={activeElement}
        setActiveElement={setActiveElement}
        setPage={setPage}
        auth={auth}
      />
      <Outlet />

      <Routes errorElement={<ErrorPage />}>
        <Route
          path=""
          element={
            <Homepage
              setActiveElement={setActiveElement}
              setApiURL={setApiURL}
              setPostURL={setPostURL}
              page={page}
              setPage={setPage}
            />
          }
        />
        <Route
          path="/home"
          element={
            <Homepage
              setActiveElement={setActiveElement}
              setApiURL={setApiURL}
              setPostURL={setPostURL}
              page={page}
              setPage={setPage}
            />
          }
        />
        <Route
          path="/signup"
          element={<SignupForm setActiveElement={setActiveElement} />}
        />
        <Route
          path="/login"
          element={<LoginForm setActiveElement={setActiveElement} setAuth={setAuth} />}
        />
        <Route path="/post" element={<Post postURL={postURL} />} />
      </Routes>
    </>
  );
}

export default Root;
