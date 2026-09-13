import React from "react";

// Experience row. Current roles show their bullets; older ones collapse.
const Bullets = ({ bullets }) => (
  <ul className="mt-3 flex max-w-prose flex-col gap-2 text-sm leading-relaxed text-muted">
    {bullets.map((bullet) => (
      <li key={bullet} className="flex gap-3">
        <span className="mt-[0.7em] h-px w-3 shrink-0 bg-muted/60" aria-hidden="true" />
        <span>{bullet}</span>
      </li>
    ))}
  </ul>
);

const RoleCard = ({ role, collapsible = false }) => {
  const heading = (
    <>
      <h3 className="text-base font-semibold tracking-tight text-text">
        {role.title}
        <span className="tint-text font-normal"> · {role.company}</span>
      </h3>
      {role.subtitle ? <p className="mt-1 text-sm text-muted">{role.subtitle}</p> : null}
    </>
  );

  return (
    <article className="grid gap-2 py-6 md:grid-cols-[11rem_1fr] md:gap-8">
      <span className="tint-text tabular pt-0.5 font-mono text-xs">{role.range}</span>
      {collapsible ? (
        <details className="group">
          <summary>
            {heading}
            <span className="link mt-2 inline-block text-xs text-muted group-open:hidden">Details</span>
          </summary>
          <Bullets bullets={role.bullets} />
        </details>
      ) : (
        <div>
          {heading}
          <Bullets bullets={role.bullets} />
        </div>
      )}
    </article>
  );
};

export default RoleCard;
