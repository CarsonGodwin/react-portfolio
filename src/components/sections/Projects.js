import React from "react";
import projects from "../../data/projects";
import ProjectCard from "../cards/ProjectCard";

const Projects = () => {
  return (
    <section className="px-6 py-5" id="projects">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div data-reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Projects
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-text">Cool things I've built and worked on</h2>
        </div>
        <div className="md:columns-2 md:gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              className="mb-6 break-inside-avoid"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
