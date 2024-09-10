import React from "react";
import "../App.css"; // Ensure you import your CSS file


const Error = () => {
  return (
    <div className="container mt-5 error-container">
      <div className="row">
        <div className="col-md-8 offset-md-2 text-center">
          <h1 className="display-4 mb-4">Error Page</h1>
          <p className="lead mb-4">
            Sorry, but something went wrong. The page you are looking for might have
            been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error;