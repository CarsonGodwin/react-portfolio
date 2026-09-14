import { Bodies, Body } from "matter-js";
import projects from "../../data/projects";
import roles from "../../data/experience";
import skillGroups from "../../data/skills";
import contact from "../../data/contact";
import { BODY, GROUP_TINT } from "./constants";

export const FONTS = {
  project: '600 15px "Bricolage Grotesque", Inter, ui-sans-serif, system-ui, sans-serif',
  projectFeatured: '600 19px "Bricolage Grotesque", Inter, ui-sans-serif, system-ui, sans-serif',
  role: '600 15px "Bricolage Grotesque", Inter, ui-sans-serif, system-ui, sans-serif',
  caption: '500 10px "JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
  skill: '500 11px "JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
  contact: '600 26px "Bricolage Grotesque", Inter, ui-sans-serif, system-ui, sans-serif'
};

// Greedy word wrap. Returns at most `maxLines` lines; the last one is
// ellipsised if the text doesn't fit.
const wrap = (ctx, text, maxWidth, maxLines) => {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width <= maxWidth || !line) {
      line = next;
    } else {
      lines.push(line);
      line = word;
    }
  });
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    let last = kept[maxLines - 1];
    while (last.length > 1 && ctx.measureText(`${last}…`).width > maxWidth) {
      last = last.slice(0, -1).trimEnd();
    }
    kept[maxLines - 1] = `${last}…`;
    return kept;
  }
  return lines;
};

const widest = (ctx, lines) => Math.max(...lines.map((l) => ctx.measureText(l).width));
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export const FEATURED_TAG = "★ FEATURED";

// Short project names for the crate face; the full title lives in the modal.
const projectLabel = (project) => project.title.split(" | ")[0];

const buildProject = (ctx, project) => {
  const font = project.featured ? FONTS.projectFeatured : FONTS.project;
  const lineHeight = project.featured ? 24 : 20;
  ctx.font = font;
  const lines = wrap(ctx, projectLabel(project), 220, 2);
  // The header row (swatch + year, plus the FEATURED tag on the right) must
  // fit too; see drawProject for the matching layout.
  ctx.font = FONTS.caption;
  const header =
    16 + 14 + ctx.measureText(project.year).width + (project.featured ? 12 + ctx.measureText(FEATURED_TAG).width : 0) + 16;
  ctx.font = font;
  const w = clamp(Math.max(widest(ctx, lines) + 64, header), 150, 300);
  const h = lines.length * lineHeight + 54;
  return {
    entity: {
      kind: "project",
      id: project.id,
      label: project.title,
      lines,
      font,
      lineHeight,
      meta: project.year,
      tint: project.accent,
      featured: Boolean(project.featured),
      data: project,
      shape: "rect",
      w,
      h,
      radius: 10,
      openable: true,
      flash: 0
    },
    make: (x, y) => Bodies.rectangle(x, y, w, h, { chamfer: { radius: 10 }, ...BODY.project })
  };
};

const buildRole = (ctx, role) => {
  ctx.font = FONTS.role;
  const lines = wrap(ctx, role.company, 200, 2);
  ctx.font = FONTS.caption;
  const caption = wrap(ctx, role.title.toUpperCase(), 220, 1)[0];
  ctx.font = FONTS.role;
  const w = clamp(Math.max(widest(ctx, lines), ctx.measureText(caption).width * 0.72) + 56, 170, 300);
  const h = lines.length * 20 + 42;
  return {
    entity: {
      kind: "role",
      id: role.id,
      label: role.company,
      lines,
      font: FONTS.role,
      lineHeight: 20,
      meta: caption,
      tint: null,
      data: role,
      shape: "rect",
      w,
      h,
      radius: h / 2,
      openable: true,
      flash: 0
    },
    make: (x, y) => Bodies.rectangle(x, y, w, h, { chamfer: { radius: h / 2 - 1 }, ...BODY.role })
  };
};

const buildSkill = (ctx, label, group, index) => {
  ctx.font = FONTS.skill;
  const lines = wrap(ctx, label, 64, 3);
  const r = clamp(widest(ctx, lines) / 2 + 13, 20 + lines.length * 7, 48);
  return {
    entity: {
      kind: "skill",
      id: `${group.id}-${index}`,
      label,
      lines,
      font: FONTS.skill,
      lineHeight: 14,
      tint: GROUP_TINT[group.id],
      group: group.id,
      shape: "circle",
      r,
      openable: false,
      flash: 0
    },
    make: (x, y) => Bodies.circle(x, y, r, BODY.skill)
  };
};

const buildContact = () => {
  const r = 46;
  return {
    entity: {
      kind: "contact",
      id: "contact",
      label: "Contact",
      lines: ["@"],
      font: FONTS.contact,
      lineHeight: 26,
      meta: "SAY HI",
      tint: null,
      data: contact,
      shape: "circle",
      r,
      openable: true,
      flash: 0
    },
    make: (x, y) => Bodies.circle(x, y, r, BODY.contact)
  };
};

// Builds every body just above the viewport at a random x. The sandbox adds
// them to the world one at a time so they rain in. Heavy things come first
// so the light tokens bounce off them.
export const buildBodies = (ctx, width) => {
  const specs = [
    ...projects.map((p) => buildProject(ctx, p)),
    ...roles.map((r) => buildRole(ctx, r)),
    buildContact(),
    ...skillGroups.flatMap((group) => group.items.map((label, i) => buildSkill(ctx, label, group, i)))
  ];

  const margin = 120;
  return specs.map((spec, i) => {
    const x = margin + Math.random() * Math.max(1, width - margin * 2);
    const y = -120 - Math.random() * 80;
    const body = spec.make(x, y);
    body.entity = spec.entity;
    Body.setAngle(body, (Math.random() - 0.5) * 0.5);
    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
    return body;
  });
};
