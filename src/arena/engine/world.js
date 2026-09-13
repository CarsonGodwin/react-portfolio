import projects from "../../data/projects";
import roles from "../../data/experience";
import skillGroups from "../../data/skills";
import contact from "../../data/contact";
import { PLAYER, TARGET_HP, WORLD_W, WORLD_H } from "./constants";

// Static layout. Spawn sits in the middle; each section is a zone in one
// cardinal direction so the signposts at spawn are enough to navigate.
const ZONES = {
  projects: { id: "projects", label: "Projects", x: 480, y: 110, w: 1440, h: 470, dir: "↑" },
  experience: { id: "experience", label: "Experience", x: 1980, y: 300, w: 360, h: 1000, dir: "→" },
  skills: { id: "skills", label: "Skills", x: 400, y: 1090, w: 1600, h: 420, dir: "↓" },
  contact: { id: "contact", label: "Contact", x: 60, y: 560, w: 360, h: 480, dir: "←" }
};

const PROJECT_SLOTS = [
  { x: 720, y: 350, radius: 68 },
  { x: 1090, y: 350, radius: 46 },
  { x: 1420, y: 350, radius: 46 },
  { x: 1740, y: 350, radius: 46 }
];

const ROLE_SLOTS = [
  { x: 2160, y: 470 },
  { x: 2160, y: 700 },
  { x: 2160, y: 930 },
  { x: 2160, y: 1160 }
];

// Deterministic scatter so pickups don't sit on a perfect grid.
const jitter = (i) => ((i * 7919) % 61) - 30;

const buildPickups = () => {
  const pickups = [];
  const clusterX = { languages: 700, frameworks: 1200, cloud: 1700 };
  skillGroups.forEach((group) => {
    group.items.forEach((label, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      pickups.push({
        kind: "skill",
        id: `${group.id}-${i}`,
        label,
        group: group.id,
        x: clusterX[group.id] + (col - 1) * 130 + jitter(i + group.items.length),
        y: 1230 + row * 140 + jitter(i * 3),
        radius: 12,
        phase: (i * 1.7) % (Math.PI * 2),
        collected: false
      });
    });
  });
  return pickups;
};

export const createWorld = () => {
  const targets = projects.map((project, i) => ({
    kind: "project",
    id: project.id,
    label: project.title,
    data: project,
    x: PROJECT_SLOTS[i].x,
    y: PROJECT_SLOTS[i].y,
    radius: PROJECT_SLOTS[i].radius,
    hp: TARGET_HP,
    flash: 0,
    cleared: false
  }));

  const nodes = roles.map((role, i) => ({
    kind: "role",
    id: role.id,
    label: role.company,
    data: role,
    x: ROLE_SLOTS[i].x,
    y: ROLE_SLOTS[i].y,
    radius: 40,
    hp: TARGET_HP,
    flash: 0,
    cleared: false
  }));

  const contactPad = {
    kind: "contact",
    id: "contact",
    label: "Extraction point",
    data: contact,
    x: 240,
    y: 800,
    radius: 70,
    armed: true,
    visited: false
  };

  return {
    w: WORLD_W,
    h: WORLD_H,
    zones: ZONES,
    spawn: PLAYER.spawn,
    player: {
      x: PLAYER.spawn.x,
      y: PLAYER.spawn.y,
      vx: 0,
      vy: 0,
      angle: -Math.PI / 2,
      radius: PLAYER.radius,
      thrust: 0,
      cooldown: 0
    },
    targets: [...targets, ...nodes],
    contactPad,
    pickups: buildPickups(),
    bullets: [],
    particles: []
  };
};
