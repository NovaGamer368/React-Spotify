import { useEffect, useState } from "react";
import TopTracks from "./Top-Tracks";

const LandingPage = () => {
  const [token, setToken] = useState("");
  const loginUrl = `${process.env.REACT_APP_AUTH_ENDPOINT}?client_id=${
    process.env.REACT_APP_CLIENT_ID
  }&redirect_uri=${encodeURIComponent(
    process.env.REACT_APP_REDIRECT_URI
  )}&scope=${process.env.REACT_APP_SCOPE}&response_type=${
    process.env.REACT_APP_RESPONSE_TYPE
  }`;

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  return (
    <>
      {!token ? (
        <a href={loginUrl} onClick={console.log(loginUrl)}>
          Login with Spotify
        </a>
      ) : (
        <TopTracks token={token} />
      )}
    </>
  );
};

export default LandingPage;
