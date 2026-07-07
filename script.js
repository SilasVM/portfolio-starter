// ============================================================
// PROJECTS DATA
// TODO: Replace these with your real projects!
// Each project needs: title, description, tags, and optional links.
// Ask Copilot: "Add a project card for a [project type] called [name]"
// ============================================================
const projects = [
  {
    title: "Finance AI Suite",
    description: "A Python-based finance application suite with a Flask GUI, package installer, and AI-powered tools for financial analysis.",
    tags: ["Python", "Flask", "AI", "Finance"],
    github: "https://github.com/SilasVM/Finance-AI-Suite",
    demo: null,
  },
  {
    title: "CSC498 Attendance App",
    description: "A web application developed for CSC498 to record and manage student attendance, generate reports, and support instructor workflows.",
    tags: ["JavaScript", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/SilasVM/CSC498AttendanceApp",
    demo: null,
  },
  {
    title: "p5.js Contribution — PR #7316",
    description: "Open-source contribution to p5.js 2.0 (pull request #7316) adding enhancements and fixes to the p5.js codebase.",
    tags: ["JavaScript", "p5.js", "Open Source"],
    github: "https://github.com/processing/p5.js/pull/7316",
    demo: null,
  },
];

// ============================================================
// SKILLS DATA
// TODO: Replace with your actual skills.
// Ask Copilot to help format this list based on your resume.
// ============================================================
const skills = [
  "Python", "JavaScript", "Java", "C",
  "HTML & CSS", "Git & GitHub",
  "React", "Node.js",
  "SQL", "Linux",
];

// ============================================================
// RENDER PROJECTS
// ============================================================
function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = projects
    .map(
      (project) => `
      <div class="project-card">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
          ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <div class="project-links">
          ${project.github ? `<a href="${project.github}" target="_blank">GitHub →</a>` : ""}
          ${project.demo ? `<a href="${project.demo}" target="_blank">Live Demo →</a>` : ""}
        </div>
      </div>
    `
    )
    .join("");
}

// ============================================================
// RENDER SKILLS
// ============================================================
function renderSkills() {
  const container = document.getElementById("skills-container");
  if (!container) return;

  container.innerHTML = skills
    .map((skill) => `<span class="skill-badge">${skill}</span>`)
    .join("");
}

// ============================================================
// DARK MODE TOGGLE
// TODO: Implement this! Here's a stub to get you started.
// Ask Copilot (inline chat on this function): "Implement dark mode
// toggle that saves preference to localStorage"
// ============================================================
function toggleDarkMode() {
  const body = document.body;
  const isDark = body.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  applyTheme(newTheme);
}

// Apply a theme and persist preference
function applyTheme(theme) {
  const body = document.body;
  if (theme === 'dark') {
    body.setAttribute('data-theme', 'dark');
  } else {
    body.removeAttribute('data-theme');
  }
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {
    // ignore storage errors (e.g., Safari private mode)
  }
}

// ============================================================
// UPDATE FOOTER YEAR
// ============================================================
function updateYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ============================================================
// INIT
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderSkills();
  updateYear();
  // Initialize theme from localStorage or system preference
  try {
    const saved = localStorage.getItem('theme');
    if (saved) {
      applyTheme(saved);
    } else {
      // default to dark mode when no preference is saved
      applyTheme('dark');
    }
  } catch (e) {
    // ignore
  }

  // Wire up dark mode toggle button if it exists (id `dark-toggle` or class `dark-toggle`)
  const toggleBtn = document.getElementById('dark-toggle') || document.querySelector('.dark-toggle');
  if (toggleBtn) {
    // set ARIA pressed state for accessibility
    if (toggleBtn.tagName && toggleBtn.tagName.toLowerCase() === 'button') {
      toggleBtn.setAttribute('aria-pressed', document.body.getAttribute('data-theme') === 'dark');
    }
    toggleBtn.addEventListener('click', () => {
      toggleDarkMode();
      if (toggleBtn.tagName && toggleBtn.tagName.toLowerCase() === 'button') {
        toggleBtn.setAttribute('aria-pressed', document.body.getAttribute('data-theme') === 'dark');
      }
    });
  }
});
