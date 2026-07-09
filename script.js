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
// Skills with proficiency rating (1-5)
const skills = [
  { name: "Git", rating: 5 },

  { name: "GitHub", rating: 5 },
  { name: "C++", rating: 4 },
  { name: "HTML", rating: 4 },
  { name: "Python", rating: 4 },
  { name: "Java", rating: 3 },
  { name: "JavaScript", rating: 3 },
  { name: "PHP", rating: 3 },
  { name: "SQL", rating: 3 },
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

  // Helper to build a star string like ★★★☆☆
  function stars(rating) {
    const filled = '★'.repeat(Math.max(0, Math.min(5, rating)));
    const empty = '☆'.repeat(5 - Math.max(0, Math.min(5, rating)));
    return filled + empty;
  }

  container.innerHTML = skills
    .map((skill) => {
      const label = skill.name;
      const rating = skill.rating || 0;
      const starStr = stars(rating);
      return `
        <span class="skill-badge" tabindex="0" aria-label="${label} proficiency ${rating} of 5">
          ${label}
          <span class="skill-proficiency" aria-hidden="true">${starStr} ${rating}/5</span>
        </span>
      `;
    })
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
  // Update toggle icon whenever theme is applied
  setThemeToggleIcon(theme);
}

// Update the theme toggle button icon to match current theme
function setThemeToggleIcon(theme) {
  const btn = document.getElementById('dark-toggle');
  if (!btn) return;
  const isDark = theme === 'dark';
  btn.setAttribute('aria-checked', String(isDark));
  btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  btn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  const label = btn.querySelector('.theme-toggle__label');
  if (label) {
    label.textContent = isDark ? 'Dark' : 'Light';
  }
}

// ============================================================
// UPDATE FOOTER YEAR
// ============================================================
function updateYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function startHeroTypewriter() {
  const headline = document.querySelector(".hero h1");
  if (!headline) return;

  const isMobile = window.matchMedia("(max-width: 600px)").matches;
  const parts = [
    { text: "Hi, I'm ", className: null },
    { text: "Silas Morgan", className: "highlight" },
    { text: " 🕴🏿", className: null },
  ];
  const fullText = parts.map((part) => part.text).join("");

  if (isMobile) {
    headline.innerHTML = `Hi, I'm <span class="highlight">Silas Morgan</span> 🕴🏿`;
    headline.setAttribute("aria-label", fullText);
    return;
  }

  const typingDelay = 85;
  const eraseDelay = 45;
  const pauseAfterFull = 10000;
  const pauseAfterErase = 300;
  const totalChars = fullText.length;
  let timeoutId = null;
  let resizeTimeoutId = null;

  function render(charCount) {
    let remaining = charCount;
    const html = parts
      .map((part) => {
        if (remaining <= 0) return "";
        const visibleText = part.text.slice(0, Math.min(remaining, part.text.length));
        remaining -= visibleText.length;
        return part.className ? `<span class="${part.className}">${visibleText}</span>` : visibleText;
      })
      .join("");

    headline.setAttribute("aria-label", fullText);
    headline.innerHTML = `${html}<span class="typing-cursor" aria-hidden="true"></span>`;
  }

  function type(charCount) {
    render(charCount);
    if (charCount < totalChars) {
      timeoutId = window.setTimeout(() => type(charCount + 1), typingDelay);
      return;
    }

    timeoutId = window.setTimeout(() => erase(totalChars), pauseAfterFull);
  }

  function erase(charCount) {
    render(charCount);
    if (charCount > 0) {
      timeoutId = window.setTimeout(() => erase(charCount - 1), eraseDelay);
      return;
    }

    timeoutId = window.setTimeout(() => type(0), pauseAfterErase);
  }

  if (timeoutId) {
    window.clearTimeout(timeoutId);
  }

  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimeoutId);
    resizeTimeoutId = window.setTimeout(() => {
      window.clearTimeout(timeoutId);
      startHeroTypewriter();
    }, 150);
  }, { once: true });

  type(0);
}

// ============================================================
// INIT
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderSkills();
  updateYear();
  startHeroTypewriter();
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
    // set switch state for accessibility
    if (toggleBtn.tagName && toggleBtn.tagName.toLowerCase() === 'button') {
      toggleBtn.setAttribute('aria-checked', document.body.getAttribute('data-theme') === 'dark');
    }
    toggleBtn.addEventListener('click', () => {
      toggleDarkMode();
      if (toggleBtn.tagName && toggleBtn.tagName.toLowerCase() === 'button') {
        toggleBtn.setAttribute('aria-checked', document.body.getAttribute('data-theme') === 'dark');
      }
    });
  }
});
