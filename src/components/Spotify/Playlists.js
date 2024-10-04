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
    <div className="d-flex flex-column flex-grow-1 mx-2">
      <h3 className="my-4 text-center text-decoration-underline">
        Your top 10 Playlists
      </h3>
      <ul className="list-group flex-row flex-wrap">
        {playlists.length <= 0 ? (
          <>
            <h4 className="text-center">
              You have no Playlists on your profile
            </h4>
          </>
        ) : (
          <>
            {playlists.map((playlist) => (
              <li
                className="list-group-item list-group-item-action p-3 bg-primary text-white rounded-5 mb-2"
                key={playlist.id}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <img
                    src={playlist.images[0]?.url}
                    alt={playlist.name}
                    style={{ width: "75px", height: "75px" }}
                  />
                  <p className="text-end">{playlist.name}</p>
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default Playlists;
