import React from "react";
import SocialLinks from "../reuseable/SocialLinks";
import "../../styles/Header.css";

const Header = () => {
  const socialLinksData = [
    {
      name: "GitHub",
      url: "https://github.com/CarsonGodwin",
      icon: "https://img.icons8.com/material-outlined/24/ffffff/github.png",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/carson-godwin/",
      icon: "https://img.icons8.com/material-outlined/24/ffffff/linkedin.png",
    },
  ];

  return (
    <header className="header">
      <div className="logo">Carson's Portfolio</div>
      <nav className="nav">
        <a href="#about" className="nav-link">
          About
        </a>
        <a href="#projects" className="nav-link">
          Projects
        </a>
        <a href="#contact" className="nav-link">
          Contact
        </a>
      </nav>
      <SocialLinks links={socialLinksData} />
    </header>
  );
};

export default Header;
