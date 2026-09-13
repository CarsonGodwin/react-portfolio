export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const lerp = (a, b, t) => a + (b - a) * t;

export const dist2 = (ax, ay, bx, by) => {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
};

export const circlesOverlap = (a, b) => {
  const r = a.radius + b.radius;
  return dist2(a.x, a.y, b.x, b.y) <= r * r;
};
