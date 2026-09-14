// Physics tunables. Positions are in CSS pixels; Matter's defaults are tuned
// for roughly that scale so most of these stay close to stock.
export const GRAVITY = 1;

export const BODY = {
  project: { density: 0.0012, restitution: 0.32, friction: 0.55, frictionAir: 0.012 },
  role: { density: 0.001, restitution: 0.42, friction: 0.35, frictionAir: 0.012 },
  skill: { density: 0.0008, restitution: 0.86, friction: 0.04, frictionAir: 0.006 },
  contact: { density: 0.0016, restitution: 0.5, friction: 0.3, frictionAir: 0.01 }
};

export const MOUSE = {
  stiffness: 0.2,
  damping: 0.1,
  // A press that ends within these bounds counts as a click, not a drag.
  clickDistance: 7,
  clickMs: 320
};

export const WALL = 240;
export const DROP_STAGGER_MS = 70;

// Speed at which a collision is loud enough to flash the body.
export const IMPACT_SPEED = 6;

export const COLORS = {
  bg: "#0c0c0e",
  surface: "#141418",
  text: "#ebebf0",
  muted: "#8c919e",
  accent: "#60a5fa",
  border: "rgba(255,255,255,0.10)",
  borderStrong: "rgba(255,255,255,0.22)",
  textRgb: "235,235,240",
  accentRgb: "96,165,250",
  // Project accents keyed by the `accent` field in src/data/projects.js.
  tints: {
    violet: "167,139,250",
    orange: "251,146,60",
    pink: "244,114,182",
    teal: "45,212,191",
    sky: "56,189,248",
    green: "52,211,153"
  }
};

// Skill groups reuse the project accent palette.
export const GROUP_TINT = {
  languages: "sky",
  frameworks: "violet",
  cloud: "green"
};

// Pull the live theme tokens (see src/index.css) into the canvas palette so
// the sandbox matches light/dark mode.
export const syncColorsWithTheme = () => {
  if (typeof window === "undefined") return;
  const css = getComputedStyle(document.documentElement);
  const triplet = (name) => css.getPropertyValue(name).trim().split(/\s+/).join(",");
  const rgb = (name) => `rgb(${triplet(name)})`;
  COLORS.bg = rgb("--c-bg");
  COLORS.surface = rgb("--c-surface");
  COLORS.text = rgb("--c-text");
  COLORS.muted = rgb("--c-muted");
  COLORS.accent = rgb("--c-accent");
  COLORS.border = css.getPropertyValue("--border").trim();
  COLORS.borderStrong = css.getPropertyValue("--border-strong").trim();
  COLORS.textRgb = triplet("--c-text");
  COLORS.accentRgb = triplet("--c-accent");
  Object.keys(COLORS.tints).forEach((key) => {
    COLORS.tints[key] = triplet(`--c-${key}`);
  });
};
