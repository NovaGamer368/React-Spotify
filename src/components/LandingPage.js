import { useEffect, useState } from "react";
import TopTracks from "./Spotify/Top-Tracks";
import CurrentlyPlaying from "./Spotify/CurrentlyPlaying";

const LandingPage = () => {
  const [token, setToken] = useState("");
  const loginUrl = `${process.env.REACT_APP_AUTH_ENDPOINT}?client_id=${
    process.env.REACT_APP_CLIENT_ID
  }&redirect_uri=${encodeURIComponent(
    process.env.REACT_APP_REDIRECT_URI
  )}&scope=${encodeURIComponent(process.env.REACT_APP_SCOPE)}&response_type=${
    process.env.REACT_APP_RESPONSE_TYPE
  }&show_dialog=true`;

  useEffect(() => {
    let token = window.localStorage.getItem("token");
    setToken(token);
  }, []);

  return (
    <>
      {!token ? (
        <div className="text-center">
          <a className="btn btn-primary btn-lg" href={loginUrl}>
            Login with Spotify
          </a>
        </div>
      ) : (
        <>
          <CurrentlyPlaying token={token} />
          <TopTracks token={token} />
        </>
      )}
    </>
  );
};

export default LandingPage;
