import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { QUERY_ME, QUERY_USERS, QUERY_CERTIFICATIONS } from "../utils/queries";
import { DELETE_USER, DELETE_CERTIFICATION } from "../utils/mutations"; // Assuming you have these mutations defined

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Fetch data
  const {
    loading: loadingMe,
    error: errorMe,
    data: dataMe,
  } = useQuery(QUERY_ME);
  const {
    loading: loadingUsers,
    error: errorUsers,
    data: dataUsers,
    refetch: refetchUsers,
  } = useQuery(QUERY_USERS);
  const {
    loading: loadingCertifications,
    error: errorCertifications,
    data: dataCertifications,
    refetch: refetchCertifications,
  } = useQuery(QUERY_CERTIFICATIONS);

  // Mutations for deleting users and certifications
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: QUERY_USERS }], // Refetch users after deleting
  });
  const [deleteCertification] = useMutation(DELETE_CERTIFICATION, {
    refetchQueries: [{ query: QUERY_CERTIFICATIONS }], // Refetch certifications after deleting
  });

  useEffect(() => {
    if (dataMe) {
      console.log("meData:", dataMe);
      if (dataMe.me && dataMe.me.username !== "admin") {
        console.log(
          "User is not admin, but no redirect is occurring for debugging."
        );
      } else if (!dataMe.me) {
        console.log(
          "No user data available, but no redirect is occurring for debugging."
        );
      }
    }
  }, [dataMe]);

  // Handle loading and errors
  if (loadingMe || loadingUsers || loadingCertifications) {
    return <div>Loading...</div>;
  }

  if (errorMe || errorUsers || errorCertifications) {
    console.error(
      "Error loading data:",
      errorMe || errorUsers || errorCertifications
    );
    return <div>Error loading data</div>;
  }

  // Extract users and certifications from query results
  const users = dataUsers?.users || [];
  const certifications = dataCertifications?.certifications || [];

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser({ variables: { userId } });
      await refetchUsers(); // Refetch users after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Handle delete certification
  const handleDeleteCertification = async (certificationId) => {
    try {
      await deleteCertification({ variables: { certificationId } });
      await refetchCertifications(); // Refetch certifications after deletion
    } catch (error) {
      console.error("Error deleting certification:", error);
    }
  };

  // Handle update user (navigate to AdminUpdateUserForm)
  const handleUpdateUser = (userId) => {
    navigate(`/admin/update-user/${userId}`); // Navigate to the Admin update user form
  };

  // Handle update certification (navigate to UpdateCertificationForm)
  const handleUpdateCertification = (certificationId) => {
    navigate(`/admin/update-certification/${certificationId}`); // Navigate to the certification update form
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Admin Dashboard</h1>

      <div className="row">
        <div className="col-md-6">
          <h2>Users</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Profile Picture</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <img
                      src={
                        user.profilePicture || "https://via.placeholder.com/50"
                      }
                      alt={user.username}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-warning m-1"
                      onClick={() => handleUpdateUser(user._id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger m-1"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-6">
          <h2>Certifications</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {certifications.map((certification) => (
                <tr key={certification._id}>
                  <td>{certification.title}</td>
                  <td>{certification.description}</td>
                  <td>${certification.price.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-warning m-1"
                      onClick={() =>
                        handleUpdateCertification(certification._id)
                      }
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger m-1"
                      onClick={() =>
                        handleDeleteCertification(certification._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
