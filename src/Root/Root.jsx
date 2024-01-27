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
  const [activeElement, setActiveElement] = useState("");
  useEffect(() => {
    console.log(activeElement);
  }, [activeElement]);
  return (
    <>
      <Header
        activeElement={activeElement}
        setActiveElement={setActiveElement}
      />
      <Outlet />

      <Routes errorElement={<ErrorPage />}>
        <Route
          path=""
          element={
            <Homepage apiURL={apiURL} setActiveElement={setActiveElement} />
          }
        />
        <Route
          path="/home"
          element={
            <Homepage apiURL={apiURL} setActiveElement={setActiveElement} />
          }
        />
        <Route
          path="/signup"
          element={<SignupForm setActiveElement={setActiveElement} />}
        />
        <Route
          path="/login"
          element={<LoginForm setActiveElement={setActiveElement} />}
        />
      </Routes>
    </>
  );
}

export default Root;
