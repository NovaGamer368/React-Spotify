import { useState, useEffect } from "react";

const UserProfile = ({ token }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
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
  }, [token]);

  return (
    <div>
      {userProfile ? (
        <div>
          <h2>{userProfile.display_name}</h2>
          <img
            src={userProfile.images[0]?.url}
            alt="User Profile"
            style={{ borderRadius: "50%" }}
          />
          <p>Email: {userProfile.email}</p>
          <br />
          <a href={userProfile.external_urls.spotify}>
            View profile on Spotify
          </a>

          <p>Followers: {userProfile.followers.total}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
