import React from "react";

const Hero = ({ arenaAvailable = false, onEnterArena }) => {
  return (
    <section className="px-6 pb-8 pt-10 md:pt-14" id="hero">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div className="max-w-3xl">
          <h1
            className="text-4xl font-semibold leading-tight text-text md:text-5xl"
            data-reveal
          >
            Backend Engineer &amp; Technical Co-Founder
          </h1>
          {arenaAvailable ? (
            <div className="mt-6" data-reveal>
              <button
                className="inline-flex items-center gap-3 rounded-full border border-accent/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent transition hover:border-accent hover:bg-accent/10"
                onClick={onEnterArena}
                type="button"
              >
                <span>🎮 Explore this portfolio as a game</span>
              </button>
              <p className="mt-3 text-xs text-muted">
                I co-founded a multiplayer shooter, so this site has one too. Fly around, shoot the projects, collect the skills.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Hero;
