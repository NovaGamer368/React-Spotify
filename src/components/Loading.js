import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loading = ({ setToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (setToken) {
      const token = window.localStorage.getItem("token");
      setToken(token);
      if (token === null) {
        navigate("/");
      }
    }
  }, []);
  return (
    <div className="d-flex flex-row justify-content-center align-items-center vh-75">
      <div className="spinner-border mx-3 my-auto" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <h4 className="text-center mt-3">Loading...</h4>
    </div>
  );
};

export default Loading;
