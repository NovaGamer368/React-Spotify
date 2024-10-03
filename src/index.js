import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import "./styles/bootstrap.css";

import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import LandingPage from "./components/LandingPage";
import Layout from "./components/Containers/Layout";
import Callback from "./components/Callback";

const App = () => {
  const [expiresIn, setExpiresIn] = useState(3600);

  useEffect(() => {
    if (expiresIn) {
      const tokenExpiryTimeout = setTimeout(() => {
        window.localStorage.removeItem("token");
        alert("Your session has expired. Please log in again.");
        window.location.href = "/";
      }, expiresIn * 1000);

      return () => clearTimeout(tokenExpiryTimeout);
    }
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
      element: <Layout>{/* <UserProfile token={token} /> */}</Layout>,
    },
    {
      path: "/callback",
      element: <Callback expiresIn={setExpiresIn} />,
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
