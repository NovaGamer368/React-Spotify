import React from "react";

const Layout = ({ children }) => {
  return (
    <html>
      <head>
        <title>React Spotify</title>
      </head>
      <body>
        <div>{children}</div>
      </body>
      <footer>
        <div className="App">
          &copy; {new Date().getFullYear()} Brennan Phifer. All rights reserved.
        </div>
      </footer>
    </html>
  );
};

export default Layout;
