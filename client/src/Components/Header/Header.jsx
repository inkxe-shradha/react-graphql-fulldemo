import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import "./Header.css";
const Header = ({ isHide }) => {
  const { user } = useAuth();
  React.useEffect(() => {
    if (user) {
      document.querySelectorAll(".dropdown-toggle").forEach((item) => {
        item.addEventListener("click", (event) => {
          if (event.target.classList.contains("dropdown-toggle")) {
            event.target.classList.toggle("toggle-change");
          } else if (
            event.target.parentElement.classList.contains("dropdown-toggle")
          ) {
            event.target.parentElement.classList.toggle("toggle-change");
          }
        });
      });
    }
  });
  return !isHide ? (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="!#">
          My Library
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" aria-current="page">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/article" className="nav-link">
                Article
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 profile-menu">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link to="/auth?type=sign-in" className="nav-link">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/auth?type=sign-up" className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown d-none">
                <a
                  className="nav-link dropdown-toggle"
                  href="!#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user"></i>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="!#">
                      <i className="fas fa-sliders-h fa-fw"></i> Account
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="!#">
                      <i className="fas fa-cog fa-fw"></i> Settings
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="!#">
                      <i className="fas fa-sign-out-alt fa-fw"></i> Log Out
                    </a>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  ) : null;
};

export default Header;
