import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { logOutUser } from "../../store/slices/userSlice";
import "./Header.css";
const Header = ({ isHide }) => {
  const { user, validateUser, logout } = useAuth();
  const dispatch = useDispatch();
  React.useEffect(() => {
    validateUser();
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
  }, [user, validateUser]);
  const logOut = () => {
    dispatch(logOutUser());
    logout();
  };

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
              <NavLink to="/library" className="nav-link">
                Article
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/library/create" className="nav-link">
                Create Article
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
              <li className="nav-item dropdown ">
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
                    <Link className="dropdown-item" to="profile">
                      <i className="fas fa-sliders-h fa-fw"></i> Account
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/profile/settings">
                      <i className="fas fa-cog fa-fw"></i> Settings
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/#" onClick={logOut}>
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
