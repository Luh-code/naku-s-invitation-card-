/* =========================================================
   CONFIG — edit these values, nothing else in this file
   ========================================================= */
const CONFIG = {
  // Used for the countdown timer. Format: "YYYY-MM-DDTHH:MM:SS"
  weddingDateTime: "2026-11-11T16:00:00",

  // RSVP -> Google Form. Replies are posted straight to your Google Form,
  // so they still appear in its Responses tab. See README.md ("The RSVP form")
  // for how to find these values.
  googleForm: {
    // Looks like: https://docs.google.com/forms/d/e/<FORM_ID>/formResponse
    actionUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSdJxxZjfemhHtyC_oBf-mu75FrtPlaeWCJSEm28sbYtSTYyyA/viewform?usp=pp_url&entry.877086558=luyando+mulonda&entry.1498135098=Yes,+I'd+love+to!&entry.1424661284=Yes,+I'll+have+someone+joining+me!&entry.1537563506=Bride's+side&entry.2606285=yes",
    // Each looks like "entry.1234567890" (one per question in the form)
    entries: {
      name: "entry.877086558", // Full Name
      attending: "entry.1498135098", // Will you honor us with your presence...
      guest: "entry.1424661284",
      side: "entry.1537563506", // Side of the family
      questions: "entry.2606285", // Any questions?
    },
  },
};

/* =========================================================
   Countdown timer
   ========================================================= */
(function countdown() {
  const target = new Date(CONFIG.weddingDateTime).getTime();
  const els = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    mins: document.getElementById("cd-mins"),
    secs: document.getElementById("cd-secs"),
  };
  if (!els.days || isNaN(target)) return;

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      els.days.textContent = "00";
      els.hours.textContent = "00";
      els.mins.textContent = "00";
      els.secs.textContent = "00";
      clearInterval(timer);
      return;
    }
    const pad = (n) => String(n).padStart(2, "0");
    els.days.textContent = pad(Math.floor(diff / 86400000));
    els.hours.textContent = pad(Math.floor((diff / 3600000) % 24));
    els.mins.textContent = pad(Math.floor((diff / 60000) % 60));
    els.secs.textContent = pad(Math.floor((diff / 1000) % 60));
  }

  tick();
  const timer = setInterval(tick, 1000);
})();

/* =========================================================
   Sticky nav: blur/solidify once scrolled past the hero
   ========================================================= */
(function stickyNav() {
  const nav = document.getElementById("site-nav");
  const hero = document.getElementById("hero");
  if (!nav || !hero) return;

  const sentinel = document.createElement("div");
  sentinel.style.position = "absolute";
  sentinel.style.top = "70%";
  hero.style.position = hero.style.position || "relative";
  hero.appendChild(sentinel);

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      nav.classList.toggle("is-scrolled", !entry.isIntersecting);
    },
    { threshold: 0 },
  );
  observer.observe(sentinel);
})();

/* =========================================================
   Scroll-reveal animations
   ========================================================= */
(function scrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
  );

  items.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    observer.observe(el);
  });
})();

/* =========================================================
   Scrollspy: highlight the active nav link
   ========================================================= */
(function scrollSpy() {
  const links = document.querySelectorAll(".site-nav__links a[href^='#']");
  if (!links.length) return;

  const sections = Array.from(links)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        links.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === id);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );

  sections.forEach((section) => observer.observe(section));
})();

/* =========================================================
   Floating RSVP reminder: visible once past the hero, hidden
   again while the real RSVP section is on screen
   ========================================================= */
(function floatingRsvp() {
  const btn = document.getElementById("floating-rsvp");
  const hero = document.getElementById("hero");
  const rsvpSection = document.getElementById("rsvp");
  if (!btn || !hero || !rsvpSection) return;

  let pastHero = false;
  let inRsvp = false;

  function sync() {
    btn.classList.toggle("is-visible", pastHero && !inRsvp);
  }

  const heroObserver = new IntersectionObserver(
    (entries) => {
      pastHero = !entries[0].isIntersecting;
      sync();
    },
    { threshold: 0 },
  );
  heroObserver.observe(hero);

  const rsvpObserver = new IntersectionObserver(
    (entries) => {
      inRsvp = entries[0].isIntersecting;
      sync();
    },
    { threshold: 0.15 },
  );
  rsvpObserver.observe(rsvpSection);
})();

/* =========================================================
   Scroll progress bar + parallax for [data-parallax] elements
   ========================================================= */
(function scrollEffects() {
  const progress = document.getElementById("scroll-progress");
  const parallaxEls = Array.from(
    document.querySelectorAll("[data-parallax]"),
  ).map((el) => ({
    el,
    speed: parseFloat(el.dataset.parallax) || 0,
  }));
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (!progress && (!parallaxEls.length || reduceMotion)) return;

  let ticking = false;

  function update() {
    ticking = false;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (progress) {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      progress.style.transform = `scaleX(${Math.min(1, Math.max(0, pct))})`;
    }

    if (!reduceMotion) {
      // Uses the standalone `translate` property (not `transform`) so it
      // layers on top of any CSS `rotate`/`scale` already set on these
      // elements (e.g. the mirrored corner blooms) instead of replacing it.
      parallaxEls.forEach(({ el, speed }) => {
        el.style.translate = `0 ${scrollTop * speed}px`;
      });
    }
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
})();

/* =========================================================
   RSVP form: validates, then posts to the Google Form
   ========================================================= */
(function rsvpForm() {
  const form = document.getElementById("rsvp-form");
  const thanks = document.getElementById("rsvp-thanks");
  const msg = document.getElementById("rsvp-message");
  const submit = document.getElementById("rsvp-submit");
  if (!form) return;

  const gf = CONFIG.googleForm;
  const configured =
    gf &&
    /^https:\/\/docs\.google\.com\/forms\/.+\/formResponse/.test(
      gf.actionUrl,
    ) &&
    Object.values(gf.entries).every((v) => /^entry\.\d+$/.test(v));

  function showError(text) {
    msg.textContent = text;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    showError("");

    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    if (!name) {
      showError("Please enter your full name.");
      form.name.focus();
      return;
    }
    if (!data.get("attending")) {
      showError("Please let us know if you will be attending.");
      return;
    }
    if (!data.get("guest")) {
      showError("Please tell us if you will be bringing a guest.");
      return;
    }

    if (!configured) {
      showError(
        "The RSVP form isn't connected yet. Please contact Matron Machona on 0972574894.",
      );
      return;
    }

    const body = new URLSearchParams();
    body.append(gf.entries.name, name);
    body.append(gf.entries.attending, data.get("attending"));
    body.append(gf.entries.guest, data.get("guest"));
    body.append(
      gf.entries.questions,
      (data.get("questions") || "").toString().trim(),
    );

    submit.disabled = true;
    submit.textContent = "Sending...";
    try {
      // no-cors: Google doesn't send CORS headers, so the response is opaque,
      // but the submission still lands in the form's Responses tab.
      await fetch(gf.actionUrl, { method: "POST", mode: "no-cors", body });
      form.hidden = true;
      thanks.hidden = false;
      thanks.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (err) {
      showError(
        "Sorry, something went wrong. Please check your connection and try again.",
      );
      submit.disabled = false;
      submit.textContent = "Send RSVP";
    }
  });
})();
