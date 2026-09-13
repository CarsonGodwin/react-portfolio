import React, { Suspense, lazy, useCallback, useEffect, useState } from "react";
import Header from "./components/layout/Header";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import useArenaEligibility from "./hooks/useArenaEligibility";

// Arena mode is an optional, desktop-only layer. It's lazy-loaded so the
// classic page pays nothing for it until someone enters.
const Arena = lazy(() => import("./arena/Arena"));

const ARENA_HASH = "#arena";

const useRevealOnScroll = (active) => {
  useEffect(() => {
    if (!active) return undefined;
    const elements = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!elements.length) {
      return undefined;
    }

    document.body.classList.add("js-reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return () => {
        document.body.classList.remove("js-reveal");
      };
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.body.classList.remove("js-reveal");
    };
  }, [active]);
};

const App = () => {
  const arenaEligible = useArenaEligibility();
  const [mode, setMode] = useState(() =>
    typeof window !== "undefined" && window.location.hash === ARENA_HASH ? "arena" : "classic"
  );
  const inArena = mode === "arena" && arenaEligible;

  useRevealOnScroll(!inArena);

  // Keep the mode in sync if the hash changes while the page is already open.
  useEffect(() => {
    const onHashChange = () => {
      setMode(window.location.hash === ARENA_HASH ? "arena" : "classic");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const enterArena = useCallback(() => {
    window.history.replaceState(null, "", ARENA_HASH);
    setMode("arena");
  }, []);

  const exitArena = useCallback(() => {
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    setMode("classic");
  }, []);

  if (inArena) {
    return (
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-background font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Loading arena…
          </div>
        }
      >
        <Arena onExit={exitArena} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text">
      <Header arenaAvailable={arenaEligible} onEnterArena={enterArena} />
      <main id="main">
        <Hero arenaAvailable={arenaEligible} onEnterArena={enterArena} />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </div>
  );
};

export default App;
