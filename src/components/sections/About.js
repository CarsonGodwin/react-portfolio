import React from "react";
import Section from "../ui/Section";

const About = () => (
  <Section id="about" label="About">
    <p className="mb-8 max-w-[22ch] font-display text-3xl font-semibold leading-[1.15] tracking-tight text-text md:text-4xl">
      Building <span>backend systems</span> and other things I find interesting.
    </p>
    <div className="flex max-w-prose flex-col gap-5 text-[17px] leading-relaxed text-text">
      <p>
        I'm a backend engineer and technical co-founder. For Impact Point I work on the
        infrastructure and cloud architecture behind a live game with 280,000+ players. I'm responsible for
        server-side stats, progression and the platform migration that moved every
        account from Steamworks to PlayFab to allow for cross platform play.
      </p>
      <p>
        At Kimley-Horn I'm a full-stack developer working on backend services with an Angular frontend. Before that I studied
        computer science at UNCW (B.S., December 2024), publishing an IEEE paper as first author,
        and founded my school's ACM chapter.
      </p>
    </div>
  </Section>
);

export default About;
