import React from "react";
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Carson Portfolio. All rights reserved.</p>
        <div className="footer-socials">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://img.icons8.com/material-outlined/24/ffffff/github.png"
              alt="GitHub"
            />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://img.icons8.com/material-outlined/24/ffffff/linkedin.png"
              alt="LinkedIn"
            />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://img.icons8.com/material-outlined/24/ffffff/twitter.png"
              alt="Twitter"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
