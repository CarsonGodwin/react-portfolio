import React from "react";

const skillGroups = [
  {
    label: "Languages",
    items: ["Python", "C#", "TypeScript", "JavaScript", "Dart"]
  },
  {
    label: "Frameworks & Tools",
    items: [".NET", "Angular", "Unity", "Flutter", "Git", "Azure DevOps (CI/CD)"]
  },
  {
    label: "Cloud & Databases",
    items: ["Azure", "Cosmos DB", "PlayFab", "Firebase", "Google Cloud"]
  }
];

const Skills = () => {
  return (
    <section className="px-6 py-5" id="skills">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div data-reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Skills
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-text">Core Stack</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
              data-reveal
            >
              <p className="text-sm font-semibold text-text">{group.label}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
