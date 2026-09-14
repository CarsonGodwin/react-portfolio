import React from "react";
import { accentStyle } from "../../theme";

// Full project view: used for the featured project on the page and for the
// arena modal.
const Media = ({ project }) => {
  const items = project.media || (project.images || []).map((image) => ({ type: "image", ...image }));
  if (!items.length) return null;
  const single = items.length === 1;
  return (
    <div className={`grid gap-3 ${single ? "grid-cols-1" : "grid-cols-2"}`}>
      {items.map((item) => (
        <figure key={`${item.type}-${item.src}`} className="tint-frame overflow-hidden rounded-md bg-surface">
          {item.type === "video" ? (
            <video
              className="block aspect-video w-full object-cover"
              controls
              poster={item.poster}
              preload="metadata"
            >
              <source src={item.src} type="video/mp4" />
              {item.label}
            </video>
          ) : (
            <img alt={item.alt} className="block w-full" loading="lazy" src={item.src} />
          )}
        </figure>
      ))}
    </div>
  );
};

const ProjectCard = ({ project }) => (
  <article style={accentStyle(project.accent)}>
    <Media project={project} />
    <div className="mt-5 flex items-baseline justify-between gap-6">
      <h3 className="flex items-center gap-3 text-lg font-semibold tracking-tight text-text">
        <span className="swatch" aria-hidden="true" />
        {project.title}
      </h3>
      <span className="tabular font-mono text-base text-muted">{project.year}</span>
    </div>
    {project.badge ? <span className="badge mt-2 inline-flex">{project.badge}</span> : null}
    <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-muted">{project.description}</p>
    <p className="mt-4 font-mono text-xs text-muted">{project.tags.join(" · ")}</p>
    {project.linkLabel ? (
      <a className="link mt-4 inline-block text-sm" href={project.link} rel="noreferrer" target="_blank">
        {project.linkLabel} ↗
      </a>
    ) : null}
  </article>
);

export default ProjectCard;
