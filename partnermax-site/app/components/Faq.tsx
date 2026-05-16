"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Plus } from "./icons";

export type FaqItem = {
  q: string;
  a: ReactNode;
  defaultOpen?: boolean;
};

/* Accordion. Single-open (opening one closes the others), one open by
   default — matches site.js.

   Reveal is owned here, not by SiteEffects' global .fade-up observer.
   This component re-renders on every open/close, and if an external
   script had imperatively added `is-visible` to a .fade-up node, React
   would overwrite className on the next render and strip it — making
   the item collapse back to opacity:0 (the "items disappear when I
   click them" bug). Keeping `fade-up`/`is-visible` fully React-driven
   makes className the single source of truth. `prefers-reduced-motion`
   still shows everything via the CSS media query. */
export default function Faq({
  items,
  itemReveal = false,
}: {
  items: FaqItem[];
  itemReveal?: boolean;
}) {
  const baseId = useId();
  const defaultIdx = Math.max(
    0,
    items.findIndex((it) => it.defaultOpen)
  );
  const [openIdx, setOpenIdx] = useState<number>(defaultIdx);
  const [revealed, setRevealed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      // No IO (very old/edge runtime): reveal on the next frame rather
      // than synchronously in the effect.
      const id = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const vis = revealed ? " is-visible" : "";

  return (
    <div
      ref={rootRef}
      className={"site-faq" + (itemReveal ? "" : " fade-up" + vis)}
    >
      {items.map((item, i) => {
        const isOpen = openIdx === i;
        const panelId = `${baseId}-faq-${i}`;
        return (
          <div
            key={item.q}
            className={
              "site-faq__item" +
              (itemReveal ? " fade-up" + vis : "") +
              (isOpen ? " is-open" : "")
            }
            {...(itemReveal && i > 0 ? { "data-delay": String(i) } : {})}
          >
            <button
              type="button"
              className="site-faq__q"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => {
                // Guarantee the item is revealed before it animates open.
                setRevealed(true);
                setOpenIdx(isOpen ? -1 : i);
              }}
            >
              <span>{item.q}</span>
              <span className="site-faq__icon">
                <Plus />
              </span>
            </button>
            <div className="site-faq__a" id={panelId} role="region">
              <div className="site-faq__a-inner">{item.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
