import React from "react";
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Carson Portfolio. All rights reserved.</p>
        <div className="footer-socials">
        </div>
      </div>
    </footer>
  );
};

export default Footer;
