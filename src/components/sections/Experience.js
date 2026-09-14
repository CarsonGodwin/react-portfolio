import React from "react";
import roles from "../../data/experience";
import RoleCard from "../cards/RoleCard";
import Section from "../ui/Section";

const Experience = () => (
  <Section id="experience" label="Experience">
    <ol className="divide-y divide-border border-y border-border">
      {roles.map((role) => (
        <li key={role.id}>
          <RoleCard role={role} collapsible={!role.current} />
        </li>
      ))}
    </ol>
  </Section>
);

export default Experience;
