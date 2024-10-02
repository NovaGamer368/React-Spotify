import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <head>
        <title>React Spotify</title>
      </head>
      <h1>React Spotify App</h1>
      <div>{children}</div>
      <footer>
        <div className="App">
          &copy; {new Date().getFullYear()} Brennan Phifer. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Layout;
