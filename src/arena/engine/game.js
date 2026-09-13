import { createWorld } from "./world";
import { createInput } from "./input";
import { createCamera, resizeCamera, followCamera, screenToWorld } from "./camera";
import { createLoop } from "./loop";
import { render } from "./render";
import {
  updatePlayer,
  tryFire,
  updateBullets,
  updateParticles,
  resolveBulletHits,
  resolvePickups,
  resolveContactPad
} from "./entities";

// Owns the whole simulation. React only starts/stops it, resizes it, and
// listens for "open this thing" / "picked this up" events.
export const createGame = (canvas, callbacks = {}) => {
  const ctx = canvas.getContext("2d");
  const world = createWorld();
  const camera = createCamera();
  const input = createInput(canvas);
  let dpr = 1;
  let paused = false;
  let pendingOpen = null;
  let openDelay = 0;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    resizeCamera(camera, w, h);
    followCamera(camera, world.player, 0, true);
  };

  const update = (dt) => {
    if (paused) return;

    const aim = input.state.mouse.inside
      ? screenToWorld(camera, input.state.mouse.x, input.state.mouse.y)
      : null;
    updatePlayer(world.player, input, aim, dt);
    if (input.firing()) tryFire(world.player, world.bullets);

    updateBullets(world.bullets, dt);
    updateParticles(world.particles, dt);

    const opened = resolveBulletHits(world.bullets, world.targets, world.particles, camera);
    if (opened && !pendingOpen) {
      pendingOpen = opened;
      openDelay = opened.cleared && opened.hp <= 0 ? 0.28 : 0;
    }

    const picked = resolvePickups(world.player, world.pickups, world.particles);
    if (picked.length && callbacks.onPickup) callbacks.onPickup(picked);

    if (resolveContactPad(world.player, world.contactPad) && callbacks.onOpen) {
      callbacks.onOpen(world.contactPad);
    }

    if (pendingOpen) {
      openDelay -= dt;
      if (openDelay <= 0) {
        const entity = pendingOpen;
        pendingOpen = null;
        if (callbacks.onOpen) callbacks.onOpen(entity);
      }
    }

    followCamera(camera, world.player, dt);
    if (input.state.hasMoved && callbacks.onFirstMove) {
      callbacks.onFirstMove();
      callbacks.onFirstMove = null;
    }
  };

  const draw = (time) => {
    render(ctx, world, camera, input.state.mouse, time, dpr);
  };

  const loop = createLoop(update, draw);

  return {
    world,
    resize,
    start() {
      resize();
      loop.start();
    },
    stop() {
      loop.stop();
      input.detach();
    },
    setPaused(value) {
      paused = value;
      if (value) input.state.keys.clear();
    },
    progress() {
      const projects = world.targets.filter((t) => t.kind === "project");
      const roles = world.targets.filter((t) => t.kind === "role");
      return {
        projects: [projects.filter((t) => t.cleared).length, projects.length],
        roles: [roles.filter((t) => t.cleared).length, roles.length],
        skills: [world.pickups.filter((p) => p.collected).length, world.pickups.length],
        contact: world.contactPad.visited
      };
    }
  };
};
