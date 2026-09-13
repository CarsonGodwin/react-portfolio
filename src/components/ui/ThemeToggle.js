import React from "react";

const Sun = () => (
  <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path strokeLinecap="round" d="M12 3v2m0 14v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M3 12h2m14 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
  </svg>
);

const Moon = () => (
  <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
);

// A real switch: knob slides between sun and moon.
const ThemeToggle = ({ theme, onToggle }) => {
  const isDark = theme !== "light";
  return (
    <button
      aria-checked={isDark}
      aria-label="Dark mode"
      className="relative inline-flex h-9 w-16 shrink-0 items-center rounded-full border border-border bg-surface transition-colors hover:border-[var(--border-strong)]"
      onClick={onToggle}
      role="switch"
      type="button"
    >
      <span className="absolute left-2 text-muted"><Sun /></span>
      <span className="absolute right-2 text-muted"><Moon /></span>
      <span
        className={`absolute top-1 h-7 w-7 rounded-full bg-text transition-transform duration-200 ${
          isDark ? "translate-x-[2.125rem]" : "translate-x-0.5"
        }`}
        aria-hidden="true"
      />
    </button>
  );
};

export default ThemeToggle;
