import { useState, useEffect } from "react";

const TopTracks = ({ token }) => {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      const response = await fetch(
        "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setTopTracks(data.items);
    };

    fetchTopTracks();
  }, [token]);

  return (
    <div>
      <h2>Top Tracks</h2>
      <ul>
        {topTracks.map((track) => (
          <li key={track.id}>
            <div>
              <img
                src={track.album.images[0]?.url}
                alt={track.name}
                style={{ width: "50px", height: "50px" }}
              />
              <p>
                {track.name} - {track.artists[0].name}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopTracks;
