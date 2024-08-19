import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data, loading }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);

      // Clear form values after successful signup
      setFormState({
        username: "",
        email: "",
        password: "",
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="col-12 col-md-8 col-lg-5">
        <div className="card shadow-lg border-0">
          <h4 className="card-header bg-primary text-white p-4 text-center rounded-top">
            Create Your Account
          </h4>
          <div className="card-body p-4">
            {data ? (
              <p className="text-success text-center">
                Success! You may now head{" "}
                <Link
                  to="/"
                  className="text-decoration-none text-primary fw-bold"
                >
                  back to the homepage.
                </Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    className="form-control form-control-lg"
                    placeholder="Your username"
                    name="username"
                    type="text"
                    value={formState.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    className="form-control form-control-lg"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    className="form-control form-control-lg"
                    placeholder="Your password"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  className="btn btn-primary btn-lg w-100"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </button>
              </form>
            )}

            {error && (
              <div className="alert alert-danger mt-4 text-center" role="alert">
                {error.message || "An unexpected error occurred"}
              </div>
            )}
          </div>
          <div className="card-footer text-center py-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-decoration-none text-primary fw-bold"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
