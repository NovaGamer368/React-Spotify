import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <head>
        <title>React Spotify App</title>
      </head>
      <body class="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="container mt-5">
          <div>{children}</div>
        </div>
        <footer className="sticky-bottom bg-primary text-white text-center p-3 mt-auto">
          <div>
            &copy; {new Date().getFullYear()} Brennan Phifer. All rights
            reserved.
          </div>
        </footer>
      </body>
    </>
  );
};

export default Layout;
