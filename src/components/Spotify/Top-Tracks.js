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
    <div className="d-flex flex-column">
      <h3 className="my-4 text-center text-decoration-underline">Top Tracks</h3>
      <ul className="list-group flex-row flex-wrap">
        {topTracks.map((track) => (
          <li
            key={track.id}
            className="list-group-item list-group-item-action w-50 p-3 bg-primary text-white rounded-5 mb-2"
          >
            <div className="d-flex justify-content-between align-items-center">
              <img
                src={track.album.images[0]?.url}
                alt={track.name}
                style={{ width: "50px", height: "50px" }}
              />
              <div>
                <h5 className="mb-1">{track.name}</h5>
                <div className="text-end">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopTracks;
