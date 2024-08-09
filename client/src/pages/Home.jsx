import React from "react";

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Home Page</h1>
      <p style={styles.message}>
        Welcome to the home page! Explore our features and enjoy your stay.
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
    color: "#007bff", // Bootstrap primary color
  },
  message: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    maxWidth: "600px",
  },
};

export default Home;
