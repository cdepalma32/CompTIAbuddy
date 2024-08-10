import React from "react";

const Header = () => {
  return (
    <header style={styles.container}>
      <h1 style={styles.title}>This is Header.jsx</h1>
    </header>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80px",
    backgroundColor: "#007bff", // Bootstrap primary color
    color: "#fff",
    padding: "10px",
    boxSizing: "border-box",
    width: "100%",
  },
  title: {
    fontSize: "1.5rem",
  },
};

export default Header;
