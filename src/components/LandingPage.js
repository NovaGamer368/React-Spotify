import { useEffect, useState } from "react";
import TopTracks from "./Spotify/TopTracks";
import CurrentlyPlaying from "./Spotify/CurrentlyPlaying";

const LandingPage = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    let token = window.localStorage.getItem("token");
    setToken(token);
  }, []);
  const login = () => {
    const loginUrl = `${
      process.env.REACT_APP_AUTH_ENDPOINT
    }?redirect_uri=${encodeURIComponent(
      process.env.REACT_APP_REDIRECT_URI
    )}&scope=${encodeURIComponent(process.env.REACT_APP_SCOPE)}&response_type=${
      process.env.REACT_APP_RESPONSE_TYPE
    }&show_dialog=true&client_id=${process.env.REACT_APP_CLIENT_ID}`;
    window.location.href = loginUrl;
  };

  return (
    <>
      {!token ? (
        <div className="text-center">
          <h4 className="mb-4">
            A small React.js project that connects to the Spotify API where you
            can log in with your Spotify account to see what you are currently
            listening to, your top songs, and your playlists.
          </h4>
          <button className="btn btn-primary btn-lg" onClick={login}>
            Login with Spotify
          </button>
        </div>
      ) : (
        <div className="d-flex flex-row flex-wrap">
          <div className="col-12 col-lg-6 px-4 d-flex justify-content-center align-items-center mb-4">
            <CurrentlyPlaying token={token} />
          </div>
          <div className="col-12 col-lg-6 overflow-container">
            <TopTracks token={token} />
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
