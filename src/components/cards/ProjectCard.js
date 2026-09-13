import React from "react";

const ProjectCard = ({ project, reveal = true, className = "" }) => {
  return (
    <article
      className={`flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 ${className}`}
      {...(reveal ? { "data-reveal": true } : {})}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-text">{project.title}</h3>
        {project.badge ? (
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-text">
            {project.badge}
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-sm text-muted">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
      {project.media ? (
        <div
          className={`mt-6 grid gap-4 ${
            project.mediaLayout === "stack" ? "grid-cols-1" : "sm:grid-cols-2"
          }`}
        >
          {project.media.map((item) => (
            <figure key={`${item.type}-${item.src}`}>
              {item.type === "video" ? (
                <video
                  className="w-full rounded-2xl border border-white/10"
                  controls
                  preload="metadata"
                >
                  <source src={item.src} type="video/mp4" />
                  {item.label}
                </video>
              ) : (
                <img
                  alt={item.alt}
                  className="w-full rounded-2xl"
                  loading="lazy"
                  src={item.src}
                />
              )}
            </figure>
          ))}
        </div>
      ) : null}
      {project.images ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {project.images.map((image) => (
            <figure key={image.alt}>
              <img
                alt={image.alt}
                className="w-full border-white/10"
                loading="lazy"
                src={image.src}
              />
            </figure>
          ))}
        </div>
      ) : null}
      {project.linkLabel ? (
        <a
          className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em]"
          href={project.link}
          rel="noreferrer"
          target="_blank"
        >
          {project.linkIcon ? (
            <img
              alt=""
              aria-hidden="true"
              className="h-5 w-5"
              src={project.linkIcon}
            />
          ) : null}
          {project.linkLabel}
        </a>
      ) : null}
    </article>
  );
};

export default ProjectCard;
