import { useState, useEffect } from "react";

const UserProfile = ({ token }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (token) {
      const fetchProfile = async () => {
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserProfile(data);
        console.log(data);
      };

      fetchProfile();
    }
  }, [token]);

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      {userProfile ? (
        <div className="text-center">
          <h2>{userProfile.display_name}</h2>
          <div className="mt-3">
            <img
              src={userProfile.images[0]?.url}
              alt="User Profile"
              className="img-fluid rounded-circle"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          </div>
          <div className="mt-3">
            <p>
              <strong>Email:</strong> {userProfile.email}
            </p>
            <a
              href={userProfile.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-2"
            >
              View Profile on Spotify
            </a>
          </div>
          <div className="mt-3">
            <p>
              <strong>Followers:</strong> {userProfile.followers.total}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
