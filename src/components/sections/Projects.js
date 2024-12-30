import react from "react";
import Card from "../reuseable/Card";

const Projects = () => {
  const projectsData = [
    {
      title: "Project 1",
      description: "This is a project",
      image: "https://via.placeholder.com/150",
      link: "#",
    },
    {
      title: "Project 2",
      description: "This is a project",
      image: "https://via.placeholder.com/150",
      link: "#",
    },
    {
      title: "Project 3",
      description: "This is a project",
      image: "https://via.placeholder.com/150",
      link: "#",
    },
  ];

  return (
    <section id="projects" style={styles.section}>
      <h1>Projects</h1>
      <div style={styles.projects}>
        {projectsData.map((project, index) => (
          <Card
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            link={project.link}
          />
        ))}
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: "2rem",
  },
  projects: {
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  },
};

export default Projects;
