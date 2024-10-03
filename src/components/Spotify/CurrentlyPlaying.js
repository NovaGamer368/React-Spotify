import { useState, useEffect } from "react";

const CurrentlyPlaying = ({ token }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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
        setIsPlaying(data.is_playing);
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

  const togglePlayback = async () => {
    if (isPlaying) {
      await fetch("https://api.spotify.com/v1/me/player/pause", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsPlaying(false);
    } else {
      await fetch("https://api.spotify.com/v1/me/player/play", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsPlaying(true);
    }
  };

  return (
    <div className=" w-100 d-flex flex-column align-items-center border border-primary">
      <h3 className="my-4 text-center text-decoration-underline">
        Now Playing
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
          <button
            className="btn btn-primary my-3 mx-auto rounded w-50"
            onClick={togglePlayback}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      ) : (
        <>
          <div className="text-center my-4">
            <p className="text-muted mt-2">No track is currently playing.</p>
            <p className="text-muted mt-2">
              Start playing a track on one of your signed in devices to see this
              component
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CurrentlyPlaying;
