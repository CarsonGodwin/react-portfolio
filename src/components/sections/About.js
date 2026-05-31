import React from "react";

const About = () => {
  return (
    <section className="px-6 py-5" id="about">
      <div className="mx-auto flex max-w-6xl flex-col gap-5">
        <div data-reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            About
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-text">Brief Background</h2>
        </div>
        <p className="max-w-4xl text-base leading-relaxed text-muted" data-reveal>
          I'm a backend engineer and technical co-founder based in Raleigh, NC. I co-founded Impact Point, a live multiplayer game on Steam with 280,000+ registered players, where I own the real-time infrastructure and cloud architecture. I also work on data pipelines and backend systems at Kimley-Horn. I graduated from UNCW in December 2024 with a B.S. in Computer Science, where I published an IEEE paper as first author and founded the ACM chapter. I enjoy pickleball, hiking, solving difficult problems and building systems that have to work under real pressure.
        </p>
        <div className="mt-3" data-reveal>
          <a
            className="inline-flex items-center justify-center gap-3 rounded-full border border-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-text transition hover:border-accent/70 hover:text-accent"
            href="mailto:carson@carsongodwin.com"
          >
            <span>Email Me</span>
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 7.5v9a2.25 2.25 0 0 1-2.25 2.25h-15A2.25 2.25 0 0 1 2.25 16.5v-9m19.5 0A2.25 2.25 0 0 0 19.5 5.25h-15A2.25 2.25 0 0 0 2.25 7.5m19.5 0-7.628 5.085a2.25 2.25 0 0 1-2.244 0L2.25 7.5"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
