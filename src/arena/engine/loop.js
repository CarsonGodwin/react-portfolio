// Fixed-timestep update, variable-rate render.
const STEP = 1 / 60;
const MAX_FRAME = 0.25;

export const createLoop = (update, render) => {
  let rafId = null;
  let last = 0;
  let acc = 0;
  let elapsed = 0;

  const frame = (now) => {
    const dt = Math.min((now - last) / 1000 || 0, MAX_FRAME);
    last = now;
    acc += dt;
    while (acc >= STEP) {
      update(STEP, elapsed);
      elapsed += STEP;
      acc -= STEP;
    }
    render(elapsed);
    rafId = window.requestAnimationFrame(frame);
  };

  return {
    start() {
      if (rafId !== null) return;
      last = performance.now();
      acc = 0;
      rafId = window.requestAnimationFrame(frame);
    },
    stop() {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    }
  };
};
