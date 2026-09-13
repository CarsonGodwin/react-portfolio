import React from "react";

const RoleCard = ({ role, reveal = true, className = "" }) => {
  return (
    <article
      className={`rounded-2xl border border-white/10 bg-white/5 p-6 ${className}`}
      {...(reveal ? { "data-reveal": true } : {})}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="text-lg font-semibold text-text">
            {role.title} | {role.company}
          </h3>
          <span className="text-sm text-white">{role.range}</span>
        </div>
        {role.subtitle ? (
          <p className="text-sm text-muted">{role.subtitle}</p>
        ) : null}
      </div>
      <ul className="mt-4 list-disc space-y-3 pl-5 text-sm text-muted">
        {role.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  );
};

export default RoleCard;
