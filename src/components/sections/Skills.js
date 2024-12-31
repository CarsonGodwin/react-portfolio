import React from "react";
import "../../styles/Skills.css";

const featuredSkills = [
  { skill: "Python", proficiency: 95 },
  { skill: "JavaScript (React, React Native)", proficiency: 90 },
  { skill: "Flutter", proficiency: 85 },
  { skill: "SQL", proficiency: 90 },
];

const additionalSkills = [
  "Dart",
  "Java",
  "Machine Learning Training",
  "HTML",
  "CSS",
  "Swift",
  "XCode",
  "LangChain",
  "Firebase",
  "Pandas",
  "OpenAI API",
  "Microsoft Office",
  "Google Cloud",
  "AWS",
];

const Skills = () => {
  // Duplicate the skills list for seamless scrolling
  const duplicatedSkills = [...additionalSkills, ...additionalSkills];

  return (
    <section id="skills" className="skills-section">
      <h1 className="section-title">Technical Skills & Tools</h1>

      {/* Featured Skills */}
      <div className="featured-skills">
        {featuredSkills.map((skill, index) => (
          <div className="featured-skill-item" key={index}>
            <h3>{skill.skill}</h3>
            <div className="skill-bar">
              <div
                className="skill-level"
                style={{ width: `${skill.proficiency}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Skills */}
      <div className="additional-skills">
        <ul className="additional-skills-list">
          {duplicatedSkills.map((skill, index) => (
            <li key={index} className="additional-skill-item">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

  
export default Skills;
