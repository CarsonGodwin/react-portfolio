import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";

const readTheme = () =>
  typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";

const useTheme = () => {
  const [theme, setThemeState] = useState(readTheme);

  const apply = useCallback((next, persist) => {
    document.documentElement.setAttribute("data-theme", next);
    setThemeState(next);
    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {
        /* storage unavailable; theme still applies for this visit */
      }
    }
  }, []);

  const toggle = useCallback(() => {
    apply(readTheme() === "light" ? "dark" : "light", true);
  }, [apply]);

  // Follow the OS only while the visitor hasn't chosen explicitly.
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return undefined;
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (event) => {
      let saved = null;
      try {
        saved = localStorage.getItem(STORAGE_KEY);
      } catch (e) {
        /* ignore */
      }
      if (saved !== "light" && saved !== "dark") apply(event.matches ? "light" : "dark", false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [apply]);

  return { theme, toggle };
};

export default useTheme;
