import React, { Suspense, lazy, useCallback, useEffect, useState } from "react";
import Rail from "./components/layout/Rail";
import TopBar from "./components/layout/TopBar";
import About from "./components/sections/About";
import Work from "./components/sections/Work";
import Experience from "./components/sections/Experience";
import Stack from "./components/sections/Stack";
import Contact from "./components/sections/Contact";
import useArenaEligibility from "./hooks/useArenaEligibility";
import useTheme from "./hooks/useTheme";

// Arena mode is an optional, desktop-only layer. It's lazy-loaded so the
// page pays nothing for it until someone enters.
const Arena = lazy(() => import("./arena/Arena"));

const ARENA_HASH = "#arena";

const App = () => {
  const arenaEligible = useArenaEligibility();
  const { theme, toggle: toggleTheme } = useTheme();
  const [mode, setMode] = useState(() =>
    typeof window !== "undefined" && window.location.hash === ARENA_HASH ? "arena" : "classic"
  );
  const inArena = mode === "arena" && arenaEligible;

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
          <div className="flex min-h-screen items-center justify-center bg-bg font-mono text-xs text-muted">
            Loading…
          </div>
        }
      >
        <Arena onExit={exitArena} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text" id="top">
      <TopBar
        theme={theme}
        onToggleTheme={toggleTheme}
        arenaAvailable={arenaEligible}
        onEnterArena={enterArena}
      />
      <div className="mx-auto max-w-6xl px-6 lg:grid lg:grid-cols-12 lg:gap-x-20">
        <div className="lg:col-span-4">
          <Rail />
        </div>
        <main className="flex flex-col gap-20 py-16 lg:col-span-8 lg:py-20" id="main">
          <About />
          <Work />
          <Experience />
          <Stack />
          <Contact />
        </main>
      </div>
    </div>
  );
};

export default App;
