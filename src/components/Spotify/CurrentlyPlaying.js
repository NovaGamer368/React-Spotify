import { useState, useEffect } from "react";

const CurrentlyPlaying = ({ token }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [progress, setProgress] = useState(0);

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
        setProgress(data.progress_ms);
      }
    };

    fetchCurrentTrack();
    const interval = setInterval(fetchCurrentTrack, 10000);
    return () => clearInterval(interval);
  }, [token]);

  const calculateProgress = () => {
    if (currentTrack) {
      const duration = currentTrack.item.duration_ms; // Total track duration
      return (progress / duration) * 100; // Calculate percentage
    }
    return 0;
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h3 className="my-4 text-center text-decoration-underline">
        Currently Playing
      </h3>
      {currentTrack ? (
        <div className="d-flex flex-column w-100">
          <div className="w-100 d-flex justify-content-around ">
            <img
              src={currentTrack.item.album.images[0]?.url}
              alt={currentTrack.item.name}
              className="img-fluid mb-3"
              style={{ width: "100px", height: "100px" }}
            />
            <div>
              <h5 className="mb-1">{currentTrack.item.name}</h5>
              <div className="text-center mb-2">
                {currentTrack.item.artists
                  ? currentTrack.item.artists
                      .map((artist) => artist.name)
                      .join(", ")
                  : "Unknown Artist"}
              </div>
            </div>
          </div>
          <div className="progress w-100 rounded">
            <div
              className="progress-bar rounded"
              role="progressbar"
              style={{ width: `${calculateProgress()}%` }}
              aria-valuenow={calculateProgress()}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {Math.round(calculateProgress())}%
            </div>
          </div>
        </div>
      ) : (
        <p>No track is currently playing.</p>
      )}
    </div>
  );
};

export default CurrentlyPlaying;
