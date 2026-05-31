import React from "react";
import resumePdf from "../../assets/images/Carson_Godwin_Resume.pdf";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0d0f14]/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a className="text-base font-semibold tracking-wide" href="#hero">
          Carson Godwin
        </a>
        <nav className="hidden items-center gap-6 text-sm text-muted sm:flex" aria-label="Primary">
          <a className="transition hover:text-text" href="#about">
            About
          </a>
          <a className="transition hover:text-text" href="#projects">
            Projects
          </a>
          <a className="transition hover:text-text" href="#work">
            Experience
          </a>
          <a className="transition hover:text-text" href="#skills">
            Skills
          </a>
          <a className="transition hover:text-text" href="#contact">
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            className="hidden rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text transition hover:border-accent/70 hover:text-accent md:inline-flex"
            href={resumePdf}
            rel="noreferrer"
            target="_blank"
          >
            Download Resume
          </a>
          <a
            className="rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0d0f14] transition hover:text-white"
            href="https://www.linkedin.com/in/carson-godwin/"
            rel="noreferrer"
            target="_blank"
          >
            Get in Touch
          </a>
        </div>
      </div>
      <div className="border-t border-white/5 sm:hidden">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-xs text-muted" aria-label="Primary">
          <a className="transition hover:text-text" href="#about">
            About
          </a>
          <a className="transition hover:text-text" href="#projects">
            Projects
          </a>
          <a className="transition hover:text-text" href="#work">
            Experience
          </a>
          <a className="transition hover:text-text" href="#skills">
            Skills
          </a>
          <a className="transition hover:text-text" href="#contact">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
