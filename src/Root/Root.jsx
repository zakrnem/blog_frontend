import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "../error-page";
import Homepage from "../Homepage/Homepage";
import Post from "../Post/Post";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";
import Header from "../Header/Header";
import User from "../User/User";

function Root() {
  const [postURL, setPostURL] = useState("");
  const [activeElement, setActiveElement] = useState("");
  const [page, setPage] = useState(1);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState([]);

  const isAuthURL = import.meta.env.VITE_API_URL + "/is_auth";
  useEffect(() => {
    fetch(isAuthURL, { method: "get", credentials: "include" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`,
          );
        }
        return response.json();
      })
      .then((response) => setAuth(response))
      .catch((err) => {
        setError(err.message);
      });
  });

  const getUserURL = import.meta.env.VITE_API_URL + "/user";
  useEffect(() => {
    if (auth) {
      fetch(getUserURL, { method: "get", credentials: "include" })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`,
            );
          }
          return response.json();
        })
        .then((response) => setUser(response))
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [auth]);

  return (
    <>
      <Header
        activeElement={activeElement}
        setActiveElement={setActiveElement}
        setPage={setPage}
        auth={auth}
        setAuth={setAuth}
        user={user}
      />
      <Outlet />

      <Routes errorElement={<ErrorPage />}>
        <Route
          path=""
          element={
            <Homepage
              setActiveElement={setActiveElement}
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
          element={
            <LoginForm setActiveElement={setActiveElement} />
          }
        />
        <Route path="/post" element={<Post postURL={postURL} auth={auth} />} />
        <Route path="/user" element={<User setActiveElement={setActiveElement} auth={auth} user={user} />} />
      </Routes>
    </>
  );
}

export default Root;
