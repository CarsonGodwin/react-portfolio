import React from "react";
import "../../styles/ZigZag.css";

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
    },
    {
      title: "Research Intern",
      company: "NSF at FIU",
      location: "Miami, FL",
      timeframe: "May – Aug 2023",
      description: [
        "Implemented Virtual Network Function deployment strategies for improved network management.",
        "Developed a dynamic simulation model for service function chains.",
      ],
    },
  ];

  return (
    <section id="experience" className="zigzag-section">
      <h1 className="zigzag-title">Experience</h1>
      <div className="zigzag-container">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className={`zigzag-item ${index % 2 === 0 ? "left" : "right"}`}
          >
            <div className="zigzag-content">
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
