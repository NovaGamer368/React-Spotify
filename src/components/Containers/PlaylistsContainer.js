import React from "react";
import CurrentlyPlaying from "../Spotify/CurrentlyPlaying";
import Playlists from "../Spotify/Playlists";

const PlaylistsContainer = ({ token }) => {
  return (
    <div className="d-flex flex-row flex-wrap">
      <div className="col-12 col-lg-6 px-4 d-flex justify-content-center align-items-center mb-4">
        <CurrentlyPlaying token={token} />
      </div>
      <div className="col-12 col-lg-6 overflow-container">
        <Playlists token={token} />
      </div>
    </div>
  );
};

export default PlaylistsContainer;
