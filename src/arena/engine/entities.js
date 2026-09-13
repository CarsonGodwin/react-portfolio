import { BULLET, PLAYER, WORLD_W, WORLD_H, COLORS } from "./constants";
import { clamp, circlesOverlap, dist2 } from "./physics";

export const updatePlayer = (player, input, aimWorld, dt) => {
  const { x: ax, y: ay } = input.axis();
  const len = Math.hypot(ax, ay) || 1;
  player.vx += (ax / len) * PLAYER.accel * dt;
  player.vy += (ay / len) * PLAYER.accel * dt;

  const damp = Math.exp(-PLAYER.friction * dt);
  player.vx *= damp;
  player.vy *= damp;

  const speed = Math.hypot(player.vx, player.vy);
  if (speed > PLAYER.maxSpeed) {
    player.vx = (player.vx / speed) * PLAYER.maxSpeed;
    player.vy = (player.vy / speed) * PLAYER.maxSpeed;
  }

  player.x = clamp(player.x + player.vx * dt, player.radius, WORLD_W - player.radius);
  player.y = clamp(player.y + player.vy * dt, player.radius, WORLD_H - player.radius);
  player.thrust = ax !== 0 || ay !== 0 ? 1 : Math.max(0, player.thrust - dt * 6);

  if (aimWorld) {
    player.angle = Math.atan2(aimWorld.y - player.y, aimWorld.x - player.x);
  }
  player.cooldown = Math.max(0, player.cooldown - dt);
};

export const tryFire = (player, bullets) => {
  if (player.cooldown > 0) return false;
  player.cooldown = 1 / PLAYER.fireRate;
  const nose = player.radius + 4;
  bullets.push({
    x: player.x + Math.cos(player.angle) * nose,
    y: player.y + Math.sin(player.angle) * nose,
    vx: Math.cos(player.angle) * BULLET.speed + player.vx * 0.3,
    vy: Math.sin(player.angle) * BULLET.speed + player.vy * 0.3,
    life: BULLET.life,
    radius: BULLET.radius
  });
  return true;
};

export const updateBullets = (bullets, dt) => {
  for (let i = bullets.length - 1; i >= 0; i -= 1) {
    const b = bullets[i];
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.life -= dt;
    if (b.life <= 0 || b.x < 0 || b.y < 0 || b.x > WORLD_W || b.y > WORLD_H) {
      bullets.splice(i, 1);
    }
  }
};

export const spawnBurst = (particles, x, y, color, count = 18, power = 260) => {
  for (let i = 0; i < count; i += 1) {
    const a = (i / count) * Math.PI * 2 + Math.random() * 0.4;
    const s = power * (0.4 + Math.random() * 0.6);
    particles.push({
      x,
      y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s,
      life: 0.5 + Math.random() * 0.4,
      maxLife: 0.9,
      radius: 2 + Math.random() * 3,
      color
    });
  }
};

export const updateParticles = (particles, dt) => {
  for (let i = particles.length - 1; i >= 0; i -= 1) {
    const p = particles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vx *= 0.92;
    p.vy *= 0.92;
    p.life -= dt;
    if (p.life <= 0) particles.splice(i, 1);
  }
};

// Returns the target that was just destroyed (or re-opened), if any.
export const resolveBulletHits = (bullets, targets, particles, camera) => {
  let opened = null;
  for (let i = bullets.length - 1; i >= 0; i -= 1) {
    const b = bullets[i];
    for (let j = 0; j < targets.length; j += 1) {
      const t = targets[j];
      if (!circlesOverlap(b, t)) continue;
      bullets.splice(i, 1);
      if (t.cleared) {
        opened = opened || t;
        break;
      }
      t.hp -= 1;
      t.flash = 0.14;
      spawnBurst(particles, b.x, b.y, COLORS.accent, 5, 120);
      if (t.hp <= 0) {
        t.cleared = true;
        camera.shake = 1;
        spawnBurst(particles, t.x, t.y, COLORS.accent, 28, 320);
        opened = opened || t;
      }
      break;
    }
  }
  targets.forEach((t) => {
    t.flash = Math.max(0, t.flash - 1 / 60);
  });
  return opened;
};

export const resolvePickups = (player, pickups, particles) => {
  const picked = [];
  pickups.forEach((p) => {
    if (p.collected) return;
    if (dist2(player.x, player.y, p.x, p.y) <= (player.radius + p.radius + 6) ** 2) {
      p.collected = true;
      spawnBurst(particles, p.x, p.y, COLORS.groups[p.group], 10, 150);
      picked.push(p);
    }
  });
  return picked;
};

// The contact pad is entered, not shot. It re-arms once the player leaves.
export const resolveContactPad = (player, pad) => {
  const inside = dist2(player.x, player.y, pad.x, pad.y) <= (pad.radius - 10) ** 2;
  if (!inside) {
    if (dist2(player.x, player.y, pad.x, pad.y) > (pad.radius * 1.6) ** 2) pad.armed = true;
    return false;
  }
  if (!pad.armed) return false;
  pad.armed = false;
  pad.visited = true;
  return true;
};
