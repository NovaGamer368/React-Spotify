import { useState, useEffect } from "react";

const Playlists = ({ token }) => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const response = await fetch(
        "https://api.spotify.com/v1/me/playlists?limit=10",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setPlaylists(data.items);
    };

    fetchPlaylists();
  }, [token]);

  return (
    <div>
      <h2>Your Playlists</h2>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <img
              src={playlist.images[0]?.url}
              alt={playlist.name}
              style={{ width: "50px", height: "50px" }}
            />
            <p>{playlist.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlists;
