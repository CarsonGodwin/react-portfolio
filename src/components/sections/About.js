import React from "react";
import "../../styles/About.css";
import AppStoreLogo from "../../assets/images/appstore.png"; // Replace with the actual path to the App Store logo
import LinkedInLogo from "../../assets/images/linkedin.png"; // Replace with the actual path to the LinkedIn logo
import GitHubLogo from "../../assets/images/Github.png"; // Replace with the actual path to the GitHub logo


const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-text">
          <h1>About Me</h1>
          <p>
            Hi, I'm a passionate web developer with a knack for creating dynamic
            and user-friendly web applications. I thrive on learning new
            technologies and sharing my knowledge with others. Whether crafting
            intuitive user interfaces or solving complex backend problems, I
            enjoy turning ideas into reality.
          </p>
          <p>
            When I’m not coding, you’ll find me exploring new places, diving
            into a good book, or experimenting with creative projects.
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