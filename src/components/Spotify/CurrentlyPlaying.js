import { useState, useEffect } from "react";

const CurrentlyPlaying = ({ token }) => {
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 204) {
        setCurrentTrack(null);
      } else {
        const data = await response.json();
        setCurrentTrack(data);
      }
    };

    fetchCurrentTrack();
  }, [token]);

  return (
    <div>
      <h2>Currently Playing</h2>
      {currentTrack ? (
        <div>
          <img
            src={currentTrack.item.album.images[0]?.url}
            alt={currentTrack.item.name}
            style={{ width: "50px", height: "50px" }}
          />
          <p>
            {currentTrack.item.name} - {currentTrack.item.artists[0].name}
          </p>
        </div>
      ) : (
        <p>No track is currently playing.</p>
      )}
    </div>
  );
};

export default CurrentlyPlaying;
