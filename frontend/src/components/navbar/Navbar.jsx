import "./navbar.css";
import axios from "axios";
import React from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">House Booking</span>
        </Link>
        <div className="navItems">
          {user ? (
            <>
              <span className="userName">{user.username}</span>
              <button className="navButton navButtonLogout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="navLink">
                Register
              </Link>
              <Link to="/login" className="navLink">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
