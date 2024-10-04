import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <title>React Spotify App</title>
      </div>
      <div className="d-flex flex-column min-vh-100 app-min-width">
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
      </div>
    </>
  );
};

export default Layout;
