import React from "react";
import ThemeToggle from "../ui/ThemeToggle";

const Gamepad = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8.5h10a4.5 4.5 0 0 1 4.35 5.65l-.82 3.2a2.25 2.25 0 0 1-4.1.55l-1.1-1.8H8.67l-1.1 1.8a2.25 2.25 0 0 1-4.1-.55l-.82-3.2A4.5 4.5 0 0 1 7 8.5Z" />
    <path strokeLinecap="round" d="M8 11v4m-2-2h4m7-1h.01m2 2h.01" />
  </svg>
);

const TopBar = ({ theme, onToggleTheme, arenaAvailable = false, onEnterArena }) => (
  <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-bg/90 px-6 py-3 backdrop-blur">
    <a className="font-display text-lg font-semibold tracking-tight text-accent lg:hidden" href="#top">
      Carson Godwin
    </a>
    <div className="ml-auto flex items-center gap-5 text-muted">
      {arenaAvailable ? (
        <button
          aria-label="Open the physics sandbox version of this portfolio"
          className="group inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-3 py-1.5 text-left text-accent transition hover:border-accent hover:bg-accent/20 hover:text-text"
          onClick={onEnterArena}
          type="button"
        >
          <Gamepad />
          <span className="flex flex-col leading-none">
            <span className="font-display text-sm font-semibold tracking-tight">Sandbox</span>
            <span className="mt-0.5 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-accent/75 group-hover:text-accent">
              Physics mode
            </span>
          </span>
        </button>
      ) : null}
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </div>
  </div>
);

export default TopBar;
