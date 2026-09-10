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

const LIVE_STATS_CACHE_KEY = "shabab-live-profile-stats-v1";
const numberFormatter = new Intl.NumberFormat("en-US");
let lastLiveRefresh = 0;

function setStatValue(key, value) {
  const element = document.querySelector(`[data-stat="${key}"]`);
  if (element) element.textContent = value;
}

function setPlatformStatus(platform, state, message) {
  const card = document.querySelector(`[data-platform-card="${platform}"]`);
  const status = document.querySelector(`[data-live-status="${platform}"]`);

  card?.setAttribute("aria-busy", state === "loading" ? "true" : "false");
  if (!status) return;

  status.classList.remove("is-loading", "is-live", "is-fallback");
  status.classList.add(`is-${state}`);

  const text = status.querySelector("span");
  if (text) text.textContent = message;
}

function formatNumber(value) {
  return Number.isFinite(value) ? numberFormatter.format(value) : "—";
}

function requireNumber(value, fieldName) {
  if (value === null || value === undefined || value === "") {
    throw new Error(`Missing ${fieldName}`);
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) throw new Error(`Invalid ${fieldName}`);
  return parsed;
}

function titleCase(value) {
  return String(value || "Unrated")
    .split(/\s+/)
    .map((word) => word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : "")
    .join(" ");
}

function formatCachedTime(timestamp) {
  if (!Number.isFinite(timestamp)) return "earlier";

  try {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }).format(new Date(timestamp));
  } catch (error) {
    return "earlier";
  }
}

function readCachedStats() {
  try {
    const value = JSON.parse(localStorage.getItem(LIVE_STATS_CACHE_KEY) || "{}");
    return value && typeof value === "object" ? value : {};
  } catch (error) {
    return {};
  }
}

function cachePlatformStats(platform, stats) {
  try {
    const cache = readCachedStats();
    cache[platform] = { ...stats, updatedAt: Date.now() };
    localStorage.setItem(LIVE_STATS_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    // Live data still works when browser storage is unavailable.
  }
}

function applyCodeforcesStats(stats) {
  setStatValue("cf-solved", formatNumber(stats.solved));
  setStatValue("cf-rating", formatNumber(stats.rating));
  setStatValue("cf-rank", titleCase(stats.rank));
}

function applyLeetCodeStats(stats) {
  setStatValue("lc-total", formatNumber(stats.totalSolved));
  setStatValue("lc-solved", formatNumber(stats.totalSolved));
  setStatValue("lc-ranking", formatNumber(stats.ranking));
  setStatValue(
    "lc-difficulty",
    `${formatNumber(stats.easySolved)} · ${formatNumber(stats.mediumSolved)} · ${formatNumber(stats.hardSolved)}`
  );
  setStatValue(
    "lc-breakdown",
    `${formatNumber(stats.easySolved)} · ${formatNumber(stats.mediumSolved)} · ${formatNumber(stats.hardSolved)}`
  );
}

async function fetchJson(url, timeoutMs = 22000) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: controller.signal
    });

    if (!response.ok) throw new Error(`Request failed with ${response.status}`);
    return await response.json();
  } finally {
    window.clearTimeout(timeout);
  }
}

async function fetchCodeforcesStats() {
  const handle = "shabab_sa";
  const [profilePayload, submissionsPayload] = await Promise.all([
    fetchJson(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`),
    fetchJson(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}&from=1&count=10000`, 28000)
  ]);

  if (profilePayload.status !== "OK" || submissionsPayload.status !== "OK") {
    throw new Error("Codeforces returned an unsuccessful response");
  }

  const profile = profilePayload.result?.[0];
  if (!profile) throw new Error("Codeforces profile not found");

  const solvedProblems = new Set(
    (submissionsPayload.result || [])
      .filter((submission) => submission.verdict === "OK" && submission.problem)
      .map((submission) => {
        const problem = submission.problem;
        const source = problem.contestId ?? problem.problemsetName ?? "unknown";
        return `${source}:${problem.index ?? ""}:${problem.name ?? ""}`;
      })
  );

  return {
    solved: solvedProblems.size,
    rating: requireNumber(profile.rating, "Codeforces rating"),
    rank: profile.rank || "unrated"
  };
}

function parseLeetCodeStats(payload) {
  return {
    totalSolved: requireNumber(payload.solvedProblem ?? payload.totalSolved, "LeetCode solved total"),
    ranking: requireNumber(payload.ranking, "LeetCode ranking"),
    easySolved: requireNumber(payload.easySolved, "LeetCode easy total"),
    mediumSolved: requireNumber(payload.mediumSolved, "LeetCode medium total"),
    hardSolved: requireNumber(payload.hardSolved, "LeetCode hard total")
  };
}

async function fetchLeetCodeStats() {
  const username = "Shabab01";

  try {
    const [solvedPayload, profilePayload] = await Promise.all([
      fetchJson(`https://alfa-leetcode-api.onrender.com/${encodeURIComponent(username)}/solved`, 16000),
      fetchJson(`https://alfa-leetcode-api.onrender.com/${encodeURIComponent(username)}`, 16000)
    ]);

    return parseLeetCodeStats({ ...solvedPayload, ranking: profilePayload.ranking });
  } catch (primaryError) {
    const fallbackPayload = await fetchJson(
      `https://leetcode-api-faisalshohag.vercel.app/${encodeURIComponent(username)}`,
      16000
    );
    return parseLeetCodeStats(fallbackPayload);
  }
}

async function refreshPlatform(platform, fetchStats, applyStats) {
  setPlatformStatus(platform, "loading", "Refreshing live data…");

  try {
    const stats = await fetchStats();
    applyStats(stats);
    cachePlatformStats(platform, stats);
    setPlatformStatus(platform, "live", "Live · updated just now");
  } catch (error) {
    const cached = readCachedStats()[platform];

    if (cached) {
      applyStats(cached);
      setPlatformStatus(platform, "fallback", `Refresh unavailable · cached ${formatCachedTime(cached.updatedAt)}`);
    } else {
      setPlatformStatus(platform, "fallback", "Live refresh unavailable · showing last verified data");
    }
  }
}

function applyInitialCachedStats() {
  const cache = readCachedStats();

  if (cache.codeforces) {
    applyCodeforcesStats(cache.codeforces);
    setPlatformStatus("codeforces", "loading", `Cached ${formatCachedTime(cache.codeforces.updatedAt)} · refreshing…`);
  }

  if (cache.leetcode) {
    applyLeetCodeStats(cache.leetcode);
    setPlatformStatus("leetcode", "loading", `Cached ${formatCachedTime(cache.leetcode.updatedAt)} · refreshing…`);
  }
}

function refreshLiveProfiles() {
  lastLiveRefresh = Date.now();
  void Promise.allSettled([
    refreshPlatform("codeforces", fetchCodeforcesStats, applyCodeforcesStats),
    refreshPlatform("leetcode", fetchLeetCodeStats, applyLeetCodeStats)
  ]);
}

function initializeLiveProfiles() {
  applyInitialCachedStats();
  refreshLiveProfiles();

  document.addEventListener("visibilitychange", () => {
    const refreshAge = Date.now() - lastLiveRefresh;
    if (document.visibilityState === "visible" && refreshAge > 10 * 60 * 1000) {
      refreshLiveProfiles();
    }
  });
}

initializeTheme();
initializeMobileNavigation();
initializeActiveSection();
setCurrentYear();
initializeLiveProfiles();
