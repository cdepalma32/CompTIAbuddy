import React from "react";

const Footer = () => {
  return (
    <footer style={styles.container}>
      <p style={styles.message}>This is Footer.jsx</p>
    </footer>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60px",
    backgroundColor: "#343a40", // Bootstrap dark color
    color: "#fff",
    padding: "10px",
    boxSizing: "border-box",
    width: "100%",
  },
  message: {
    fontSize: "1rem",
  },
};

export default Footer;
