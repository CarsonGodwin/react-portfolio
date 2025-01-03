import React from "react";
import "../../styles/ZigZag.css";
import InfosysLogo from "../../assets/images/Infosys.webp"; 
import UNCWLogo from "../../assets/images/UNCW.png"; 
import NSFLogo from "../../assets/images/NSF.png";; 

const Experience = () => {
  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "Infosys",
      location: "Raleigh, NC",
      timeframe: "May– July 2024",
      description: [
        "Automated conversion of RTM documents into FDS documents using Azure OpenAI, LangChain, and Pandas.",
        "Created a front-end interface using HTML, CSS, and JavaScript.",
        "Developed the backend using Flask to handle requests and integrate with the front-end.",
        "Collaborated with cross-functional teams to ensure seamless delivery.",
      ],
      logo: InfosysLogo,
    },
    {
      title: "Machine Learning Research Apprentice",
      company: "UNCW",
      location: "Wilmington, NC",
      timeframe: "Sep 2022 – Jan 2024",
      description: [
        "Developed virtual personality for research on web search privacy.",
        "Lead author on a published IEEE paper on privacy and search personalization.",
        "Created datasets to train Machine Learning Models on privacy behaviors.",
      ],
      logo: UNCWLogo,
      button: {
        text: "My Research",
        url: "https://ieeexplore.ieee.org/document/10459555", 
      },
    },
    {
      title: "Research Intern",
      company: "National Science Foundation at FIU",
      location: "Miami, FL",
      timeframe: "May – Aug 2023",
      description: [
        "Implemented Virtual Network Function deployment strategies for improved network management.",
        "Developed a dynamic simulation model for service function chains.",
      ],
      logo: NSFLogo,
    },
  ];

  return (
    <section id="experience" className="zigzag-section">
      <h1 className="section-title">Experience</h1>
      <div className="zigzag-container">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className={`zigzag-item ${index % 2 === 0 ? "left" : "right"}`}
          >
            <div className="zigzag-content">
              {/* Render logo if available */}
              {experience.logo && (
                <img
                  src={experience.logo}
                  alt={`${experience.company} logo`}
                  className="zigzag-logo"
                />
              )}
              <h2>{experience.title}</h2>
              <p className="zigzag-company">
                <strong>{experience.company}</strong> - {experience.location}
              </p>
              <p className="zigzag-timeframe">{experience.timeframe}</p>
              <ul>
                {experience.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              {/* Add button if the experience has one */}
              {experience.button && (
                <a
                  href={experience.button.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="zigzag-button"
                >
                  {experience.button.text}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
