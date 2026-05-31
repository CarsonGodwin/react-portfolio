import React from "react";

const Hero = () => {
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
