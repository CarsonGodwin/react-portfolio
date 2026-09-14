import { Constraint } from "matter-js";
import { COLORS } from "./constants";
import { FEATURED_TAG, FONTS } from "./bodies";

const tintOf = (entity) => (entity.tint ? COLORS.tints[entity.tint] : COLORS.accentRgb);

const roundRect = (ctx, w, h, r) => {
  const x = -w / 2;
  const y = -h / 2;
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
};

const drawBackground = (ctx, width, height) => {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, width, height);

  // Sparse dot grid, matching the site's quiet texture.
  const step = 32;
  ctx.fillStyle = `rgba(${COLORS.textRgb},0.07)`;
  for (let x = step; x < width; x += step) {
    for (let y = step; y < height; y += step) {
      ctx.fillRect(x - 0.5, y - 0.5, 1, 1);
    }
  }

  // Floor line so the bottom edge reads as a surface.
  ctx.fillStyle = COLORS.borderStrong;
  ctx.fillRect(0, height - 1, width, 1);
};

const drawLines = (ctx, entity, offsetY, color) => {
  ctx.font = entity.font;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const total = entity.lines.length * entity.lineHeight;
  entity.lines.forEach((line, i) => {
    ctx.fillText(line, 0, offsetY - total / 2 + entity.lineHeight * (i + 0.5));
  });
};

const drawProject = (ctx, entity, hovered) => {
  const tint = tintOf(entity);
  roundRect(ctx, entity.w, entity.h, entity.radius);
  ctx.fillStyle = `rgba(${tint},${hovered ? 0.3 : 0.18})`;
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = `rgba(${tint},${hovered || entity.opened ? 1 : 0.75})`;
  ctx.stroke();

  // Swatch + year in the top-left, like the project rows on the page.
  const left = -entity.w / 2 + 16;
  const top = -entity.h / 2 + 15;
  ctx.fillStyle = `rgb(${tint})`;
  ctx.fillRect(left, top - 4, 8, 8);
  ctx.font = FONTS.caption;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = COLORS.muted;
  ctx.fillText(entity.meta, left + 14, top);
  if (entity.featured) {
    ctx.textAlign = "right";
    ctx.fillStyle = `rgb(${tint})`;
    ctx.fillText(FEATURED_TAG, entity.w / 2 - 16, top);
  }

  drawLines(ctx, entity, 12, COLORS.text);
};

const drawRole = (ctx, entity, hovered) => {
  roundRect(ctx, entity.w, entity.h, entity.radius);
  ctx.fillStyle = hovered ? `rgba(${COLORS.accentRgb},0.14)` : COLORS.surface;
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = hovered || entity.opened ? COLORS.accent : COLORS.borderStrong;
  ctx.stroke();

  drawLines(ctx, entity, -7, COLORS.text);
  ctx.font = FONTS.caption;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = COLORS.accent;
  const total = entity.lines.length * entity.lineHeight;
  ctx.fillText(entity.meta, 0, -7 + total / 2 + 9);
};

const drawSkill = (ctx, entity, hovered) => {
  const tint = tintOf(entity);
  ctx.beginPath();
  ctx.arc(0, 0, entity.r, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${tint},${hovered ? 0.34 : 0.2})`;
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = `rgba(${tint},${hovered ? 1 : 0.8})`;
  ctx.stroke();
  drawLines(ctx, entity, 0, COLORS.text);
};

const drawContact = (ctx, entity, hovered) => {
  ctx.beginPath();
  ctx.arc(0, 0, entity.r, 0, Math.PI * 2);
  ctx.fillStyle = hovered ? COLORS.text : COLORS.accent;
  ctx.fill();
  const ink = COLORS.bg;
  drawLines(ctx, entity, -6, ink);
  ctx.font = FONTS.caption;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = ink;
  ctx.fillText(entity.meta, 0, 16);
};

const DRAW = { project: drawProject, role: drawRole, skill: drawSkill, contact: drawContact };

const TAU = Math.PI * 2;

// Every shape here is symmetric, so we can draw the face in whichever
// orientation reads best without lying about the physics: discs never
// rotate their label, and a crate that lands upside down is drawn flipped.
const faceAngle = (body) => {
  if (body.entity.shape === "circle") return 0;
  const a = ((body.angle % TAU) + TAU) % TAU;
  return a > Math.PI / 2 && a < (3 * Math.PI) / 2 ? body.angle + Math.PI : body.angle;
};

const drawBody = (ctx, body, hovered) => {
  const { entity } = body;
  ctx.save();
  ctx.translate(body.position.x, body.position.y);
  ctx.rotate(faceAngle(body));
  DRAW[entity.kind](ctx, entity, hovered);

  // Impact flash: brief bright wash that fades out.
  if (entity.flash > 0) {
    ctx.globalAlpha = entity.flash * 0.35;
    ctx.fillStyle = COLORS.text;
    if (entity.shape === "circle") {
      ctx.beginPath();
      ctx.arc(0, 0, entity.r, 0, Math.PI * 2);
      ctx.fill();
    } else {
      roundRect(ctx, entity.w, entity.h, entity.radius);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // Opened things wear a check pinned to their top-right corner. It's drawn
  // in the body's frame so it rides along as the block tumbles.
  if (entity.opened) {
    const badge = 9;
    let cx;
    let cy;
    if (entity.shape === "circle") {
      cx = entity.r * Math.SQRT1_2;
      cy = -entity.r * Math.SQRT1_2;
    } else {
      // Sit on the corner arc so it hugs pills and crates alike.
      const rr = Math.min(entity.radius, entity.w / 2, entity.h / 2);
      cx = entity.w / 2 - rr + rr * Math.SQRT1_2;
      cy = -entity.h / 2 + rr - rr * Math.SQRT1_2;
    }
    const fill = entity.kind === "contact" ? COLORS.text : `rgb(${tintOf(entity)})`;
    ctx.beginPath();
    ctx.arc(cx, cy, badge, 0, TAU);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = COLORS.bg;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 4, cy + 0.5);
    ctx.lineTo(cx - 1, cy + 3.5);
    ctx.lineTo(cx + 4.5, cy - 3);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = COLORS.bg;
    ctx.stroke();
  }
  ctx.restore();
};

const drawTether = (ctx, mouseConstraint) => {
  const { body, constraint } = mouseConstraint;
  if (!body) return;
  const from = mouseConstraint.mouse.position;
  const to = Constraint.pointBWorld(constraint);
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = `rgba(${COLORS.accentRgb},0.6)`;
  ctx.setLineDash([4, 5]);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.arc(from.x, from.y, 4, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.accent;
  ctx.fill();
};

export const render = (ctx, { width, height, bodies, hovered, mouseConstraint }) => {
  drawBackground(ctx, width, height);
  bodies.forEach((body) => drawBody(ctx, body, body === hovered));
  drawTether(ctx, mouseConstraint);
};
