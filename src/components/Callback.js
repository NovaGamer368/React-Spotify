import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = ({ expiresIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get("access_token");
      const expiresInValue = params.get("expires_in");

      if (accessToken && expiresInValue) {
        window.localStorage.setItem("token", accessToken);
        const loginTime = Math.floor(Date.now() / 1000);
        window.localStorage.setItem("login_time", loginTime);
        expiresIn(expiresInValue);
        navigate("/");
      }
    }
  }, [expiresIn, navigate]);

  return <div>Loading...</div>;
};

export default Callback;
