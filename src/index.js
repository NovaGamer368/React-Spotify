import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import "./styles/bootstrap.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import LandingPage from "./components/LandingPage";
import Layout from "./components/Containers/Layout";
import Callback from "./components/Callback";
import Playlists from "./components/Spotify/Playlists";
import UserProfile from "./components/Spotify/UserProfile";

const App = () => {
  const [expiresIn, setExpiresIn] = useState(3600);
  const [token] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    const checkTokenExpiration = () => {
      const expirationTime =
        parseInt(window.localStorage.getItem("login_time")) +
        parseInt(expiresIn);
      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime >= expirationTime) {
        window.localStorage.removeItem("token");
        alert("Your session has expired. Please log in again.");
        window.location.href = "/";
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
          {token ? <Playlists token={token} /> : <div>Loading...</div>}
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
