import React from "react";

const Error = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Error Page</h1>
      <p style={styles.message}>
        Sorry, but something went wrong. The page you are looking for might have
        been removed, had its name changed, or is temporarily unavailable.
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    color: "#333",
    padding: "20px",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    color: "#dc3545", // Bootstrap danger color
  },
  message: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    maxWidth: "600px",
  },
};

export default Error;
