import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div style={styles.layout}>
      <Header />
      <main style={styles.content}>{children}</main>
      <Footer />
    </div>
  );
};

const styles = {
  layout: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    // Remove backgroundColor here if using App.css
  },
  content: {
    flex: 1, // Ensures the main content stretches between Header and Footer
  },
};

export default Layout;
