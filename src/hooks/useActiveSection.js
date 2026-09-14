import { useEffect, useState } from "react";

// The active section is the last one whose top has crossed a line ~35% down
// the viewport. At the very bottom of the page the last section wins, so
// short final sections still light up.
const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0] || null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = ids[0] || null;
      if (atBottom) {
        current = ids[ids.length - 1];
      } else {
        ids.forEach((id) => {
          const node = document.getElementById(id);
          if (node && node.getBoundingClientRect().top <= line) current = id;
        });
      }
      setActive((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [ids]);

  return active;
};

export default useActiveSection;
