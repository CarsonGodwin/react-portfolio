import React from "react";
import skillGroups from "../../data/skills";

const GROUP_CLASS = {
  languages: "border-[#2cb9ae]/60 text-[#2cb9ae]",
  frameworks: "border-[#8b7cf6]/60 text-[#8b7cf6]",
  cloud: "border-[#f5a524]/60 text-[#f5a524]"
};

const Stat = ({ label, value }) => (
  <span className="inline-flex items-baseline gap-2">
    <span className="text-muted">{label}</span>
    <span className="font-semibold text-text">{value}</span>
  </span>
);

const HUD = ({ progress, collected, showHint, toast, onExit }) => {
  const groupOf = (label) => skillGroups.find((g) => g.items.includes(label))?.id;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 font-mono text-xs">
      <div className="absolute left-6 top-5 flex items-center gap-4">
        <button
          className="pointer-events-auto rounded-full border border-white/10 bg-[#0d0f14]/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text backdrop-blur transition hover:border-accent/70 hover:text-accent"
          onClick={onExit}
          type="button"
        >
          ← Exit arena
        </button>
        <span className="text-sm font-sans font-semibold tracking-wide text-text">Carson Godwin</span>
      </div>

      <div className="absolute left-1/2 top-5 flex -translate-x-1/2 items-center gap-5 rounded-full border border-white/10 bg-[#0d0f14]/70 px-5 py-2 backdrop-blur">
        <Stat label="Projects" value={`${progress.projects[0]}/${progress.projects[1]}`} />
        <Stat label="Experience" value={`${progress.roles[0]}/${progress.roles[1]}`} />
        <Stat label="Skills" value={`${progress.skills[0]}/${progress.skills[1]}`} />
        <Stat label="Contact" value={progress.contact ? "✓" : "–"} />
      </div>

      {toast ? (
        <div className="absolute left-1/2 top-20 -translate-x-1/2 rounded-full border border-accent/60 bg-[#0d0f14]/85 px-5 py-2 text-accent backdrop-blur">
          🏆 {toast}
        </div>
      ) : null}

      <div
        className={`absolute bottom-6 left-6 flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#0d0f14]/70 px-5 py-4 text-muted backdrop-blur transition-opacity duration-700 ${
          showHint ? "opacity-100" : "opacity-0"
        }`}
      >
        <span><span className="text-text">WASD</span> / arrows to fly</span>
        <span><span className="text-text">Mouse</span> to aim · <span className="text-text">Click</span> or <span className="text-text">Space</span> to fire</span>
        <span>Shoot a target to open it · Fly over skills to collect them</span>
      </div>

      <div className="absolute bottom-6 right-6 flex max-w-md flex-wrap justify-end gap-2">
        {collected.map((label) => (
          <span
            key={label}
            className={`rounded-full border bg-[#0d0f14]/70 px-3 py-1 backdrop-blur ${GROUP_CLASS[groupOf(label)] || "border-white/10 text-muted"}`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HUD;
