import { COLORS, WORLD_W, WORLD_H, TARGET_HP } from "./constants";

const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace';
const SANS = '"Inter", ui-sans-serif, system-ui, sans-serif';

const roundRect = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

const drawGrid = (ctx, camera) => {
  const minor = 80;
  const major = 400;
  const x0 = Math.floor(camera.x / minor) * minor;
  const y0 = Math.floor(camera.y / minor) * minor;
  ctx.lineWidth = 1;
  for (let x = x0; x <= camera.x + camera.w; x += minor) {
    ctx.strokeStyle = x % major === 0 ? COLORS.gridMajor : COLORS.gridMinor;
    ctx.beginPath();
    ctx.moveTo(x, Math.max(0, camera.y));
    ctx.lineTo(x, Math.min(WORLD_H, camera.y + camera.h));
    ctx.stroke();
  }
  for (let y = y0; y <= camera.y + camera.h; y += minor) {
    ctx.strokeStyle = y % major === 0 ? COLORS.gridMajor : COLORS.gridMinor;
    ctx.beginPath();
    ctx.moveTo(Math.max(0, camera.x), y);
    ctx.lineTo(Math.min(WORLD_W, camera.x + camera.w), y);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(44,185,174,0.4)";
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, WORLD_W, WORLD_H);
};

const drawZones = (ctx, zones) => {
  ctx.save();
  ctx.setLineDash([10, 10]);
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = COLORS.zone;
  Object.values(zones).forEach((z) => {
    roundRect(ctx, z.x, z.y, z.w, z.h, 24);
    ctx.stroke();
    ctx.fillStyle = COLORS.muted;
    ctx.font = `600 13px ${MONO}`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(z.label.toUpperCase().split("").join(" "), z.x + 22, z.y + 16);
  });
  ctx.restore();
};

const drawSignposts = (ctx, world) => {
  const { spawn, zones } = world;
  ctx.save();
  ctx.font = `600 12px ${MONO}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(156,178,193,0.75)";
  const offset = 120;
  const posts = [
    { z: zones.projects, x: spawn.x, y: spawn.y - offset },
    { z: zones.experience, x: spawn.x + offset + 40, y: spawn.y },
    { z: zones.skills, x: spawn.x, y: spawn.y + offset },
    { z: zones.contact, x: spawn.x - offset - 40, y: spawn.y }
  ];
  posts.forEach(({ z, x, y }) => {
    ctx.fillText(`${z.dir} ${z.label.toUpperCase()}`, x, y);
  });
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(spawn.x, spawn.y, 60, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
};

const drawTarget = (ctx, t, time) => {
  const flash = t.flash > 0;
  const color = flash ? "#ffffff" : t.cleared ? "rgba(44,185,174,0.55)" : COLORS.accent;
  ctx.save();
  ctx.translate(t.x, t.y);
  const pulse = t.cleared ? 0 : Math.sin(time * 2 + t.x) * 2;

  // Body
  ctx.lineWidth = flash ? 4 : 2;
  ctx.strokeStyle = color;
  ctx.fillStyle = t.cleared ? "rgba(44,185,174,0.06)" : "rgba(44,185,174,0.12)";
  if (t.cleared) ctx.setLineDash([6, 6]);
  ctx.beginPath();
  if (t.kind === "role") {
    const r = t.radius + pulse;
    ctx.moveTo(0, -r);
    ctx.lineTo(r, 0);
    ctx.lineTo(0, r);
    ctx.lineTo(-r, 0);
    ctx.closePath();
  } else {
    ctx.arc(0, 0, t.radius + pulse, 0, Math.PI * 2);
  }
  ctx.fill();
  ctx.stroke();
  ctx.setLineDash([]);

  // HP arc or checkmark
  if (t.cleared) {
    ctx.strokeStyle = COLORS.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(-3, 8);
    ctx.lineTo(12, -8);
    ctx.stroke();
  } else {
    const r = t.radius + 10;
    const gap = 0.18;
    const span = (Math.PI * 2) / TARGET_HP;
    for (let i = 0; i < TARGET_HP; i += 1) {
      ctx.beginPath();
      ctx.strokeStyle = i < t.hp ? COLORS.accent : "rgba(255,255,255,0.12)";
      ctx.lineWidth = 3;
      ctx.arc(0, 0, r, -Math.PI / 2 + i * span + gap / 2, -Math.PI / 2 + (i + 1) * span - gap / 2);
      ctx.stroke();
    }
  }

  // Label
  ctx.fillStyle = t.cleared ? COLORS.muted : COLORS.text;
  ctx.font = `600 13px ${SANS}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(t.label, 0, t.radius + 20);
  if (t.kind === "role") {
    ctx.fillStyle = COLORS.muted;
    ctx.font = `12px ${SANS}`;
    ctx.fillText(t.data.title, 0, t.radius + 38);
  }
  ctx.restore();
};

const drawContactPad = (ctx, pad, time) => {
  ctx.save();
  ctx.translate(pad.x, pad.y);
  const ring = (time * 40) % 60;
  ctx.strokeStyle = "rgba(44,185,174,0.25)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 3; i += 1) {
    const r = ((ring + i * 20) % 60) + pad.radius - 60;
    ctx.globalAlpha = 1 - ((ring + i * 20) % 60) / 60;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = pad.visited ? "rgba(44,185,174,0.55)" : COLORS.accent;
  ctx.beginPath();
  ctx.arc(0, 0, pad.radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = COLORS.text;
  ctx.font = `600 13px ${SANS}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("FLY IN TO CONNECT", 0, 0);
  ctx.restore();
};

const drawPickups = (ctx, pickups, time) => {
  pickups.forEach((p) => {
    if (p.collected) return;
    const bob = Math.sin(time * 2.2 + p.phase) * 4;
    const color = COLORS.groups[p.group];
    ctx.save();
    ctx.translate(p.x, p.y + bob);
    ctx.shadowColor = color;
    ctx.shadowBlur = 14;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, p.radius * 0.55, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = COLORS.muted;
    ctx.font = `11px ${SANS}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(p.label, 0, p.radius + 8);
    ctx.restore();
  });
};

const drawBullets = (ctx, bullets) => {
  ctx.save();
  ctx.strokeStyle = COLORS.accent;
  ctx.lineCap = "round";
  ctx.lineWidth = 3;
  ctx.shadowColor = COLORS.accent;
  ctx.shadowBlur = 8;
  bullets.forEach((b) => {
    const len = 0.018;
    ctx.beginPath();
    ctx.moveTo(b.x - b.vx * len, b.y - b.vy * len);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  });
  ctx.restore();
};

const drawParticles = (ctx, particles) => {
  particles.forEach((p) => {
    ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
};

const drawPlayer = (ctx, player, time) => {
  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.rotate(player.angle);
  const r = player.radius;

  if (player.thrust > 0.05) {
    const flick = 0.7 + Math.sin(time * 40) * 0.3;
    ctx.fillStyle = `rgba(44,185,174,${0.5 * player.thrust})`;
    ctx.beginPath();
    ctx.moveTo(-r * 0.6, -r * 0.4);
    ctx.lineTo(-r * (1.2 + flick * 0.8), 0);
    ctx.lineTo(-r * 0.6, r * 0.4);
    ctx.closePath();
    ctx.fill();
  }

  ctx.fillStyle = COLORS.bg;
  ctx.strokeStyle = COLORS.text;
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(r * 1.2, 0);
  ctx.lineTo(-r * 0.8, -r * 0.8);
  ctx.lineTo(-r * 0.4, 0);
  ctx.lineTo(-r * 0.8, r * 0.8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = COLORS.accent;
  ctx.beginPath();
  ctx.arc(r * 0.2, 0, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

const drawCrosshair = (ctx, mouse) => {
  if (!mouse.inside) return;
  ctx.save();
  ctx.strokeStyle = "rgba(230,237,243,0.8)";
  ctx.lineWidth = 1.5;
  const { x, y } = mouse;
  ctx.beginPath();
  ctx.arc(x, y, 9, 0, Math.PI * 2);
  ctx.moveTo(x - 14, y); ctx.lineTo(x - 5, y);
  ctx.moveTo(x + 5, y); ctx.lineTo(x + 14, y);
  ctx.moveTo(x, y - 14); ctx.lineTo(x, y - 5);
  ctx.moveTo(x, y + 5); ctx.lineTo(x, y + 14);
  ctx.stroke();
  ctx.restore();
};

export const render = (ctx, world, camera, mouse, time, dpr) => {
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, camera.w, camera.h);

  const sx = camera.shake > 0 ? (Math.random() - 0.5) * 8 * camera.shake : 0;
  const sy = camera.shake > 0 ? (Math.random() - 0.5) * 8 * camera.shake : 0;
  ctx.translate(-camera.x + sx, -camera.y + sy);

  drawGrid(ctx, camera);
  drawZones(ctx, world.zones);
  drawSignposts(ctx, world);
  drawPickups(ctx, world.pickups, time);
  world.targets.forEach((t) => drawTarget(ctx, t, time));
  drawContactPad(ctx, world.contactPad, time);
  drawParticles(ctx, world.particles);
  drawBullets(ctx, world.bullets);
  drawPlayer(ctx, world.player, time);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawCrosshair(ctx, mouse);
};
