import React from "react";
import SocialLinks from "../reuseable/SocialLinks";

const Header = () => {
  const socialLinksData = [
    {
      name: "GitHub",
      url: "",
      icon: "https://img.icons8.com/material-outlined/24/000000/github.png",
    },
    {
      name: "LinkedIn",
      url: "",
      icon: "https://img.icons8.com/material-outlined/24/000000/linkedin.png",
    },
    {
      name: "Twitter",
      url: "",
      icon: "https://img.icons8.com/material-outlined/24/000000/twitter.png",
    },
  ];

  return (
    <header style={styles.header}>
      <div> My Portfolio</div>
      <nav style={styles.nav}>
        <ul>
          <a href="#home" style={styles.navLink}>
            Home
          </a>
          <a href="#about" style={styles.navLink}>
            About
          </a>
          <a href="#projects" style={styles.navLink}>
            Projects
          </a>
          <a href="#contact" style={styles.navLink}>
            Contact
          </a>
        </ul>
      </nav>
      <SocialLinks links={socialLinksData} />
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    borderBottom: "1px solid #ccc",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ul: {
    display: "flex",
  },

  navLink: {
    margin: "0 1rem",
  },
};

export default Header;
