import { useEffect, useState } from "react";

// Arena mode is desktop-only: needs a real pointer, enough width, and no
// reduced-motion preference. Everything else stays on the classic page.
const QUERIES = [
  "(pointer: fine)",
  "(min-width: 1024px)",
  "(prefers-reduced-motion: no-preference)"
];

const evaluate = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  QUERIES.every((query) => window.matchMedia(query).matches);

const useArenaEligibility = () => {
  const [eligible, setEligible] = useState(evaluate);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }
    const lists = QUERIES.map((query) => window.matchMedia(query));
    const update = () => setEligible(evaluate());
    lists.forEach((list) => list.addEventListener("change", update));
    return () => lists.forEach((list) => list.removeEventListener("change", update));
  }, []);

  return eligible;
};

export default useArenaEligibility;
