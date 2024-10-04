import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="text-center p-2">
      <h1>Oops! Something went wrong.</h1>
      <p>
        Looks like we couldn't find that song. Did it get lost in the shuffle?
      </p>
      <p>
        Don’t worry, you can always get back to <Link to="/">home</Link>!
      </p>
    </div>
  );
};

export default ErrorPage;
