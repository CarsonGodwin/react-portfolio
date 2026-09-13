import React from "react";
import contact from "../../data/contact";
import Section from "../ui/Section";

const Contact = () => (
  <Section id="contact" label="Contact">
    <p className="max-w-prose text-[17px] leading-relaxed text-text">
      Email is the best way to reach me:{" "}
      <a className="link" href={`mailto:${contact.email}`}>
        {contact.email}
      </a>
      . <br></br>
      I'm also on{" "}
      <a className="link" href={contact.github} rel="noreferrer" target="_blank">
        GitHub
      </a>{" "}
      and{" "}
      <a className="link" href={contact.linkedin} rel="noreferrer" target="_blank">
        LinkedIn
      </a>
      .
    </p>
    <footer className="mt-16 flex flex-wrap gap-x-6 gap-y-1 border-t border-border pt-6 font-mono text-xs text-muted">
      <span>{contact.site}</span>
      <span>{contact.location}</span>
      <span>Updated {contact.updated}</span>
    </footer>
  </Section>
);

export default Contact;
