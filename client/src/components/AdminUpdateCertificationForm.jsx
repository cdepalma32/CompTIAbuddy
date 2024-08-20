import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { QUERY_CERTIFICATION } from "../utils/queries";
import { UPDATE_CERTIFICATION } from "../utils/mutations";

const AdminUpdateCertificationForm = () => {
  const { certificationId } = useParams(); // Get the certification ID from the URL
  const navigate = useNavigate();

  // Fetch the current certification data
  const { loading, error, data } = useQuery(QUERY_CERTIFICATION, {
    variables: { id: certificationId },
  });

  // Mutation to update the certification
  const [updateCertification, { loading: updating, error: updateError }] =
    useMutation(UPDATE_CERTIFICATION);

  // Local state to hold form inputs
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    price: 0,
  });

  // Populate the form with current certification data when it's loaded
  useEffect(() => {
    if (data?.certification) {
      setFormState({
        title: data.certification.title || "",
        description: data.certification.description || "",
        price: data.certification.price || 0,
      });
    }
  }, [data]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateCertification({
        variables: {
          certificationId,
          ...formState,
          price: parseFloat(formState.price), // Ensure price is a float
        },
      });
      navigate("/admin"); // Redirect to the admin dashboard after update
    } catch (error) {
      console.error("Error updating certification:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  if (loading) return <div>Loading certification data...</div>;
  if (error) return <div>Error loading certification data</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Update Certification</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formState.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="5"
            value={formState.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price (USD)
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formState.price}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>
        {updating ? (
          <button className="btn btn-primary" disabled>
            Updating...
          </button>
        ) : (
          <button type="submit" className="btn btn-primary">
            Update Certification
          </button>
        )}
        {updateError && (
          <div className="alert alert-danger mt-3">
            Error updating certification: {updateError.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default AdminUpdateCertificationForm;
