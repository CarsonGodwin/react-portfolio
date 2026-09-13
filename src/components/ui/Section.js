import React from "react";
import { sectionAccent } from "../../data/sections";
import { accentStyle } from "../../theme";

const Section = ({ id, label, children }) => (
  <section id={id} className="scroll-mt-16" style={accentStyle(sectionAccent(id))}>
    <h2 className="tint-text font-display text-2xl font-semibold tracking-tight md:text-[1.75rem]">
      {label}
    </h2>
    <div className="mt-7">{children}</div>
  </section>
);

export default Section;
