// Section order, labels and colors. Shared by the rail nav and section headers.
const sections = [
  { id: "about", label: "About", accent: "accent" },
  { id: "projects", label: "Projects", accent: "violet" },
  { id: "experience", label: "Experience", accent: "teal" },
  { id: "stack", label: "Stack", accent: "orange" },
  { id: "contact", label: "Contact", accent: "pink" }
];

export const sectionAccent = (id) => (sections.find((s) => s.id === id) || {}).accent;

export default sections;
