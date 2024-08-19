import React from "react";
import { Link } from "react-router-dom";

const CertificationList = () => {
  return (
    <div
      className="container mt-5"
      style={{ maxHeight: "400px", overflowY: "auto" }}
    >
      <h1 className="mb-4">Certification List</h1>
      <div className="row row-cols-2 row-cols-md-4 g-4">
        <div className="col">
          <div className="card">
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="Certification"
            />
            <div className="card-body">
              <h5 className="card-title">Certification 1</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <Link to="#" className="btn btn-primary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="Certification"
            />
            <div className="card-body">
              <h5 className="card-title">Certification 2</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <Link to="#" className="btn btn-primary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="Certification"
            />
            <div className="card-body">
              <h5 className="card-title">Certification 3</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content.
              </p>
              <Link to="#" className="btn btn-primary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="Certification"
            />
            <div className="card-body">
              <h5 className="card-title">Certification 4</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <Link to="#" className="btn btn-primary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationList;
