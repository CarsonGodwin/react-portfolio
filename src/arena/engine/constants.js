export const WORLD_W = 2400;
export const WORLD_H = 1600;

export const PLAYER = {
  radius: 14,
  accel: 1600,
  maxSpeed: 440,
  friction: 3.2,
  fireRate: 7,
  spawn: { x: WORLD_W / 2, y: WORLD_H / 2 }
};

export const BULLET = {
  speed: 950,
  life: 1.1,
  radius: 3
};

export const TARGET_HP = 3;

export const COLORS = {
  bg: "#0d0f14",
  text: "#e6edf3",
  muted: "#9cb2c1",
  accent: "#2cb9ae",
  gridMinor: "rgba(255,255,255,0.035)",
  gridMajor: "rgba(255,255,255,0.07)",
  zone: "rgba(255,255,255,0.10)",
  groups: {
    languages: "#2cb9ae",
    frameworks: "#8b7cf6",
    cloud: "#f5a524"
  }
};
