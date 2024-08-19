import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth"; // Import Auth for checking login status
import Certifications from "./Certifications"; // Import the Certifications component

const Home = () => {
  return (
    <div className="d-flex flex-column align-items-center text-center bg-light text-dark p-4">
      <h1 className="display-4 mb-4 text-primary">CompTia Buddy</h1>
      <p className="lead mb-4" style={{ maxWidth: "600px" }}>
        CompTia Study Aide
      </p>
      {!Auth.loggedIn() && (
        <div className="mb-5">
          <Link className="btn btn-primary btn-lg me-3" to="/login">
            Login
          </Link>
          <Link className="btn btn-secondary btn-lg" to="/signup">
            Signup
          </Link>
        </div>
      )}
      {/* Render the Certifications component at the bottom */}
      <div className="w-100">
        <Certifications />
      </div>
    </div>
  );
};

export default Home;
