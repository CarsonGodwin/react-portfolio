import React from "react";
import skillGroups from "../../data/skills";
import Section from "../ui/Section";
import { accentStyle } from "../../theme";

const Stack = () => (
  <Section id="stack" label="Stack">
    <dl className="flex flex-col divide-y divide-border border-y border-border">
      {skillGroups.map((group) => (
        <div
          key={group.id}
          className="grid gap-1 py-4 md:grid-cols-[7rem_1fr] md:gap-8"
          style={accentStyle(group.accent)}
        >
          <dt className="tint-text pt-0.5 font-mono text-xs font-medium">{group.label}</dt>
          <dd className="text-[15px] text-text">{group.items.join(", ")}</dd>
        </div>
      ))}
    </dl>
  </Section>
);

export default Stack;
