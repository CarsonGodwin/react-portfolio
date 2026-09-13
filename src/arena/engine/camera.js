import { WORLD_W, WORLD_H } from "./constants";
import { clamp, lerp } from "./physics";

export const createCamera = () => ({
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  shake: 0
});

export const resizeCamera = (camera, w, h) => {
  camera.w = w;
  camera.h = h;
};

export const followCamera = (camera, target, dt, snap = false) => {
  const goalX = target.x - camera.w / 2;
  const goalY = target.y - camera.h / 2;
  const t = snap ? 1 : 1 - Math.exp(-8 * dt);
  camera.x = lerp(camera.x, goalX, t);
  camera.y = lerp(camera.y, goalY, t);
  // Clamp so the viewport never shows outside the world; if the viewport is
  // larger than the world, center it.
  camera.x = camera.w >= WORLD_W ? (WORLD_W - camera.w) / 2 : clamp(camera.x, 0, WORLD_W - camera.w);
  camera.y = camera.h >= WORLD_H ? (WORLD_H - camera.h) / 2 : clamp(camera.y, 0, WORLD_H - camera.h);
  camera.shake = Math.max(0, camera.shake - dt * 3);
};

export const screenToWorld = (camera, sx, sy) => ({
  x: sx + camera.x,
  y: sy + camera.y
});
