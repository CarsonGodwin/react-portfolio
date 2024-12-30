import React from "react";
import "../../styles/About.css";

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
          <img
            src="https://img.icons8.com/ios/50/000000/web-design.png"
            alt="Developer Icon"
            className="symbolic-icon"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
