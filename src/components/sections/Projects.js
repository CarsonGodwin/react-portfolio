import React from "react";
import "../../styles/Projects.css";
import KartoImage1 from "../../assets/images/kartoPost.png";
import KartoImage2 from "../../assets/images/kartoMap.png";
import MoodWavesImage1 from "../../assets/images/Dashboard-portrait.png";
import MoodWavesImage2 from "../../assets/images/MoodLog-portrait.png";
import PythonLogo from "../../assets/images/Python.jpeg";
import JavaLogo from "../../assets/images/Java.png";

const Projects = () => {
  const projectsData = [
    {
      title: "Karto",
      description: "Karto is a location-based social media platform designed to connect users through geotagged posts and a seamless map interface.",
      images: [KartoImage1, KartoImage2],
      timeline: "April 2023 - Present | Karto LLC",

      link: "https://apps.apple.com/us/app/karto-social/id6474485058",
    },
    {
      title: "Mood Waves",
      description: "Mood Waves is a mood tracking app that allows users to log their emotions, view trends, and receive personalized insights.",
      images: [MoodWavesImage1, MoodWavesImage2],
      timeline: "Jan 2024 - May 2024 | University of North Carolina Wilmington",

      link: "#",
    },
    {
      title: "Java Time Management Application",
      description: `
        Built a time management app in Java enabling employee ID sign-ins,
        streamlining time-off requests, clock-ins, and clock-outs for employee
        convenience. Integrated schedule viewing within the app, offering real-time
        access to work schedules.
      `,
      skills: ["Java", "App Development", "Employee Management Tools"],
      logo: JavaLogo, // Use logo instead of placeholder images
      timeline: "Oct 2023 - Dec 2023 | University of North Carolina Wilmington",
      link: "#",
    },
    {
      title: "Automated Search Result Collector",
      description: `
        Created a Python-based tool to collect search data, automating browser
        actions using Selenium and extracting HTML data with BeautifulSoup.
        Collected and analyzed over 10,000 Google search results to validate data
        extraction efficiency and tool scalability.
      `,
      skills: ["Python", "Selenium", "BeautifulSoup", "Data Collection"],
      logo: PythonLogo, // Use logo instead of placeholder images
      timeline: "Sep 2022 - Feb 2023 | UNCW College of Science and Engineering",
      link: "https://github.com/CarsonGodwin/ML-Webscraper",
    },
  ];

  return (
    <section id="projects" className="projects-section">
      <h1 className="section-title">Projects</h1>
      <div className="projects-grid">
        {projectsData.map((project, index) => (
          <div key={index} className="project-card">
            {/* Render logo if available */}
            {project.logo && (
              <img src={project.logo} alt={`${project.title} logo`} className="project-logo" />
            )}
            <h2 className="project-title">{project.title}</h2>
            {project.timeline && <p className="project-timeline">{project.timeline}</p>}
            <p className="project-description">{project.description}</p>
            {project.skills && (
              <ul className="project-skills">
                {project.skills.map((skill, idx) => (
                  <li key={idx} className="skill">
                    {skill}
                  </li>
                ))}
              </ul>
            )}
            {/* Render images if no logo */}
            {project.images && (
              <div className="project-images">
                {project.images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    className="project-image"
                  />
                ))}
              </div>
            )}
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
              View Project
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
