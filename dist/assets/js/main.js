const THEME_STORAGE_KEY = "shabab-portfolio-theme";

const themeIcons = {
  dark: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2.5v2.2M12 19.3v2.2M4.75 4.75l1.55 1.55M17.7 17.7l1.55 1.55M2.5 12h2.2M19.3 12h2.2M4.75 19.25l1.55-1.55M17.7 6.3l1.55-1.55"></path>
    </svg>`,
  light: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 15.1A8.35 8.35 0 0 1 8.9 4 8.35 8.35 0 1 0 20 15.1Z"></path>
    </svg>`
};

function applyTheme(theme) {
  const validTheme = theme === "light" ? "light" : "dark";
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle?.querySelector(".theme-icon");

  document.documentElement.dataset.theme = validTheme;

  if (themeIcon) {
    themeIcon.innerHTML = themeIcons[validTheme];
  }

  if (themeToggle) {
    const nextTheme = validTheme === "dark" ? "light" : "dark";
    themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
    themeToggle.setAttribute("title", `Switch to ${nextTheme} theme`);
  }
}

function initializeTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const initialTheme = document.documentElement.dataset.theme || "dark";

  applyTheme(initialTheme);

  themeToggle?.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (error) {
      // Theme still works when browser storage is unavailable.
    }
  });
}

function initializeMobileNavigation() {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (!menuToggle || !mainNav) return;

  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    mainNav.classList.toggle("is-open", !isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });
}

function initializeActiveSection() {
  if (!("IntersectionObserver" in window)) return;

  const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleEntry) return;

    links.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${visibleEntry.target.id}`;
      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }, {
    rootMargin: "-22% 0px -63% 0px",
    threshold: [0, 0.2, 0.5]
  });

  sections.forEach((section) => observer.observe(section));
}

function setCurrentYear() {
  const year = document.getElementById("currentYear");
  if (year) year.textContent = String(new Date().getFullYear());
}

initializeTheme();
initializeMobileNavigation();
initializeActiveSection();
setCurrentYear();
