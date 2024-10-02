import React, { useEffect } from "react";

const Callback = () => {
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      console.log("token");
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
      window.location.href = "/";
    }
  }, []);
  return <h1 className="flex align-self-center text-center">Loading...</h1>;
};

export default Callback;
