// Inline style that exposes a project's accent to .swatch / .tint-* classes.
export const accentStyle = (accent) => ({ "--p": `var(--c-${accent || "accent"})` });
