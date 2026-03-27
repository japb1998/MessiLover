/**
 * Messi Website - Main Application
 */

document.addEventListener("DOMContentLoaded", () => {
  StatsUpdater.init().then(() => initApp());
});

function initApp() {
  hidePreloader();
  initNavbar();
  initParticles();
  initStatsFilter();
  renderStats("all");
  renderGoalsChart();
  renderMoments();
  renderTimeline();
  renderTrophies();
  initQuotes();
  renderRecords();
  initScrollAnimations();
  initCountUp();
  updateLastUpdated();
  StatsUpdater.startPeriodicUpdates();

  window.addEventListener("messi-stats-updated", () => {
    const active = document.querySelector(".filter-btn.active");
    renderStats(active ? active.dataset.filter : "all");
    renderGoalsChart();
    updateLastUpdated();
  });
}

// ===== PRELOADER =====
function hidePreloader() {
  setTimeout(() => {
    document.getElementById("preloader").classList.add("hidden");
  }, 1200);
}

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const overlay = document.getElementById("navOverlay");

  function closeMenu() {
    toggle.classList.remove("active");
    links.classList.remove("open");
    overlay.classList.remove("open");
  }

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
    updateActiveNavLink();
  });

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.contains("open");
    if (isOpen) {
      closeMenu();
    } else {
      toggle.classList.add("active");
      links.classList.add("open");
      overlay.classList.add("open");
    }
  });

  overlay.addEventListener("click", closeMenu);

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeMenu);
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
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = 10 + Math.random() * 15 + "s";
    particle.style.animationDelay = Math.random() * 12 + "s";
    container.appendChild(particle);
  }
}

// ===== STATS FILTER (bound ONCE) =====
function initStatsFilter() {
  const filterContainer = document.getElementById("statsFilter");
  filterContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    filterContainer.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderStats(btn.dataset.filter);
  });
}

// ===== STATS RENDERING =====
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
    <div class="stat-card" style="transition-delay: ${i * 0.06}s">
      <span class="stat-number">${formatNumber(data[item.key])}</span>
      <span class="stat-label">${item.label}</span>
    </div>`
    )
    .join("");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      grid.querySelectorAll(".stat-card").forEach((card) => card.classList.add("animate-in"));
    });
  });
}

function formatNumber(num) {
  return num >= 10000 ? num.toLocaleString() : num.toString();
}

// ===== GOALS CHART =====
function renderGoalsChart() {
  const canvas = document.getElementById("goalsChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const data = MESSI_DATA.goalsBySeason;
  const maxGoals = Math.max(...data.map((d) => d.goals));

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = rect.width + "px";
  canvas.style.height = rect.height + "px";
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;
  const padding = { top: 24, right: 20, bottom: 50, left: 45 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const gap = chartW / data.length;
  const barWidth = Math.max(6, gap * 0.55);

  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (chartH / 4) * i;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.font = "10px Inter, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(Math.round(maxGoals - (maxGoals / 4) * i).toString(), padding.left - 8, y + 4);
  }

  data.forEach((d, i) => {
    const x = padding.left + i * gap + (gap - barWidth) / 2;
    const barH = (d.goals / maxGoals) * chartH;
    const y = padding.top + chartH - barH;

    const grad = ctx.createLinearGradient(x, y, x, padding.top + chartH);
    if (d.goals >= 70) {
      grad.addColorStop(0, "#f5c518");
      grad.addColorStop(1, "rgba(245, 197, 24, 0.3)");
    } else if (d.goals >= 50) {
      grad.addColorStop(0, "#e94560");
      grad.addColorStop(1, "rgba(233, 69, 96, 0.3)");
    } else {
      grad.addColorStop(0, "#75aadb");
      grad.addColorStop(1, "rgba(117, 170, 219, 0.3)");
    }

    ctx.fillStyle = grad;
    const r = Math.min(3, barWidth / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + barWidth - r, y);
    ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + r);
    ctx.lineTo(x + barWidth, padding.top + chartH);
    ctx.lineTo(x, padding.top + chartH);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.fill();

    if (barH > 25) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.font = "bold 9px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(d.goals.toString(), x + barWidth / 2, y - 5);
    }

    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
    ctx.font = "9px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.save();
    ctx.translate(x + barWidth / 2, padding.top + chartH + 14);
    ctx.rotate(-Math.PI / 4);
    ctx.fillText(d.season, 0, 0);
    ctx.restore();
  });
}

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(renderGoalsChart, 200);
});

// ===== MOMENTS =====
function renderMoments() {
  const grid = document.getElementById("momentsGrid");
  grid.innerHTML = MESSI_DATA.moments
    .map(
      (m, i) => `
    <div class="moment-card${i === 0 ? " featured" : ""}">
      <div class="moment-visual" style="background: ${m.gradient}">
        <div class="moment-emoji">${m.emoji}</div>
        <span class="moment-year-badge">${m.year}</span>
      </div>
      <div class="moment-content">
        <h3 class="moment-title">${m.title}</h3>
        <p class="moment-desc">${m.description}</p>
      </div>
    </div>`
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
      <div class="timeline-dot">${item.icon}</div>
      <div class="timeline-content">
        <span class="timeline-year">${item.year}</span>
        <h3 class="timeline-title">${item.title}</h3>
        <p class="timeline-text">${item.text}</p>
      </div>
    </div>`
    )
    .join("");
}

// ===== TROPHIES =====
function renderTrophies() {
  const showcase = document.getElementById("trophiesShowcase");
  showcase.innerHTML = MESSI_DATA.trophies
    .map(
      (t, i) => `
    <div class="trophy-card" style="--delay: ${i * 0.04}s">
      <span class="trophy-icon">${t.icon}</span>
      <h4 class="trophy-name">${t.name}</h4>
      <span class="trophy-count">${t.count}x</span>
      <p class="trophy-years">${t.years}</p>
    </div>`
    )
    .join("");
}

// ===== QUOTES =====
let currentQuote = 0;
let quoteInterval = null;

function initQuotes() {
  const carousel = document.getElementById("quotesCarousel");
  const dotsContainer = document.getElementById("quotesDots");
  const quotes = MESSI_DATA.quotes;

  carousel.innerHTML = quotes
    .map(
      (q, i) => `
    <div class="quote-slide${i === 0 ? " active" : ""}">
      <span class="quote-mark">\u201C</span>
      <p class="quote-text">${q.text}</p>
      <span class="quote-author">\u2014 ${q.author}</span>
    </div>`
    )
    .join("");

  dotsContainer.innerHTML = quotes
    .map((_, i) => `<div class="quote-dot${i === 0 ? " active" : ""}" data-index="${i}"></div>`)
    .join("");

  document.getElementById("quoteNext").addEventListener("click", () => {
    goToQuote((currentQuote + 1) % quotes.length);
    resetAutoAdvance();
  });

  document.getElementById("quotePrev").addEventListener("click", () => {
    goToQuote((currentQuote - 1 + quotes.length) % quotes.length);
    resetAutoAdvance();
  });

  dotsContainer.addEventListener("click", (e) => {
    const dot = e.target.closest(".quote-dot");
    if (!dot) return;
    goToQuote(parseInt(dot.dataset.index));
    resetAutoAdvance();
  });

  startAutoAdvance();
}

function goToQuote(index) {
  const slides = document.querySelectorAll(".quote-slide");
  const dots = document.querySelectorAll(".quote-dot");
  if (!slides.length) return;

  slides[currentQuote].classList.remove("active");
  dots[currentQuote].classList.remove("active");
  currentQuote = index;
  slides[currentQuote].classList.add("active");
  dots[currentQuote].classList.add("active");
}

function startAutoAdvance() {
  quoteInterval = setInterval(() => {
    goToQuote((currentQuote + 1) % MESSI_DATA.quotes.length);
  }, 6000);
}

function resetAutoAdvance() {
  clearInterval(quoteInterval);
  startAutoAdvance();
}

// ===== RECORDS =====
function renderRecords() {
  const grid = document.getElementById("recordsGrid");
  grid.innerHTML = MESSI_DATA.records
    .map(
      (r, i) => `
    <div class="record-card" style="--delay: ${i * 0.04}s">
      <span class="record-icon">${r.icon}</span>
      <div class="record-info">
        <h4>${r.title}</h4>
        <span class="record-value">${r.value}</span>
        <p class="record-desc">${r.desc}</p>
      </div>
    </div>`
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
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document
    .querySelectorAll(".reveal, .timeline-item, .trophy-card, .moment-card, .record-card")
    .forEach((el) => observer.observe(el));
}

// ===== COUNT UP =====
function initCountUp() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          animateNumber(el, parseInt(el.dataset.target), el.dataset.suffix || "");
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
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
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
