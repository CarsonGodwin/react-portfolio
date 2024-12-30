import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© 2021 My Portfolio</p>
    </footer>
  );
};

const styles = {
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem 2rem",
    borderTop: "1px solid #ccc",
  },
};

export default Footer;
