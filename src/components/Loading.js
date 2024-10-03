import React, { useEffect } from "react";

const Loading = ({ setToken }) => {
  useEffect(() => {
    if (setToken) {
      const token = window.localStorage.getItem("token");
      setToken(token);
    }
  }, []);
  return <h4 className="text-center">Loading...</h4>;
};

export default Loading;
