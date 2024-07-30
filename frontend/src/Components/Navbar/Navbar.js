import React, { useContext } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthContext";

const Navbar = () => {
  const { logout, token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  function openNav() {
    const element = document.getElementById("mySidenav");
    if (element) {
      element.style.width = "250px";
    }
  }

  function closeNav() {
    const element = document.getElementById("mySidenav");
    if (element) {
      element.style.width = "0";
    }
  }

  const handleLogout = () => {
    logout();
    navigate(`/`);
  };

  return (
    <>
      <div>
        <nav>
          <div id="navbar">
            <div id="logo" className="reverse">
              <div
                className="mobile-btn"
                style={{
                  fontSize: "30px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={openNav}
              >
                &#9776;
              </div>
              <div className="logo">
                <NavLink to="/">
                  Custom <span> JWT</span> Auth
                </NavLink>
              </div>
            </div>
            <div id="links">
              <NavLink to="/">Home</NavLink>
              {user === "" && token === "" ? (
                <>
                  <NavLink to="/login">Login</NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/" onClick={handleLogout}>
                    Logout
                  </NavLink>
                </>
              )}

              <NavLink to="/profile">Profile</NavLink>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </div>
          </div>
        </nav>

        <div id="mySidenav" className="sidenav">
          <NavLink
            style={{ cursor: "pointer" }}
            className="closebtn"
            onClick={closeNav}
          >
            &times;
          </NavLink>
          <NavLink to="/">Home</NavLink>
          {user === "" && token === "" ? (
            <>
              <NavLink to="/login">Login</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" onClick={handleLogout}>
                Logout
              </NavLink>
            </>
          )}
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
