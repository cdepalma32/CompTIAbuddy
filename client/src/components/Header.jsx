import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-primary text-light mb-4 py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column">
          <Link className="text-light text-decoration-none" to="/">
            <h1 className="m-0 display-5">CompTIA Buddy</h1>
          </Link>
          <p className="m-0 lead">Study for your CompTIA exams with ease!</p>
        </div>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link text-light" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#">
                Certifications
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#">
                Tutorial
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#">
                Settings
              </a>
            </li>
          </ul>
        </nav>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-info btn-lg me-2" to="/me">
                {Auth.getProfile().username}'s Profile
              </Link>
              <button className="btn btn-light btn-lg" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-info btn-lg me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-light btn-lg" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
