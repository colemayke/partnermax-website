/* PartnerMax — Site interactions */

(function () {
  // ---------- Nav: scrolled state ----------
  const nav = document.querySelector(".site-nav");
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 24) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ---------- Scroll fade-up animations ----------
  const fadeEls = document.querySelectorAll(".fade-up");
  if ("IntersectionObserver" in window && fadeEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    fadeEls.forEach((el) => io.observe(el));
  } else {
    fadeEls.forEach((el) => el.classList.add("is-visible"));
  }

  // ---------- FAQ accordion ----------
  document.querySelectorAll(".site-faq__item").forEach((item) => {
    const q = item.querySelector(".site-faq__q");
    if (!q) return;
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      // optional: close siblings within same .site-faq
      const parentFaq = item.closest(".site-faq");
      if (parentFaq) {
        parentFaq.querySelectorAll(".site-faq__item.is-open").forEach((sib) => {
          if (sib !== item) sib.classList.remove("is-open");
        });
      }
      item.classList.toggle("is-open", !isOpen);
    });
  });

  // ---------- Smooth in-page anchor scroll ----------
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const href = a.getAttribute("href");
    if (!href || href === "#" || href.length < 2) return;
    a.addEventListener("click", (e) => {
      const t = document.querySelector(href);
      if (t) {
        e.preventDefault();
        const navH = nav ? nav.offsetHeight : 0;
        const y = t.getBoundingClientRect().top + window.scrollY - navH - 24;
        window.scrollTo({ top: y, behavior: "smooth" });
        history.pushState(null, "", href);
      }
    });
  });

  // ---------- Contact form ----------
  const form = document.getElementById("contact-form");
  if (form) {
    const success = form.querySelector(".site-contact__form-msg");
    const validateField = (field) => {
      if (!field.checkValidity()) {
        field.classList.add("is-invalid");
        return false;
      }
      field.classList.remove("is-invalid");
      return true;
    };
    form.querySelectorAll("input, select, textarea").forEach((f) => {
      f.addEventListener("blur", () => validateField(f));
      f.addEventListener("input", () => f.classList.remove("is-invalid"));
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll("input, select, textarea").forEach((f) => {
        if (!validateField(f)) ok = false;
      });
      if (!ok) return;
      if (success) {
        success.classList.add("is-visible");
        success.textContent = "Thanks — we'll be in touch within one business day.";
      }
      form.reset();
      setTimeout(() => success && success.classList.remove("is-visible"), 6000);
    });
  }

  // ---------- Tweaks (Edit-mode panel) ----------
  // Defaults stored in markers below — the host can rewrite this JSON.
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "heroMode": "dark",
    "showItalicAccent": true,
    "headlineKey": "default"
  }/*EDITMODE-END*/;
  const STORAGE_KEY = "pm_site_tweaks";

  function loadTweaks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return Object.assign({}, TWEAK_DEFAULTS, JSON.parse(raw));
    } catch (e) {}
    return Object.assign({}, TWEAK_DEFAULTS);
  }
  let tweaks = loadTweaks();

  const HEADLINES = {
    default: {
      home: ['The licensed channel for', '<em>Canadian</em> business.'],
    },
    direct: {
      home: ['The channel built', 'where <em>you own</em>', 'the customer.'],
    },
    technical: {
      home: ['One channel.', 'Every <em>business</em>', 'telecom product.'],
    },
  };

  function applyTweaks() {
    document.documentElement.dataset.heroMode = tweaks.heroMode;
    document.documentElement.classList.toggle("no-accent", !tweaks.showItalicAccent);
    if (!tweaks.showItalicAccent) {
      // Disable the italic accent visually
      document.querySelectorAll(".site-hero__h em, .site-page-hero__h em, .site-product__title em").forEach((el) => {
        el.style.fontFamily = "var(--pm-font-display)";
        el.style.fontStyle = "normal";
        el.style.color = "inherit";
        el.style.fontWeight = "700";
      });
    }
    // Replace homepage hero headline if applicable
    const heroH = document.querySelector(".site-hero__h[data-tweak='hero-headline']");
    if (heroH && HEADLINES[tweaks.headlineKey] && HEADLINES[tweaks.headlineKey].home) {
      const lines = HEADLINES[tweaks.headlineKey].home;
      heroH.innerHTML = lines.join("<br/>");
    }
  }

  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tweaks)); } catch (e) {}
    try {
      window.parent.postMessage(
        { type: "__edit_mode_set_keys", edits: tweaks },
        "*"
      );
    } catch (e) {}
  }

  function setTweak(k, v) {
    tweaks[k] = v;
    persist();
    applyTweaks();
    renderPanel();
  }

  // Build a minimal floating Tweaks panel
  let panel;
  function renderPanel() {
    if (!panel) return;
    panel.innerHTML = `
      <div class="pm-tweaks__head">
        <span class="pm-tweaks__title">Tweaks</span>
        <button class="pm-tweaks__close" aria-label="Close">×</button>
      </div>
      <div class="pm-tweaks__body">
        <div class="pm-tweaks__group">
          <span class="pm-tweaks__label">Headline voice</span>
          <div class="pm-tweaks__segmented" data-control="headlineKey">
            <button data-val="default" class="${tweaks.headlineKey === 'default' ? 'is-active' : ''}">Editorial</button>
            <button data-val="direct" class="${tweaks.headlineKey === 'direct' ? 'is-active' : ''}">Direct</button>
            <button data-val="technical" class="${tweaks.headlineKey === 'technical' ? 'is-active' : ''}">Technical</button>
          </div>
        </div>
        <div class="pm-tweaks__group">
          <span class="pm-tweaks__label">Italic accent</span>
          <button class="pm-tweaks__toggle ${tweaks.showItalicAccent ? 'is-on' : ''}" data-control="showItalicAccent">
            <span class="pm-tweaks__toggle-knob"></span>
            <span class="pm-tweaks__toggle-text">${tweaks.showItalicAccent ? 'On' : 'Off'}</span>
          </button>
        </div>
        <div class="pm-tweaks__note">Italic Bai Jamjuree Italic accent inside Bai Jamjuree headlines.</div>
      </div>
    `;
    panel.querySelectorAll("[data-control='headlineKey'] button").forEach((b) => {
      b.addEventListener("click", () => setTweak("headlineKey", b.dataset.val));
    });
    panel.querySelector("[data-control='showItalicAccent']").addEventListener("click", () => {
      setTweak("showItalicAccent", !tweaks.showItalicAccent);
      // Force a reload of the page styles since we mutated inline styles
      // Reset inline styles by reloading visual state
      document.querySelectorAll(".site-hero__h em, .site-page-hero__h em, .site-product__title em").forEach((el) => {
        el.style.cssText = "";
      });
      applyTweaks();
    });
    panel.querySelector(".pm-tweaks__close").addEventListener("click", () => {
      panel.classList.remove("is-open");
      try { window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*"); } catch (e) {}
    });
  }

  function ensurePanel() {
    if (panel) return panel;
    panel = document.createElement("div");
    panel.className = "pm-tweaks";
    document.body.appendChild(panel);
    renderPanel();
    return panel;
  }

  // Listen for edit-mode messages from host
  window.addEventListener("message", (e) => {
    const data = e && e.data;
    if (!data || typeof data !== "object") return;
    if (data.type === "__activate_edit_mode") {
      ensurePanel().classList.add("is-open");
    } else if (data.type === "__deactivate_edit_mode") {
      if (panel) panel.classList.remove("is-open");
    }
  });

  // Announce availability
  try {
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
  } catch (e) {}

  // Apply initial tweaks
  applyTweaks();
})();
