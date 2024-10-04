import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/index.css";
import "./styles/bootstrap.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import LandingPage from "./components/LandingPage";
import Layout from "./components/Containers/Layout";
import Callback from "./components/Callback";
import UserProfile from "./components/Spotify/UserProfile";
import Loading from "./components/Loading";
import PlaylistsContainer from "./components/Containers/PlaylistsContainer";
import ErrorPage from "./components/ErrorPage";

const App = () => {
  const [expiresIn, setExpiresIn] = useState(3600);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    const checkTokenExpiration = () => {
      let loginTime = window.localStorage.getItem("login_time");
      if (loginTime) {
        const expirationTime =
          parseInt(window.localStorage.getItem("login_time")) +
          parseInt(expiresIn);
        const currentTime = Math.floor(Date.now() / 1000);

        if (currentTime >= expirationTime) {
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("login_time");
          alert("Your session has expired. Please log in again.");
          window.location.href = "/";
        }
      }
    };

    const interval = setInterval(checkTokenExpiration, 1000);

    return () => clearInterval(interval);
  }, [expiresIn]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <LandingPage />
        </Layout>
      ),
    },
    {
      path: "account",
      element: (
        <Layout>
          {" "}
          <UserProfile token={token} />{" "}
        </Layout>
      ),
    },
    {
      path: "/callback",
      element: <Callback expiresIn={setExpiresIn} />,
    },
    {
      path: "/playlists",
      element: (
        <Layout>
          {token ? (
            <PlaylistsContainer token={token} />
          ) : (
            <Loading setToken={setToken} />
          )}
        </Layout>
      ),
    },
    {
      path: "*",
      element: (
        <Layout>
          <ErrorPage />
        </Layout>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
