import { useEffect, useState } from "react";
import TopTracks from "./Spotify/Top-Tracks";
import UserProfile from "./Spotify/UserProfile";
import Playlists from "./Spotify/Playlists";
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
    // const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    // if (!token && hash) {
    //   console.log("token");
    //   token = hash
    //     .substring(1)
    //     .split("&")
    //     .find((elem) => elem.startsWith("access_token"))
    //     .split("=")[1];
    //   window.location.hash = "";
    //   window.localStorage.setItem("token", token);
    // }

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
          <UserProfile token={token} />
          <Playlists token={token} />
        </>
      )}
    </>
  );
};

export default LandingPage;
