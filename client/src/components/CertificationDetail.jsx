import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_CERTIFICATION, QUERY_ME } from "../utils/queries";
import { ADD_FREE_CERTIFICATION } from "../utils/mutations";
import Auth from "../utils/auth"; // Assuming you have an Auth utility to check login status

const CertificationDetail = () => {
  const { id } = useParams(); // Get the certification ID from the URL
  const { loading, error, data, refetch } = useQuery(QUERY_CERTIFICATION, {
    variables: { id },
  });
  const { data: userData } = useQuery(QUERY_ME, {
    skip: !Auth.loggedIn(),
  });
  const [addFreeCertification] = useMutation(ADD_FREE_CERTIFICATION);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.certification) {
      console.log("Certification Data:", data.certification);
    }
  }, [data]);

  const handleBuyClick = async () => {
    // Check if the user is logged in
    if (!Auth.loggedIn()) {
      console.log("User not logged in. Redirecting to login/signup...");
      navigate("/login"); // Redirect to login page if user is not logged in
      return;
    }

    try {
      const price = certification?.price;
      console.log(`Buy button clicked, price: $${price?.toFixed(2)}`);

      // Check if the certification is free
      if (price === 0 || price === null || price === undefined) {
        console.log("Adding a free certification...");

        try {
          console.log("Adding free certification id:", id);
          await addFreeCertification({ variables: { certificationId: id } });
          console.log("Free certification added successfully");

          // Refetch the certification data to show the chapters
          refetch();
        } catch (error) {
          console.error("Error adding free certification:", error);
        }
      } else {
        console.log("Navigating to Sign-up page...");
        navigate("/signup");
      }
    } catch (err) {
      console.error("Error during purchase process:", err);
    }
  };

  const hasPurchased = userData?.me?.purchasedCertifications?.some(
    (purchase) => purchase.certificationId === id
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error loading certification details:", error);
    return <div>Error loading certification details</div>;
  }

  // Safely access the certification and chapters data
  const certification = data?.certification;
  const chapters = certification?.chapters;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">
        {certification?.title || "Certification Details"}
      </h1>
      <p className="lead">
        {certification?.description || "No description available"}
      </p>

      {/* Show the price of the certification only if it hasn't been purchased */}
      {!hasPurchased && (
        <p className="lead">Price: ${certification?.price?.toFixed(2)}</p>
      )}

      {chapters ? (
        <>
          <h2 className="mt-5">Chapters</h2>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {chapters.map((chapter) => (
              <div className="col" key={chapter._id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{chapter.title}</h5>
                    <p className="card-text">
                      This chapter includes various activities like quizzes,
                      flashcards, etc.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-5">
          {!hasPurchased ? (
            <>
              <p>Purchase this certification to access the content!</p>
              <button
                className="btn btn-primary btn-lg"
                onClick={handleBuyClick}
              >
                Buy Now for ${certification?.price?.toFixed(2)}
              </button>
            </>
          ) : (
            <p>You have already purchased this certification.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CertificationDetail;
