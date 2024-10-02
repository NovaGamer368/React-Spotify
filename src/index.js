import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import "./styles/bootstrap.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import LandingPage from "./components/LandingPage";
import Layout from "./components/Containers/Layout";
import Callback from "./components/Callback";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        {/* <Nav /> */}
        <LandingPage />
      </Layout>
    ),
  },
  {
    path: "/callback",
    element: <Callback />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
