import React, { useEffect } from "react";
import ProjectCard from "../../components/cards/ProjectCard";
import RoleCard from "../../components/cards/RoleCard";
import githubLogo from "../../assets/images/whiteGitHub.png";
import linkedinLogo from "../../assets/images/linkedin.png";

const KIND_LABEL = {
  project: "Project",
  role: "Experience",
  contact: "Contact"
};

const ContactCard = ({ contact }) => (
  <div className="flex flex-col gap-6 rounded-xl border border-border bg-surface p-6">
    <div>
      <p className="text-sm text-muted">Email</p>
      <a className="mt-2 block text-base font-semibold text-text" href={`mailto:${contact.email}`}>
        {contact.email}
      </a>
    </div>
    <div className="flex flex-wrap gap-6 text-sm">
      <a
        className="inline-flex items-center gap-2 text-muted underline underline-offset-4 transition hover:text-text"
        href={contact.linkedin}
        rel="noreferrer"
        target="_blank"
      >
        <img alt="LinkedIn" className="h-4 w-4" src={linkedinLogo} />
        LinkedIn
      </a>
      <a
        className="inline-flex items-center gap-2 text-muted underline underline-offset-4 transition hover:text-text"
        href={contact.github}
        rel="noreferrer"
        target="_blank"
      >
        <img alt="GitHub" className="h-4 w-4" src={githubLogo} style={{ filter: "var(--logo-filter)" }} />
        GitHub
      </a>
    </div>
  </div>
);

const EntityModal = ({ entity, onClose }) => {
  useEffect(() => {
    if (!entity) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [entity, onClose]);

  if (!entity) return null;

  return (
    <div
      className="absolute inset-0 z-20 flex cursor-auto items-center justify-center bg-bg/80 p-6 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={entity.label}
    >
      <div className="flex max-h-full w-full max-w-2xl flex-col gap-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {KIND_LABEL[entity.kind]}
          </p>
          <button
            className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text transition hover:border-accent/70 hover:text-accent"
            onClick={onClose}
            type="button"
          >
            Close · Esc
          </button>
        </div>
        {entity.kind === "project" ? <div className="rounded-xl border border-border bg-surface p-6"><ProjectCard project={entity.data} /></div> : null}
        {entity.kind === "role" ? <div className="rounded-xl border border-border bg-surface px-6"><RoleCard role={entity.data} /></div> : null}
        {entity.kind === "contact" ? <ContactCard contact={entity.data} /> : null}
      </div>
    </div>
  );
};

export default EntityModal;
