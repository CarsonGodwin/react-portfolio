import React from "react";
import "../../styles/Experience.css";

const Experience = () => {
  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "Infosys",
      location: "Raleigh, NC",
      timeframe: "May– July 2024",
      description: [
        "Automated conversion of Requirement Traceability Matrix (RTM) documents into Functional Design Specification (FDS) documents using Azure OpenAI, LangChain, and Pandas, ensuring accuracy and efficiency.",
        "Created a front-end interface using HTML, CSS, and JavaScript to facilitate user interaction with the automated solution.",
        "Developed the backend using Flask to handle requests and integrate with the front-end and automated processes.",
        "Collaborated with cross-functional teams and Clients to ensure seamless integration and delivery of the final product.",
      ],
    },
    {
      title: "Machine Learning Research Apprentice",
      company: "College of Science and Engineering, UNCW",
      location: "Wilmington, NC",
      timeframe: "September 2022 – January 2024",
      description: [
        "Developed virtual personality to research web search privacy and understanding engine personalization.",
        "Lead author on published IEEE research paper on privacy and search personalization, contributing to data analysis.",
        "Created a dataset used to train Machine Learning Models on privacy and web search behaviors.",
      ],
    },
    {
      title: "Research Intern",
      company: "National Science Foundation, Florida International University (FIU)",
      location: "Miami, FL",
      timeframe: "May – August 2023",
      description: [
        "Implemented a Virtual Network Function (VNF) deployment strategy across network infrastructures considering node and edge availability for improved network management.",
        "Developed a dynamic simulation model for service function chains to accurately depict complex, variable network load requirements.",
      ],
    },
  ];

  return (
    <section id="experience" className="experience-section">
      <h1 className="section-title">Experience</h1>
      <div className="experience-list">
        {experiences.map((experience, index) => (
          <div key={index} className="experience-card">
            <h2 className="experience-title">{experience.title}</h2>
            <p className="experience-company">
              <strong>{experience.company}</strong> - {experience.location}
            </p>
            <p className="experience-timeframe">{experience.timeframe}</p>
            <ul className="experience-description">
              {experience.description.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
