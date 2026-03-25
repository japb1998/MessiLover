/**
 * Messi Website - Main Application
 * Handles all UI interactions, rendering, and animations
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize stats updater then build the page
  StatsUpdater.init().then(() => {
    initApp();
  });
});

function initApp() {
  hidePreloader();
  initNavbar();
  initParticles();
  renderStats("all");
  renderGoalsChart();
  renderMoments();
  renderTimeline();
  renderTrophies();
  renderQuotes();
  renderRecords();
  initScrollAnimations();
  initCountUp();
  updateLastUpdated();
  StatsUpdater.startPeriodicUpdates();

  // Listen for live stat updates
  window.addEventListener("messi-stats-updated", () => {
    renderStats(document.querySelector(".filter-btn.active")?.dataset.filter || "all");
    renderGoalsChart();
    updateLastUpdated();
  });
}

// ===== PRELOADER =====
function hidePreloader() {
  setTimeout(() => {
    document.getElementById("preloader").classList.add("hidden");
  }, 1500);
}

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const navAnchors = links.querySelectorAll("a");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
    updateActiveNavLink();
  });

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    links.classList.toggle("open");
  });

  navAnchors.forEach((a) => {
    a.addEventListener("click", () => {
      toggle.classList.remove("active");
      links.classList.remove("open");
    });
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPos = window.scrollY + 150;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll(".nav-links a").forEach((a) => a.classList.remove("active"));
        link.classList.add("active");
      }
    }
  });
}

// ===== PARTICLES =====
function initParticles() {
  const container = document.getElementById("heroParticles");
  const count = 30;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = 8 + Math.random() * 12 + "s";
    particle.style.animationDelay = Math.random() * 10 + "s";
    container.appendChild(particle);
  }
}

// ===== STATS =====
function renderStats(filter) {
  const grid = document.getElementById("statsGrid");
  const data = MESSI_DATA.stats[filter];

  if (!data) return;

  const statItems = [
    { key: "appearances", label: "Appearances" },
    { key: "goals", label: "Goals" },
    { key: "assists", label: "Assists" },
    { key: "hatTricks", label: "Hat-Tricks" },
    { key: "freeKickGoals", label: "Free Kick Goals" },
    { key: "goldenBoots", label: "Golden Boots" },
    { key: "minutesPlayed", label: "Minutes Played" },
    { key: "trophies", label: "Trophies" },
  ];

  grid.innerHTML = statItems
    .map(
      (item, i) => `
    <div class="stat-card" style="transition-delay: ${i * 0.05}s">
      <span class="stat-number">${formatNumber(data[item.key])}</span>
      <span class="stat-label">${item.label}</span>
    </div>
  `
    )
    .join("");

  // Animate in
  requestAnimationFrame(() => {
    grid.querySelectorAll(".stat-card").forEach((card) => {
      card.classList.add("animate-in");
    });
  });

  // Setup filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      renderStats(e.target.dataset.filter);
    });
  });
}

function formatNumber(num) {
  if (num >= 10000) {
    return num.toLocaleString();
  }
  return num.toString();
}

// ===== GOALS CHART (Canvas-based) =====
function renderGoalsChart() {
  const canvas = document.getElementById("goalsChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const data = MESSI_DATA.goalsBySeason;
  const maxGoals = Math.max(...data.map((d) => d.goals));

  // Set canvas size
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = rect.width + "px";
  canvas.style.height = rect.height + "px";
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;
  const padding = { top: 20, right: 20, bottom: 50, left: 50 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const barWidth = Math.max(8, (chartW / data.length) * 0.6);
  const gap = chartW / data.length;

  // Clear
  ctx.clearRect(0, 0, width, height);

  // Grid lines
  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();

    // Y-axis labels
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "11px Inter, sans-serif";
    ctx.textAlign = "right";
    const val = Math.round(maxGoals - (maxGoals / 4) * i);
    ctx.fillText(val.toString(), padding.left - 10, y + 4);
  }

  // Bars
  data.forEach((d, i) => {
    const x = padding.left + i * gap + (gap - barWidth) / 2;
    const barH = (d.goals / maxGoals) * chartH;
    const y = padding.top + chartH - barH;

    // Gradient bar
    const grad = ctx.createLinearGradient(x, y, x, padding.top + chartH);
    if (d.goals >= 70) {
      grad.addColorStop(0, "#f5c518");
      grad.addColorStop(1, "#f0a500");
    } else if (d.goals >= 50) {
      grad.addColorStop(0, "#e94560");
      grad.addColorStop(1, "#c92a45");
    } else {
      grad.addColorStop(0, "#75aadb");
      grad.addColorStop(1, "#5a8fc0");
    }

    ctx.fillStyle = grad;
    ctx.beginPath();
    const radius = Math.min(4, barWidth / 2);
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + barWidth - radius, y);
    ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
    ctx.lineTo(x + barWidth, padding.top + chartH);
    ctx.lineTo(x, padding.top + chartH);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.fill();

    // Goal count on top
    if (barH > 20) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.font = "bold 10px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(d.goals.toString(), x + barWidth / 2, y - 6);
    }

    // X-axis labels
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "10px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.save();
    ctx.translate(x + barWidth / 2, padding.top + chartH + 16);
    ctx.rotate(-Math.PI / 4);
    ctx.fillText(d.season, 0, 0);
    ctx.restore();
  });

  // Highlight the 91-goal bar (2011/12)
  const peakIndex = data.findIndex((d) => d.goals === 73);
  if (peakIndex >= 0) {
    const x = padding.left + peakIndex * gap + (gap - barWidth) / 2;
    ctx.fillStyle = "rgba(245, 197, 24, 0.8)";
    ctx.font = "bold 11px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("\u2605 Record Season", x + barWidth / 2, padding.top - 2);
  }
}

// Redraw chart on resize
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => renderGoalsChart(), 200);
});

// ===== MOMENTS =====
function renderMoments() {
  const grid = document.getElementById("momentsGrid");
  const moments = MESSI_DATA.moments;

  grid.innerHTML = moments
    .map(
      (m) => `
    <div class="moment-card reveal">
      <div class="moment-visual">
        <div class="moment-emoji">${m.emoji}</div>
        <span class="moment-year-badge">${m.year}</span>
      </div>
      <div class="moment-content">
        <h3 class="moment-title">${m.title}</h3>
        <p class="moment-desc">${m.description}</p>
      </div>
    </div>
  `
    )
    .join("");
}

// ===== TIMELINE =====
function renderTimeline() {
  const container = document.getElementById("timeline");

  container.innerHTML = MESSI_DATA.timeline
    .map(
      (item) => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <span class="timeline-year">${item.year}</span>
        <h3 class="timeline-title">${item.title}</h3>
        <p class="timeline-text">${item.text}</p>
      </div>
    </div>
  `
    )
    .join("");
}

// ===== TROPHIES =====
function renderTrophies() {
  const showcase = document.getElementById("trophiesShowcase");

  showcase.innerHTML = MESSI_DATA.trophies
    .map(
      (t, i) => `
    <div class="trophy-card" style="--delay: ${i * 0.05}s">
      <span class="trophy-icon">${t.icon}</span>
      <h4 class="trophy-name">${t.name}</h4>
      <span class="trophy-count">${t.count}x</span>
      <p class="trophy-years">${t.years}</p>
    </div>
  `
    )
    .join("");
}

// ===== QUOTES =====
let currentQuote = 0;

function renderQuotes() {
  const carousel = document.getElementById("quotesCarousel");
  const dotsContainer = document.getElementById("quotesDots");
  const quotes = MESSI_DATA.quotes;

  carousel.innerHTML = quotes
    .map(
      (q, i) => `
    <div class="quote-slide ${i === 0 ? "active" : ""}">
      <span class="quote-mark">\u201C</span>
      <p class="quote-text">${q.text}</p>
      <span class="quote-author">\u2014 ${q.author}</span>
    </div>
  `
    )
    .join("");

  dotsContainer.innerHTML = quotes
    .map(
      (_, i) => `
    <div class="quote-dot ${i === 0 ? "active" : ""}" data-index="${i}"></div>
  `
    )
    .join("");

  // Navigation
  document.getElementById("quoteNext").addEventListener("click", () => {
    goToQuote((currentQuote + 1) % quotes.length);
  });

  document.getElementById("quotePrev").addEventListener("click", () => {
    goToQuote((currentQuote - 1 + quotes.length) % quotes.length);
  });

  dotsContainer.querySelectorAll(".quote-dot").forEach((dot) => {
    dot.addEventListener("click", (e) => {
      goToQuote(parseInt(e.target.dataset.index));
    });
  });

  // Auto-advance
  setInterval(() => {
    goToQuote((currentQuote + 1) % quotes.length);
  }, 6000);
}

function goToQuote(index) {
  const slides = document.querySelectorAll(".quote-slide");
  const dots = document.querySelectorAll(".quote-dot");

  slides[currentQuote].classList.remove("active");
  dots[currentQuote].classList.remove("active");

  currentQuote = index;

  slides[currentQuote].classList.add("active");
  dots[currentQuote].classList.add("active");
}

// ===== RECORDS =====
function renderRecords() {
  const grid = document.getElementById("recordsGrid");

  grid.innerHTML = MESSI_DATA.records
    .map(
      (r, i) => `
    <div class="record-card" style="--delay: ${i * 0.05}s">
      <span class="record-icon">${r.icon}</span>
      <div class="record-info">
        <h4>${r.title}</h4>
        <span class="record-value">${r.value}</span>
        <p class="record-desc">${r.desc}</p>
      </div>
    </div>
  `
    )
    .join("");
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          // Don't unobserve - keep for re-triggering if needed
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observe all animatable elements
  document
    .querySelectorAll(
      ".reveal, .timeline-item, .trophy-card, .moment-card, .record-card, .stat-card"
    )
    .forEach((el) => observer.observe(el));
}

// ===== COUNT UP ANIMATION =====
function initCountUp() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          const suffix = el.dataset.suffix || "";
          animateNumber(el, target, suffix);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll("[data-target]").forEach((el) => observer.observe(el));
}

function animateNumber(el, target, suffix) {
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ===== LAST UPDATED =====
function updateLastUpdated() {
  const el = document.getElementById("lastUpdate");
  if (el) {
    const date = new Date(MESSI_DATA.lastUpdated);
    el.textContent = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}
