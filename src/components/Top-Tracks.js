import axios from "axios";
import { useEffect, useState } from "react";

function TopTracks({ token }) {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const { data } = await axios.get(
          "https://api.spotify.com/v1/me/top/tracks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTracks(data.items);
      } catch (error) {
        console.error("Error fetching top tracks", error);
      }
    };

    if (token) {
      fetchTopTracks();
    }
  }, [token]);

  return (
    <div>
      <h2>My Top Tracks</h2>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            {track.name} by{" "}
            {track.artists.map((artist) => artist.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopTracks;
