import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_CERTIFICATIONS } from "../utils/queries"; // Import the certification query

const CertificationList = () => {
  const { loading, error, data } = useQuery(QUERY_CERTIFICATIONS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading certifications</div>;
  }

  const certifications = data.certifications;

  return (
    <div
      className="container mt-5"
      style={{ maxHeight: "400px", overflowY: "auto" }}
    >
      <h1 className="mb-4">Certification List</h1>
      <div className="row row-cols-2 row-cols-md-4 g-4">
        {certifications.map((certification) => (
          <div className="col" key={certification._id}>
            <div className="card h-100">
              <img
                src="https://via.placeholder.com/150"
                className="card-img-top"
                alt={certification.title}
              />
              <div className="card-body">
                <h5 className="card-title">{certification.title}</h5>
                <p className="card-text">{certification.description}</p>
                <Link
                  to={`/certifications/${certification._id}`} // Updated to navigate to the certification detail page
                  className="btn btn-primary"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationList;
