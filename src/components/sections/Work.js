import React from "react";
import projects from "../../data/projects";
import ProjectCard from "../cards/ProjectCard";
import Section from "../ui/Section";
import { accentStyle } from "../../theme";

const imagesFor = (project) =>
  (project.media || project.images || []).filter((item) => item.type === "image" || !item.type);

const ProjectRow = ({ project }) => {
  const images = imagesFor(project);
  return (
    <li
      className="tint-row -mx-4 grid grid-cols-1 gap-6 rounded-lg px-4 py-6 md:grid-cols-[7rem_1fr] md:gap-8"
      style={accentStyle(project.accent)}
    >
      <span className="tabular pt-0.5 font-mono text-sm text-muted">{project.year}</span>
      <div className={images.length ? "grid gap-6 md:grid-cols-[1fr_auto] md:gap-10" : ""}>
        <div className="min-w-0">
          <h3 className="flex items-center gap-3 text-base font-semibold tracking-tight text-text">
            <span className="swatch" aria-hidden="true" />
            {project.title}
          </h3>
          {project.badge ? <span className="badge mt-2 inline-flex">{project.badge}</span> : null}
          <p className="mt-1 max-w-prose text-sm text-muted">{project.summary}</p>
          <p className="mt-2 font-mono text-xs text-muted">{project.tags.join(" · ")}</p>
          {project.linkLabel ? (
            <a className="link mt-3 inline-block text-sm" href={project.link} rel="noreferrer" target="_blank">
              {project.linkLabel} ↗
            </a>
          ) : null}
        </div>
        {images.length ? (
          <div className="flex gap-3">
            {images.map((image) => (
              <img
                key={image.src}
                alt={image.alt}
                className="tint-frame h-72 w-auto rounded-lg object-cover object-top"
                loading="lazy"
                src={image.src}
              />
            ))}
          </div>
        ) : null}
      </div>
    </li>
  );
};

const Work = () => {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section id="projects" label="Projects">
      <div className="flex flex-col gap-12">
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <ul className="divide-y divide-border border-y border-border">
          {rest.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Work;
