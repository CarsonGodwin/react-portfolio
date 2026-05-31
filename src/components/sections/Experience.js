import React from "react";

const roles = [
  {
    company: "Impact Point",
    title: "Backend Engineer & Co-Founder",
    range: "August 2025 – Present",
    subtitle: "Joined as technical co-founder to scale a live multiplayer game with 280,000+ players on Steam",
    bullets: [
      "Enhanced C# bot AI decision loops using static registries and zero-allocation targeting, eliminating over 400 frame-by-frame memory allocations per second to resolve severe 200ms+ GC-induced network latency spikes.",
      "Orchestrated a zero-downtime platform migration from Steamworks to PlayFab, preserving live player economy data and progression while enabling cross-platform mobile expansion.",
      "Optimized map loading pipeline using asynchronous asset streaming (lazy loading), reducing load times by 95% and eliminating main-thread blocking.",
      "Architected event-driven Azure Cloud Functions to validate and persist end-of-match player stats to PlayFab, moving win streak logic server-side to prevent client manipulation of progression data."
    ]
  },
  {
    company: "Kimley-Horn",
    title: "Software Engineer",
    range: "March 2025 – Present",
    bullets: [
      "Resolved a production outage on the core analytics engine via emergency patch, converting O(n) lookups to O(1) indexing and parallelizing async REST API calls, cutting load times by 50%+ and backend latency by 20%.",
      "Built a self-service document management portal on Azure Blob Storage, eliminating developer dependency for stakeholder-managed content and reducing update time from 15 minutes to under 10 seconds.",
      "Refactored the Project Notes module full-stack, replacing collection-scan queries with Cosmos DB point reads by document ID, eliminating unnecessary RU consumption and reducing query overhead across client workloads."
    ]
  },
  {
    company: "Infosys",
    title: "Software Engineer Intern",
    range: "May – July 2024",
    bullets: [
      "Built a full-stack AI documentation assistant (Flask, Azure OpenAI) that let non-technical stakeholders generate structured client deliverables without developer involvement, reducing creation time from 3–4 hours to under 5 minutes.",
      "Engineered the backend logic using LangChain, Pandas, and Azure OpenAI to parse Excel requirements and generate reliable, strictly formatted outputs via few-shot prompting."
    ]
  },
  {
    company: "UNCW College of Science and Engineering",
    title: "ML Research Assistant",
    range: "Sept 2022 – Jan 2024",
    bullets: [
      "First author on a published IEEE paper on search personalization; engineered a custom Python automation suite (Selenium, BeautifulSoup) to harvest 10,000+ search results for analysis.",
      "Built a \"virtual personality\" simulation tool to mimic organic user behavior, generating a dataset used to train ML models on search engine privacy algorithms."
    ]
  }
];

const Experience = () => {
  return (
    <section className="px-6 py-5" id="work">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div data-reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Experience
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-text">
            Professional and Research Experience
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          {roles.map((role) => (
            <article
              key={`${role.company}-${role.title}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
              data-reveal
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-lg font-semibold text-text">
                    {role.title} | {role.company}
                  </h3>
                  <span className="text-sm text-white">{role.range}</span>
                </div>
                {role.subtitle ? (
                  <p className="text-sm text-muted">{role.subtitle}</p>
                ) : null}
              </div>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm text-muted">
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
