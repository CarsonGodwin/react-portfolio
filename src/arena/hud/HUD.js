import React from "react";

const Key = ({ children }) => (
  <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.65rem] text-text">
    {children}
  </kbd>
);

const Control = ({ label, hint, active, onClick }) => (
  <button
    className={`pointer-events-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur transition ${
      active
        ? "border-accent/70 bg-accent/15 text-accent hover:bg-accent/25"
        : "border-border bg-bg/75 text-text hover:border-accent/70 hover:text-accent"
    }`}
    onClick={onClick}
    type="button"
  >
    {label}
    <Key>{hint}</Key>
  </button>
);

const HUD = ({ progress, gravityOn, showHint, toast, onExit, onShake, onReset, onToggleGravity }) => (
  <div className="pointer-events-none absolute inset-0 z-10 font-mono text-xs">
    <div className="absolute left-6 top-5 flex items-center gap-4">
      <button
        className="pointer-events-auto rounded-full border border-border bg-bg/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text backdrop-blur transition hover:border-accent/70 hover:text-accent"
        onClick={onExit}
        type="button"
      >
        ← Exit
      </button>
      <span className="font-display text-sm font-semibold tracking-tight text-text">Carson Godwin</span>
      <span className="hidden text-muted md:inline">Sandbox</span>
    </div>

    <div className="absolute left-1/2 top-5 flex -translate-x-1/2 items-baseline gap-2 rounded-full border border-border bg-bg/75 px-5 py-2 backdrop-blur">
      <span className="text-muted">Opened</span>
      <span className="tabular font-semibold text-text">
        {progress.opened}/{progress.total}
      </span>
    </div>

    <div className="absolute right-6 top-5 flex items-center gap-2">
      <Control label={gravityOn ? "Gravity on" : "Zero-g"} hint="G" active={!gravityOn} onClick={onToggleGravity} />
      <Control label="Shake" hint="Space" onClick={onShake} />
      <Control label="Reset" hint="R" onClick={onReset} />
    </div>

    {toast ? (
      <div className="absolute left-1/2 top-20 -translate-x-1/2 rounded-full border border-accent/60 bg-bg/85 px-5 py-2 text-accent backdrop-blur">
        {toast}
      </div>
    ) : null}

    <div
      className={`absolute bottom-6 left-6 flex flex-col gap-1.5 rounded-2xl border border-border bg-bg/75 px-5 py-4 text-muted backdrop-blur transition-opacity duration-700 ${
        showHint ? "opacity-100" : "opacity-0"
      }`}
    >
      <span>
        <span className="text-text">Drag</span> anything to toss it around
      </span>
      <span>
        <span className="text-text">Click</span> a project, role, or the <span className="text-accent">@</span> to open it
      </span>
      <span>Poke a skill to make it hop</span>
    </div>
  </div>
);

export default HUD;
