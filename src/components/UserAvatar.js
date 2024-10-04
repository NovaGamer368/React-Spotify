import React, { useState, useEffect } from "react";

const UserAvatar = ({ token }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  return userProfile ? (
    <img
      src={userProfile.images[0]?.url}
      alt={userProfile.display_name}
      className="rounded-circle"
      style={{ width: "50px", height: "50px" }}
    />
  ) : (
    <div>Welcome {userProfile ? userProfile.display_name : "user"}</div>
  );
};

export default UserAvatar;
