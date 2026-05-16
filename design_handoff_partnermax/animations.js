/* PartnerMax — animations runtime
 * Text reveal · marquee dupe · magnetic CTAs · parallax · scroll progress · cursor follower
 */

(function () {
  if (typeof window === "undefined") return;
  const reduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- 1. Text reveal: wrap each word in a mask ----------
  function splitText() {
    document.querySelectorAll("[data-reveal-text]").forEach((el) => {
      if (el.dataset.split === "1") return;
      el.dataset.split = "1";
      el.classList.add("reveal-text");

      // Walk text nodes + inline children, wrap words.
      const walk = (node) => {
        const frag = document.createDocumentFragment();
        node.childNodes.forEach((child) => {
          if (child.nodeType === Node.TEXT_NODE) {
            const text = child.textContent;
            const parts = text.split(/(\s+)/); // keep spaces
            parts.forEach((part) => {
              if (/^\s+$/.test(part)) {
                frag.appendChild(document.createTextNode(" "));
              } else if (part.length) {
                const w = document.createElement("span");
                w.className = "reveal-text__line";
                const inner = document.createElement("span");
                inner.textContent = part;
                w.appendChild(inner);
                frag.appendChild(w);
              }
            });
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            // For inline children like <em>, preserve element but recurse
            const tag = child.tagName.toLowerCase();
            if (tag === "br") {
              frag.appendChild(child.cloneNode());
            } else {
              const clone = child.cloneNode(false);
              // Recursively process this element's children
              walk(child).childNodes.forEach((n) => clone.appendChild(n));
              // Wrap the inline element so it animates in
              const w = document.createElement("span");
              w.className = "reveal-text__line";
              w.appendChild(clone);
              frag.appendChild(w);
            }
          }
        });
        return frag;
      };

      const newFrag = walk(el);
      el.innerHTML = "";
      el.appendChild(newFrag);

      // Stagger
      const items = el.querySelectorAll(".reveal-text__line > *");
      items.forEach((it, i) => {
        it.style.transitionDelay = `${Math.min(i * 60, 600)}ms`;
      });
    });
  }

  // ---------- 2. Marquee — clone children for seamless loop ----------
  function setupMarquee() {
    document.querySelectorAll(".site-marquee__track, .site-ticker__track").forEach((track) => {
      if (track.dataset.cloned === "1") return;
      track.dataset.cloned = "1";
      const children = Array.from(track.children);
      children.forEach((c) => {
        const clone = c.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      });
    });
  }

  // ---------- 3. Magnetic CTAs ----------
  function setupMagnetic() {
    if (reduced) return;
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic) || 0.25;
      let raf;
      el.classList.add("magnetic");
      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate(${dx}px, ${dy}px)`;
        });
      };
      const onLeave = () => {
        cancelAnimationFrame(raf);
        el.style.transform = "translate(0,0)";
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
    });
  }

  // ---------- 4. Hero parallax ----------
  function setupParallax() {
    if (reduced) return;
    const heroes = document.querySelectorAll(".site-hero, .site-page-hero, .site-image-break");
    if (!heroes.length) return;
    let lastScroll = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      lastScroll = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(() => {
          heroes.forEach((hero) => {
            const rect = hero.getBoundingClientRect();
            // Only apply when hero is in viewport
            if (rect.bottom < 0 || rect.top > window.innerHeight) return;
            const bg = hero.querySelector(".site-hero__bg, .site-page-hero__bg, .site-image-break__bg");
            if (!bg) return;
            // Progress: how much we've scrolled into the hero
            const progress = -rect.top;
            const factor = hero.classList.contains("site-image-break") ? 0.18 : 0.30;
            const translate = Math.max(0, progress * factor);
            bg.style.transform = `translate3d(0, ${translate}px, 0)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ---------- 5. Scroll progress bar ----------
  function setupScrollProgress() {
    let bar = document.querySelector(".scroll-progress");
    if (!bar) {
      bar = document.createElement("div");
      bar.className = "scroll-progress";
      document.body.appendChild(bar);
    }
    const update = () => {
      const docH = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
      bar.style.width = pct + "%";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  // ---------- 6. Cursor follower ----------
  function setupCursor() {
    if (reduced) return;
    if (window.matchMedia && window.matchMedia("(hover: none)").matches) return;
    const follower = document.createElement("div");
    follower.className = "cursor-follower";
    document.body.appendChild(follower);
    let x = 0, y = 0, tx = 0, ty = 0;
    let active = false;
    let raf;
    const tick = () => {
      tx += (x - tx) * 0.18;
      ty += (y - ty) * 0.18;
      follower.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!active) {
        active = true;
        follower.classList.add("is-active");
        if (!raf) tick();
      }
    });
    window.addEventListener("mouseleave", () => {
      active = false;
      follower.classList.remove("is-active");
    });
    // Hover targets
    document.addEventListener("mouseover", (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;
      if (t.closest("a, button, [data-cursor-hover]")) {
        follower.classList.add("is-hover");
      }
    }, true);
    document.addEventListener("mouseout", (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;
      if (t.closest("a, button, [data-cursor-hover]")) {
        follower.classList.remove("is-hover");
      }
    }, true);
  }

  // ---------- 7. Intersection-based class application ----------
  function setupScrollRules() {
    const rules = document.querySelectorAll(".scroll-rule");
    if (!rules.length) return;
    const update = () => {
      const vh = window.innerHeight;
      rules.forEach((rule) => {
        const rect = rule.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        // 0 when rule center is at viewport bottom, 1 when at top.
        const progress = Math.max(0, Math.min(1, 1 - center / vh));
        rule.style.setProperty("--rule-progress", progress.toFixed(3));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  function setupObservers() {
    const sel =
      ".reveal-text, .wipe-reveal, .line-grow, .site-image-break, .site-page-hero";
    const els = document.querySelectorAll(sel);
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible", "is-in-view", "is-loaded"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible", "is-in-view", "is-loaded");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));

    // page-hero: apply is-loaded on next frame for the zoom-out
    setTimeout(() => {
      document
        .querySelectorAll(".site-page-hero")
        .forEach((el) => el.classList.add("is-loaded"));
    }, 100);
  }

  // ---------- 8. Smooth-scroll the FAQ icon when accordion toggles ----------
  // (existing FAQ in site.js)

  // ---------- Init ----------
  function init() {
    splitText();
    setupMarquee();
    setupMagnetic();
    setupParallax();
    setupScrollProgress();
    setupCursor();
    setupScrollRules();
    setupObservers();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
