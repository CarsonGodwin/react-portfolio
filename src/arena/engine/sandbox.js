import { Bodies, Body, Composite, Engine, Events, Mouse, MouseConstraint, Query, Vector } from "matter-js";
import { DROP_STAGGER_MS, GRAVITY, IMPACT_SPEED, MOUSE, WALL, syncColorsWithTheme } from "./constants";
import { buildBodies } from "./bodies";
import { render } from "./render";

const STEP_MS = 1000 / 60;
const MAX_STEPS = 4;

// Owns the physics world and the canvas. React only starts/stops it, resizes
// it, toggles a few switches, and listens for "open this thing" events.
export const createSandbox = (canvas, callbacks = {}) => {
  syncColorsWithTheme();
  const ctx = canvas.getContext("2d");
  const engine = Engine.create({ gravity: { x: 0, y: GRAVITY } });
  const { world } = engine;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let walls = [];
  let bodies = [];
  let hovered = null;
  let paused = false;
  let gravityOn = true;
  let raf = 0;
  let last = 0;
  let accumulator = 0;
  let press = null;
  let dropTimers = [];

  const mouse = Mouse.create(canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: { stiffness: MOUSE.stiffness, damping: MOUSE.damping }
  });
  Composite.add(world, mouseConstraint);
  // Matter hijacks the wheel for its own camera; the sandbox doesn't scroll.
  canvas.removeEventListener("wheel", mouse.mousewheel);

  const openable = () => bodies.filter((b) => b.entity.openable);

  const buildWalls = () => {
    Composite.remove(world, walls);
    const t = WALL;
    const opts = { isStatic: true, friction: 0.4, restitution: 0.4, label: "wall" };
    walls = [
      Bodies.rectangle(width / 2, height + t / 2, width + t * 2, t, opts),
      Bodies.rectangle(-t / 2, height / 2, t, height * 4, opts),
      Bodies.rectangle(width + t / 2, height / 2, t, height * 4, opts),
      // Ceiling sits well above the viewport so the entrance drop has room
      // and a hard toss can leave the screen and come back.
      Bodies.rectangle(width / 2, -height * 1.5 - t / 2, width + t * 2, t, opts)
    ];
    Composite.add(world, walls);
  };

  const keepInside = () => {
    bodies.forEach((body) => {
      const { x, y } = body.position;
      const nx = Math.min(Math.max(x, 40), width - 40);
      const ny = Math.min(y, height - 40);
      if (nx !== x || ny !== y) Body.setPosition(body, { x: nx, y: ny });
    });
  };

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Matter reports positions in backing-store pixels unless told otherwise.
    mouse.pixelRatio = dpr;
    buildWalls();
    keepInside();
  };

  const populate = () => {
    dropTimers.forEach((id) => window.clearTimeout(id));
    Composite.remove(world, bodies);
    const next = buildBodies(ctx, width);
    bodies = [];
    dropTimers = next.map((body, i) =>
      window.setTimeout(() => {
        bodies.push(body);
        Composite.add(world, body);
      }, i * DROP_STAGGER_MS)
    );
    if (callbacks.onProgress) callbacks.onProgress({ opened: 0, total: next.filter((b) => b.entity.openable).length });
  };

  const progress = () => {
    const all = openable();
    return { opened: all.filter((b) => b.entity.opened).length, total: all.length };
  };

  const bodyAt = (point) => Query.point(bodies, point)[0] || null;

  // Click vs. drag: a short press that barely moves opens the thing under the
  // cursor; anything longer is a throw and is left to the mouse constraint.
  const onPointerDown = (event) => {
    if (event.button !== 0) return;
    press = { x: event.clientX, y: event.clientY, t: performance.now() };
  };

  const onPointerUp = (event) => {
    if (!press || event.button !== 0) return;
    const moved = Math.hypot(event.clientX - press.x, event.clientY - press.y);
    const held = performance.now() - press.t;
    press = null;
    if (moved > MOUSE.clickDistance || held > MOUSE.clickMs) return;

    const body = bodyAt(mouse.position);
    if (!body) return;
    const { entity } = body;
    if (entity.openable) {
      entity.opened = true;
      if (callbacks.onOpen) callbacks.onOpen(entity);
      if (callbacks.onProgress) callbacks.onProgress(progress());
    } else {
      // Skills just hop when poked.
      Body.setVelocity(body, { x: (Math.random() - 0.5) * 6, y: -11 });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.3);
    }
  };

  const onPointerLeave = () => {
    press = null;
    hovered = null;
  };

  canvas.addEventListener("mousedown", onPointerDown);
  canvas.addEventListener("mouseup", onPointerUp);
  canvas.addEventListener("mouseleave", onPointerLeave);

  Events.on(engine, "collisionStart", ({ pairs }) => {
    pairs.forEach(({ bodyA, bodyB }) => {
      const speed = Vector.magnitude(Vector.sub(bodyA.velocity, bodyB.velocity));
      if (speed < IMPACT_SPEED) return;
      const strength = Math.min(1, speed / 20);
      [bodyA, bodyB].forEach((b) => {
        if (b.entity) b.entity.flash = Math.max(b.entity.flash, strength);
      });
    });
  });

  const updateCursor = () => {
    if (mouseConstraint.body) {
      canvas.style.cursor = "grabbing";
    } else if (hovered) {
      canvas.style.cursor = hovered.entity.openable ? "pointer" : "grab";
    } else {
      canvas.style.cursor = "default";
    }
  };

  const frame = (now) => {
    raf = window.requestAnimationFrame(frame);
    const delta = Math.min(now - last, STEP_MS * MAX_STEPS);
    last = now;

    if (!paused) {
      accumulator += delta;
      let steps = 0;
      while (accumulator >= STEP_MS && steps < MAX_STEPS) {
        Engine.update(engine, STEP_MS);
        accumulator -= STEP_MS;
        steps += 1;
      }
      bodies.forEach((b) => {
        b.entity.flash = Math.max(0, b.entity.flash - delta / 260);
      });
      hovered = mouseConstraint.body || bodyAt(mouse.position);
      updateCursor();
    }

    render(ctx, { width, height, bodies, hovered, mouseConstraint });
  };

  return {
    resize,
    start() {
      resize();
      // Measure labels with the real webfonts, not the fallbacks — but don't
      // hold the entrance hostage to a slow font fetch.
      const fonts = document.fonts?.ready || Promise.resolve();
      const timeout = new Promise((resolve) => window.setTimeout(resolve, 1200));
      Promise.race([fonts, timeout]).then(() => {
        if (!raf) return;
        populate();
      });
      last = performance.now();
      raf = window.requestAnimationFrame(frame);
    },
    stop() {
      window.cancelAnimationFrame(raf);
      raf = 0;
      dropTimers.forEach((id) => window.clearTimeout(id));
      canvas.removeEventListener("mousedown", onPointerDown);
      canvas.removeEventListener("mouseup", onPointerUp);
      canvas.removeEventListener("mouseleave", onPointerLeave);
      // Matter has no detach; unhook the listeners it added to the canvas.
      [
        ["mousemove", mouse.mousemove],
        ["mousedown", mouse.mousedown],
        ["mouseup", mouse.mouseup],
        ["touchmove", mouse.mousemove],
        ["touchstart", mouse.mousedown],
        ["touchend", mouse.mouseup]
      ].forEach(([type, handler]) => canvas.removeEventListener(type, handler));
      Composite.clear(world, false);
      Engine.clear(engine);
    },
    setPaused(value) {
      paused = value;
      if (value) {
        // Drop anything mid-drag, and forget the held button so the
        // constraint doesn't grab whatever is under the cursor on resume
        // (the matching mouseup lands on the modal, not the canvas).
        mouseConstraint.body = null;
        mouseConstraint.constraint.bodyB = null;
        mouse.button = -1;
        press = null;
      } else {
        last = performance.now();
        accumulator = 0;
      }
    },
    reset() {
      populate();
    },
    shake() {
      bodies.forEach((body) => {
        Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 22,
          y: gravityOn ? -8 - Math.random() * 12 : (Math.random() - 0.5) * 16
        });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.4);
      });
    },
    toggleGravity() {
      gravityOn = !gravityOn;
      engine.gravity.y = gravityOn ? GRAVITY : 0;
      if (!gravityOn) {
        // Give everything a nudge so it visibly floats apart.
        bodies.forEach((body) => {
          Body.setVelocity(body, { x: (Math.random() - 0.5) * 4, y: -1 - Math.random() * 3 });
          Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.06);
        });
      }
      return gravityOn;
    },
    progress
  };
};
