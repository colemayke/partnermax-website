"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Animation runtime — ported from the handoff's animations.js plus the
   fade-up observer from site.js. Excluded by design: the Tweaks panel
   (prototype-only), the contact form (now ContactForm.tsx), the FAQ
   accordion (now Faq.tsx), the nav scrolled-state (now SiteNav.tsx) and
   the JS smooth-anchor (now CSS scroll-behavior + scroll-margin-top).

   Mounted once in the root layout. Re-runs on every route change
   (keyed on pathname) because client navigation swaps the DOM the
   observers and split-text were bound to. Every listener / observer /
   rAF / injected node is torn down on cleanup so navigation doesn't
   accumulate them. prefers-reduced-motion is respected exactly as in
   the original. */
export default function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cleanups: Array<() => void> = [];

    // ---------- 1. Text reveal: wrap each word in a mask ----------
    function splitText() {
      document.querySelectorAll<HTMLElement>("[data-reveal-text]").forEach(
        (el) => {
          if (el.dataset.split === "1") return;
          el.dataset.split = "1";
          el.classList.add("reveal-text");

          const walk = (node: Node): DocumentFragment => {
            const frag = document.createDocumentFragment();
            node.childNodes.forEach((child) => {
              if (child.nodeType === Node.TEXT_NODE) {
                const text = child.textContent ?? "";
                const parts = text.split(/(\s+)/);
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
                const elChild = child as HTMLElement;
                const tag = elChild.tagName.toLowerCase();
                if (tag === "br") {
                  frag.appendChild(elChild.cloneNode());
                } else {
                  const clone = elChild.cloneNode(false) as HTMLElement;
                  walk(elChild).childNodes.forEach((n) =>
                    clone.appendChild(n)
                  );
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

          const items = el.querySelectorAll<HTMLElement>(
            ".reveal-text__line > *"
          );
          items.forEach((it, i) => {
            it.style.transitionDelay = `${Math.min(i * 60, 600)}ms`;
          });
        }
      );
    }

    // ---------- 2. Marquee — clone children for seamless loop ----------
    function setupMarquee() {
      document
        .querySelectorAll<HTMLElement>(
          ".site-marquee__track, .site-ticker__track"
        )
        .forEach((track) => {
          if (track.dataset.cloned === "1") return;
          track.dataset.cloned = "1";
          Array.from(track.children).forEach((c) => {
            const clone = c.cloneNode(true) as HTMLElement;
            clone.setAttribute("aria-hidden", "true");
            track.appendChild(clone);
          });
        });
    }

    // ---------- 3. Magnetic CTAs ----------
    function setupMagnetic() {
      if (reduced) return;
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach(
        (el) => {
          const strength = parseFloat(el.dataset.magnetic || "") || 0.25;
          let raf = 0;
          el.classList.add("magnetic");
          const onMove = (e: MouseEvent) => {
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
          cleanups.push(() => {
            cancelAnimationFrame(raf);
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
            el.style.transform = "";
            el.classList.remove("magnetic");
          });
        }
      );
    }

    // ---------- 4. Hero parallax ----------
    function setupParallax() {
      if (reduced) return;
      const heroes = document.querySelectorAll<HTMLElement>(
        ".site-hero, .site-page-hero, .site-image-break"
      );
      if (!heroes.length) return;
      let ticking = false;
      const onScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            heroes.forEach((hero) => {
              const rect = hero.getBoundingClientRect();
              if (rect.bottom < 0 || rect.top > window.innerHeight) return;
              const bg = hero.querySelector<HTMLElement>(
                ".site-hero__bg, .site-page-hero__bg, .site-image-break__bg"
              );
              if (!bg) return;
              const progress = -rect.top;
              const factor = hero.classList.contains("site-image-break")
                ? 0.18
                : 0.3;
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
      cleanups.push(() =>
        window.removeEventListener("scroll", onScroll)
      );
    }

    // ---------- 5. Scroll progress bar ----------
    function setupScrollProgress() {
      const bar = document.createElement("div");
      bar.className = "scroll-progress";
      document.body.appendChild(bar);
      const update = () => {
        const docH = Math.max(
          0,
          document.documentElement.scrollHeight - window.innerHeight
        );
        const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
        bar.style.width = pct + "%";
      };
      update();
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      cleanups.push(() => {
        window.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
        bar.remove();
      });
    }

    // ---------- 6. Cursor follower — removed by request ----------
    // The prototype's mouse-tracking red ring (.cursor-follower) was
    // intentionally dropped. No setup function; nothing is created.

    // ---------- 7. Scroll-driven rules ----------
    function setupScrollRules() {
      const rules =
        document.querySelectorAll<HTMLElement>(".scroll-rule");
      if (!rules.length) return;
      const update = () => {
        const vh = window.innerHeight;
        rules.forEach((rule) => {
          const rect = rule.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const progress = Math.max(0, Math.min(1, 1 - center / vh));
          rule.style.setProperty("--rule-progress", progress.toFixed(3));
        });
      };
      update();
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      cleanups.push(() => {
        window.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
      });
    }

    // ---------- 8. Reveal observers (animations.js) ----------
    function setupObservers() {
      const sel =
        ".reveal-text, .wipe-reveal, .line-grow, .site-image-break, .site-page-hero";
      const els = document.querySelectorAll<HTMLElement>(sel);
      if (!("IntersectionObserver" in window)) {
        els.forEach((el) =>
          el.classList.add("is-visible", "is-in-view", "is-loaded")
        );
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add(
                "is-visible",
                "is-in-view",
                "is-loaded"
              );
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
      );
      els.forEach((el) => io.observe(el));
      const t = window.setTimeout(() => {
        document
          .querySelectorAll(".site-page-hero")
          .forEach((el) => el.classList.add("is-loaded"));
      }, 100);
      cleanups.push(() => {
        io.disconnect();
        window.clearTimeout(t);
      });
    }

    // ---------- 9. Fade-up observer (site.js) ----------
    function setupFadeUp() {
      const fadeEls = document.querySelectorAll<HTMLElement>(".fade-up");
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
        cleanups.push(() => io.disconnect());
      } else {
        fadeEls.forEach((el) => el.classList.add("is-visible"));
      }
    }

    splitText();
    setupMarquee();
    setupMagnetic();
    setupParallax();
    setupScrollRules();
    setupObservers();
    setupFadeUp();

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
