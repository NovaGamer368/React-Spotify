import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import LandingPage from "./components/LandingPage";
import Layout from "./components/Containers/Layout";

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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
