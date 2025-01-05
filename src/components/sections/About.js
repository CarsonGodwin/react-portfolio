import React from "react";
import "../../styles/About.css";
import AppStoreLogo from "../../assets/images/appstore.png"; 
import LinkedInLogo from "../../assets/images/linkedin.png";
import GitHubLogo from "../../assets/images/whiteGitHub.png"; 


const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-text">
        <h1 class="section-title">About Me</h1>
        <p>
        Hi, I’m Carson Godwin, a passionate software engineer with a background in computer science and business. I specialize in building innovative solutions, from developing location-based social media apps like Karto to leading IEEE-published research on privacy and search personalization. With expertise in Flutter, Firebase, and machine learning, I thrive at the intersection of creativity and technology, crafting scalable, user-centric applications that solve real-world problems.
          </p>
        </div>
        <div className="about-graphic">
          <a
            href="https://apps.apple.com/us/app/karto-social/id6474485058"
            target="_blank"
            rel="noopener noreferrer"
            className="icon1"
          >
            <img
              src={AppStoreLogo}
              alt="App Store"
              className="about-icon"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/carson-godwin/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon2"
          >
            <img
              src={LinkedInLogo}
              alt="LinkedIn"
              className="about-icon"
            />
          </a>
          <a
            href="https://github.com/CarsonGodwin"
            target="_blank"
            rel="noopener noreferrer"
            className="icon3"
          >
            <img
              src={GitHubLogo}
              alt="GitHub"
              className="about-icon"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;