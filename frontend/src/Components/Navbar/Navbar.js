import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
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
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
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
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
