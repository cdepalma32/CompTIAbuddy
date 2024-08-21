import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { UPDATE_USER } from "../utils/mutations";

const UpdateUserForm = ({ isAdmin }) => {
  const { userId } = useParams(); // Get userId from the route params
  const navigate = useNavigate();

  // Fetch user data
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { id: userId },
  });

  // Get the currently logged-in user to check if they are the admin
  const { data: currentUserData } = useQuery(QUERY_ME);

  // Define state for the form
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    profilePhoto: "",
    darkMode: false,
    fontSize: "",
    language: "",
    timeZone: "",
  });

  const [updateUser] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (data) {
      const user = data.user;
      setFormState({
        username: user.username || "",
        email: user.email || "",
        password: "",
        profilePhoto: user.settings?.profileSettings?.profilePhoto || "",
        darkMode: user.settings?.accessibility?.darkMode || false,
        fontSize: user.settings?.accessibility?.fontSize || "",
        language: user.settings?.accessibility?.language || "",
        timeZone: user.settings?.accessibility?.timeZone || "",
      });
    }
  }, [data]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUser({
        variables: {
          userId,
          username: formState.username,
          email: formState.email,
          ...(formState.password && { password: formState.password }), // Include password if provided
          settings: {
            profileSettings: {
              profilePhoto: formState.profilePhoto,
            },
            accessibility: {
              darkMode: formState.darkMode,
              fontSize: formState.fontSize,
              language: formState.language,
              timeZone: formState.timeZone,
            },
          },
        },
      });
      navigate("/admin");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data</div>;

  return (
    <div className="container mt-5">
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formState.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
        </div>

        {/* Password field only shown if not admin */}
        {!isAdmin && (
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="profilePhoto" className="form-label">
            Profile Photo URL
          </label>
          <input
            type="text"
            className="form-control"
            id="profilePhoto"
            name="profilePhoto"
            value={formState.profilePhoto}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="darkMode"
            name="darkMode"
            checked={formState.darkMode}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="darkMode">
            Dark Mode
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="fontSize" className="form-label">
            Font Size
          </label>
          <input
            type="text"
            className="form-control"
            id="fontSize"
            name="fontSize"
            value={formState.fontSize}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="language" className="form-label">
            Language
          </label>
          <input
            type="text"
            className="form-control"
            id="language"
            name="language"
            value={formState.language}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="timeZone" className="form-label">
            Time Zone
          </label>
          <input
            type="text"
            className="form-control"
            id="timeZone"
            name="timeZone"
            value={formState.timeZone}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
