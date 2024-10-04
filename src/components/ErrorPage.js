import React from "react";

const ErrorPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Oops! Something went wrong.</h1>
      <p>
        Looks like we couldn't find that song. Did it get lost in the shuffle?
      </p>
      <p>
        Don’t worry, you can always get back to <a href="/">home</a>!
      </p>
    </div>
  );
};

export default ErrorPage;
