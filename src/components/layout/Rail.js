import React from "react";
import resumePdf from "../../assets/images/Carson_Godwin_Resume.pdf";
import contact from "../../data/contact";
import sections from "../../data/sections";
import useActiveSection from "../../hooks/useActiveSection";
import { accentStyle } from "../../theme";

const NAV_IDS = sections.map((item) => item.id);

const Rail = () => {
  const active = useActiveSection(NAV_IDS);

  return (
    <aside className="flex flex-col gap-12 pt-14 lg:sticky lg:top-0 lg:h-screen lg:justify-start lg:gap-24 lg:py-20">
      <div>
        <a className="font-display text-[2rem] font-semibold leading-none tracking-tight text-accent" href="#top">
          Carson Godwin
        </a>
        <p className="mt-3 text-base text-text">Backend engineer &amp; technical co-founder</p>
        <p className="mt-1 text-sm text-muted">{contact.location}</p>

        <nav className="mt-12 hidden lg:block" aria-label="Sections">
          <ul className="flex flex-col gap-2 text-sm">
            {sections.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} style={accentStyle(item.accent)}>
                  <a
                    className={`group inline-flex items-center gap-3 transition-colors ${
                      isActive ? "tint-text" : "text-muted hover:text-text"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                    href={`#${item.id}`}
                  >
                    <span
                      className={`h-px transition-all ${
                        isActive ? "w-8 bg-[rgb(var(--p))]" : "w-4 bg-current group-hover:w-8"
                      }`}
                      aria-hidden="true"
                    />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

      </div>

      <div className="flex flex-col gap-6 text-sm">
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li><a className="link" href={`mailto:${contact.email}`}>Email</a></li>
          <li><a className="link" href={contact.github} rel="noreferrer" target="_blank">GitHub</a></li>
          <li><a className="link" href={contact.linkedin} rel="noreferrer" target="_blank">LinkedIn</a></li>
          <li><a className="link" href={resumePdf} rel="noreferrer" target="_blank">Resume</a></li>
        </ul>
      </div>
    </aside>
  );
};

export default Rail;
