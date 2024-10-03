import { useState, useEffect, useMemo } from "react";

const TopTracks = ({ token }) => {
  const [topTracks, setTopTracks] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchInitialTracks = async () => {
      const response = await fetch(
        `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setTopTracks(data.items);
    };

    fetchInitialTracks();
  }, [token]);

  const fetchMoreTracks = async () => {
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();

    if (data.items.length > 0) {
      setTopTracks((prevTracks) => [...prevTracks, ...data.items]);
    } else {
      setHasMore(false);
    }
  };

  const handleViewMore = () => {
    setOffset((prevOffset) => prevOffset + 10);
  };

  useEffect(() => {
    if (offset > 0) {
      fetchMoreTracks();
    }
  }, [offset]);

  const memoizedTopTracks = useMemo(() => {
    return topTracks.map((track) => ({
      id: track.id,
      name: track.name,
      artists: track.artists.map((artist) => artist.name).join(", "),
      imageUrl: track.album.images[0]?.url,
    }));
  }, [topTracks]);

  return (
    <div className="d-flex flex-column">
      <h3 className="my-4 text-center text-decoration-underline">Top Tracks</h3>
      <ul className="list-group flex-row flex-wrap">
        {memoizedTopTracks.map((track) => (
          <li
            key={track.id}
            className="list-group-item list-group-item-action w-50 p-3 bg-primary text-white rounded-5 mb-2"
          >
            <div className="d-flex justify-content-between align-items-center">
              <img
                src={track.imageUrl}
                alt={track.name}
                style={{ width: "50px", height: "50px" }}
              />
              <div>
                <h5 className="mb-1 text-end ">{track.name}</h5>
                <div className="text-end">{track.artists}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          className="btn btn-secondary mt-4 align-self-center border mb-3"
          onClick={handleViewMore}
        >
          View More Tracks
        </button>
      )}
    </div>
  );
};

export default TopTracks;
