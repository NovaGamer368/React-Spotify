import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <head>
        <title>React Spotify</title>
      </head>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center fw-bold">React Spotify App</h1>
        <hr />
        <div>{children}</div>
      </div>
      <footer>
        <div>
          &copy; {new Date().getFullYear()} Brennan Phifer. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Layout;
