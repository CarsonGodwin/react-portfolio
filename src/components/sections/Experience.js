import React from "react";
import roles from "../../data/experience";
import RoleCard from "../cards/RoleCard";

const Experience = () => {
  return (
    <section className="px-6 py-5" id="work">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div data-reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Experience
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-text">
            Professional and Research Experience
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          {roles.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
