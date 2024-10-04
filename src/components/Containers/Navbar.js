import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserAvatar from "../UserAvatar";

const NavigationBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [token] = useState(window.localStorage.getItem("token"));

  const toggleDropdown = (e) => {
    e.preventDefault();
    setShowDropdown((prev) => !prev);
  };

  const handleDropdownClose = () => {
    setShowDropdown(false);
  };

  const login = () => {
    const loginUrl = `${
      process.env.REACT_APP_AUTH_ENDPOINT
    }?redirect_uri=${encodeURIComponent(
      process.env.REACT_APP_REDIRECT_URI
    )}&scope=${encodeURIComponent(process.env.REACT_APP_SCOPE)}&response_type=${
      process.env.REACT_APP_RESPONSE_TYPE
    }&show_dialog=true&client_id=${process.env.REACT_APP_CLIENT_ID}`;
    window.location.href = loginUrl;
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    window.location.href = "/";
    handleDropdownClose();
  };

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary sticky-top p-4">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="/">
          Spotify App
        </a>
        <button className="navbar-toggler" type="button" onClick={toggleNav}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${
            isNavOpen ? "show" : ""
          } align-center h-100`}
          id="navbarNav"
        >
          {token ? (
            <>
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/playlists">
                    Playlists
                  </Link>
                </li>
              </ul>
              <div
                className="nav-item dropdown d-flex justify-content-end w-100"
                id="navbarDropdown"
              >
                <button
                  className="nav-link dropdown-toggle text-white"
                  onClick={toggleDropdown}
                  aria-haspopup="true"
                  aria-expanded={showDropdown}
                >
                  <UserAvatar token={token} />
                </button>
                {showDropdown && (
                  <div className="dropdown-menu dropdown-menu-right show mt-5">
                    <Link
                      className="dropdown-item"
                      to="/account"
                      onClick={handleDropdownClose}
                    >
                      View Account
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={logout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="nav-item w-100 d-flex justify-content-end mt-4">
              <button className="nav-link btn text-white" onClick={login}>
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
