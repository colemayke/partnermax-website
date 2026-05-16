# Handoff: PartnerMax Marketing Site

## Overview

PartnerMax is a B2B channel partnership company licensed to sell Rogers business products
(wireless, dedicated fibre, voice plans, bundles) to Canadian businesses. This handoff
package contains a complete design system and three working HTML reference designs for
the customer-facing marketing site:

- **Homepage** — hero, customer marquee, products, differentiators, image break,
  process teaser, FAQ, contact form
- **About** — founding story, mission, leadership (Dean Mayke + Brian Ochab as Managing
  Partners), four written commitments
- **Process** — five-step process (Inquire → Free Consultation → Quote → Provision → Bill)
  with timeline, detailed step cards, and process FAQ

## About these design files

The HTML files in this bundle are **design references** — high-fidelity prototypes
showing intended look, content, motion and behavior. They are not production code to
copy directly.

**Your task:** Recreate these designs in the target codebase's existing environment
(React + Next.js, Vue, etc.) using its established patterns. If no environment exists
yet, **Next.js with the App Router** is recommended as the framework — the design is
content-heavy, marketing-focused, and benefits from server-rendered HTML for SEO.

The CSS token file (`tokens.css`) can be lifted directly or converted into your
framework's token system (Tailwind config, CSS-in-JS theme, etc.). The HTML files
are clean and semantic — the structure should translate cleanly into components.

## Fidelity

**High-fidelity.** Every color, font size, spacing value, radius, shadow, and animation
in these files is final. Match them pixel-perfectly. Where measurements appear in the
CSS files, those are the values to ship.

---

## Brand foundations

### Logo
- Five SVG variants in `assets/` — use them as inline SVG where possible (the logo
  recolors via `fill` and benefits from being a single asset across breakpoints):
  - `partnermax-logo.svg` — primary, "PARTNER" white + "MAX" red (use on dark surfaces)
  - `partnermax-logo-light.svg` — "PARTNER" dark + "MAX" red (use on light surfaces)
  - `partnermax-logo-sm.svg` — monochrome white (default for nav on dark)
  - `partnermax-logo-mono-dark.svg` — monochrome dark (editorial / press use)
  - `partnermax-logo-red.svg` — one-color red

### Color palette
All values are defined as CSS custom properties in `tokens.css`. Use the token, not the
literal hex:

| Token | Hex | Use |
|---|---|---|
| `--pm-red-600` | `#DD0000` | Primary brand red. Hero accent, primary CTA, links |
| `--pm-red-500` | `#F02121` | Italic accent in headlines, hover, dark-mode primary |
| `--pm-red-700` | `#B80505` | Pressed states, accents on light surfaces |
| `--pm-ink-900` | `#0C0D0D` | Maximum Dark — primary surface for dark sections |
| `--pm-ink-500` | `#667684` | Steel Grey — secondary text, dividers |
| `--pm-ink-0`   | `#FFFFFF` | Light surface |
| `--pm-ivory-50` | `#FAF8F5` | Warm light editorial surface (FAQ section, etc.) |

Semantic states use `--pm-success-500`, `--pm-warning-500`, `--pm-info-500`, `--pm-danger-500`.
Full scales (50–950) defined for red and ink — see `tokens.css`.

### Typography

Three font families, each with a clear role. **Load via Google Fonts** — the import
URL is the first line of `tokens.css`.

| Role | Family | Use |
|---|---|---|
| Display | **Bai Jamjuree** | All headlines, buttons, eyebrows, section labels |
| Editorial (italic accent) | **Bai Jamjuree Italic** | The italic accent inside bold headlines — same family, italic, inherits parent weight |
| Body | **Manrope** | All paragraphs, descriptions, FAQ answers, form inputs |
| Mono | **JetBrains Mono** | Code, technical labels, ticker pills, timestamps |

Tokens: `--pm-font-display`, `--pm-font-editorial`, `--pm-font-body`, `--pm-font-ui`, `--pm-font-mono`.

#### The signature gesture
Inside every bold display headline, **one phrase is wrapped in `<em>`** (the brand
accent). It renders as Bai Jamjuree Bold Italic in `--pm-red-500` or `--pm-red-600`.
Examples from the prototypes:

- *"The licensed channel for **Canadian** business."*
- *"Three reasons this is **different**."*
- *"Built in **Toronto**. Deployed coast to coast."*

Use this once per headline, never twice. The CSS rules `.site-hero__h em`,
`.site-block-head__title em`, etc. apply the styling.

### Type scale (all in `tokens.css`)
```
--pm-text-2xs:  11px  (eyebrow, tag)
--pm-text-xs:   12px  (caption, button SM)
--pm-text-sm:   14px  (UI default, body small)
--pm-text-base: 16px  (body)
--pm-text-lg:   18px  (lede, body large)
--pm-text-xl:   22px  (h5)
--pm-text-2xl:  28px  (h4)
--pm-text-3xl:  36px  (h3)
--pm-text-4xl:  48px  (h2)
--pm-text-5xl:  64px  (h1)
--pm-text-6xl:  88px  (display)
--pm-text-7xl:  128px (hero)
```

Hero headlines use `clamp(56px, 8vw, 128px)` for responsive scale. See `.site-hero__h` in `site.css`.

### Spacing (4-pt base)
`--pm-space-1` (4px) through `--pm-space-20` (160px). See `tokens.css` for the full
scale. Section vertical padding is `--pm-space-12` (96px); section gutter is `--pm-space-9` (64px).

### Radii
| Token | Value | Use |
|---|---|---|
| `--pm-radius-sm` | 4px | Buttons, form inputs (default) |
| `--pm-radius-md` | 6px | Small cards |
| `--pm-radius-lg` | 10px | Product cards, team cards |
| `--pm-radius-xl` | 16px | Marketing hero blocks |
| `--pm-radius-full` | 999px | Pills, badges, avatars |

### Shadows
Restrained. `--pm-shadow-xs` through `--pm-shadow-xl`, plus `--pm-shadow-red` for the
brand-red glow used on featured CTAs.

---

## Screens

### 1. Homepage (`homepage.html`)

#### Structure (top → bottom)
1. **Fixed nav** (`.site-nav`) — transparent over hero, blurs to opaque on scroll
2. **Hero** (`.site-hero`) — full viewport, Vancouver skyline bg with dark + red overlay, eyebrow + H1 + body + dual CTA
3. **Logo marquee** (`.site-logos` → `.site-marquee`) — auto-scrolling, Rogers® + 7 dashed placeholders
4. **Scroll rule** (between sections) — fills red as you scroll past, labeled "01 / Products"
5. **Products grid** (`.site-products`) — 4 cards: Wireless · Fibre · Plans & Voice · Enterprise Connect (featured = dark variant)
6. **Scroll rule** — "02 / Why PartnerMax"
7. **Differentiators** (`.site-diff`, dark) — 3 columns: Licensed channel · One ops roof · Real Canadian operations
8. **Full-bleed image break** (`.site-image-break`) — Toronto skyline, "Built in Toronto. Deployed coast to coast."
9. **Scroll rule** — "03 / How it works"
10. **Process teaser** (`.site-process-teaser`) — 5 columns linking to process.html
11. **Scroll rule** — "04 / FAQ"
12. **FAQ accordion** (`.site-faq`, ivory bg) — 6 questions, one open by default
13. **Scroll rule** — "05 / Get in touch"
14. **CTA banner + contact form** (`.site-cta-banner`) — dark, with embedded form inside
15. **Ops ticker** (`.site-ticker`) — horizontal scrolling status pills
16. **Footer** (`.site-footer`) — 5-column sitemap + legal row

#### Nav
- Three links: About · Process · Contact (anchor)
- Two right-side actions: `Sign in` text link + `Become a partner` primary button
- States: default (transparent), scrolled (.is-scrolled — blurs background + adds bottom border)
- Animated red underline on hover (CSS `::after` scale)

#### Hero
- Min-height: 100vh
- Background: `assets/photo-vancouver.jpg` with darken + red radial overlay
- H1: `clamp(56px, 8vw, 128px)`, Bai Jamjuree Bold, `letter-spacing: -0.035em`, line-height 0.88
- Italic accent on "Canadian" — Bai Jamjuree Bold Italic, `--pm-red-500`
- Two CTAs: primary red `Become a partner` (magnetic — translates 0.3 × cursor distance), outline `Talk to sales`
- Scroll cue at bottom-right ("Scroll for the channel")
- Parallax: bg translates at 0.30× scroll speed via JS

### 2. About (`about.html`)

#### Structure
1. Fixed nav (About marked `.is-active`)
2. **Page hero** (`.site-page-hero`) — shorter than homepage, Vancouver bg, H1 + intro
3. Scroll rule — "01 / The founding"
4. **Story** (`.site-story`) — 2 col: main copy + aside. Aside has a tall Toronto image inset + 3 descriptive blocks (Headquarters, Coverage, Specialization). **No fabricated stats.**
5. Scroll rule (dark) — "02 / Mission"
6. **Mission** (dark) — block-head + 3-column diff grid + an italic pull-quote ("A good channel partner is invisible…") attributed to Dean Mayke
7. Scroll rule — "03 / Leadership"
8. **Team** (`.site-team`) — 2 large cards (Dean Mayke + Brian Ochab). Each card has an `<image-slot>` web component for portrait drag-drop (falls back to initials "DM" / "BO" with italic accents). Role · name · bio · contact rows.
9. **Values** (ivory bg) — 4 "commitments" cards: Named contacts, 1-day response SLA, Quotes are quotes, No surprise renewals
10. **CTA banner**
11. Footer (shared)

### 3. Process (`process.html`)

#### Structure
1. Fixed nav (Process marked `.is-active`)
2. **Page hero** — Train station bg, "Five steps, start to *activation*."
3. **Timeline** (`.site-timeline`, subtle bg) — 5 columns with step number + title + time estimate (each step has a red dot beneath it on the connecting line)
4. Scroll rule — "02 / Five steps"
5. **Five step cards** (`.site-process__step`) — each is a 3-column grid: huge red step number (sticky) · content (title + description + bullet list) · side panel (3 spec blocks like Timing / Cost / Hand-off)
6. Scroll rule — "03 / Process FAQ"
7. **Process FAQ** (ivory) — 5 questions specific to operations
8. **CTA banner**
9. Footer

---

## Interactions & motion

All animation logic lives in `animations.js` + `animations.css`. The site uses `IntersectionObserver` and `requestAnimationFrame` — no heavy libraries.

### Scroll-driven
- **Text reveal** — every element with `data-reveal-text` gets its words wrapped in mask spans on init. When the element enters the viewport, the `.is-visible` class triggers a staggered word-by-word slide-up (900ms, `cubic-bezier(0.22, 1, 0.36, 1)`, 60ms stagger capped at 600ms total).
- **Parallax** — `.site-hero__bg`, `.site-page-hero__bg`, and `.site-image-break__bg` translate at 0.18×–0.30× scroll speed (`translate3d`, no scale transforms to avoid GPU conflicts).
- **Scroll progress bar** — fixed 2px red bar at top of viewport, `width: scrollY / (docHeight - vh) * 100%`.
- **Scroll-driven rules** — `.scroll-rule` elements with a CSS custom property `--rule-progress` (0 → 1) updated on scroll. The `.scroll-rule__fill` width grows left-to-right as the rule passes through the viewport center. Each rule has a small monospaced label tag on the right edge.
- **Block-head accents** — section number gets a red 48px underline that draws beneath it on entry (`.site-block-head__num::after`).
- **Fade-up** — generic `.fade-up` class with `data-delay="1..5"` for staggered card/list reveals.

### Hover
- **Magnetic CTAs** — buttons with `data-magnetic="0.3"` translate toward the cursor by `0.3 ×` distance (rAF-throttled).
- **Nav underline** — `::after` red bar scales from left to right under each nav link on hover, and stays for `.is-active`.
- **Product / team cards** — `translateY(-4px)` + softer shadow + product icon scales 1.08 / rotates -3deg.
- **Footer links** — red `→` arrow slides in to the left of each link.
- **Cursor follower** — 14px red ring follows the cursor with easing (1 / 0.18 lag). Grows to 56px over hover targets (a, button, `[data-cursor-hover]`). Uses `mix-blend-mode: difference`. Hidden on touch devices and reduced-motion.

### Continuous
- **Marquee logo strip** — `.site-marquee__track` animates `translateX(0 → -50%)` over 38s linear infinite. JS clones children once at init for seamless loop. Hover pauses.
- **Ops ticker** — same marquee mechanism, 36s. Status pills with blinking red and green dots.
- **CTA banner pulse** — `radial-gradient` red glow scales 1 → 1.18 → 1 over 8s ease-in-out infinite.

### Forms
- The contact form (`#contact-form` in homepage.html) uses native HTML5 validation + custom `.is-invalid` styling on blur.
- Submit prevents default, validates all fields, shows a green success message inside the form on success.

### Reduced motion
- Every animation respects `prefers-reduced-motion: reduce` — marquees, text reveals, parallax, magnetic, cursor all disabled cleanly.

---

## Component anatomy

### Buttons (`.pm-btn`)
- Sizes: default (11/18 padding, 14px), `--sm` (7/12, 12px), `--lg` (14/24, 16px)
- Variants: `--primary` (red bg), `--secondary` (dark ink bg), `--outline`, `--ghost`, `--link`
- Always Bai Jamjuree Medium, radius 4px, transition 120ms on bg + border
- Magnetic version: add `data-magnetic="0.3"` attribute

### Forms (`.pm-field`, `.pm-input`, `.pm-select`, `.pm-textarea`)
- Label · Bai Jamjuree Medium 12px above field
- Input · Manrope 14px Regular, 10/12 padding, 1px border, 4px radius
- Focus · 1px red border + 3px focus ring (`rgba(221, 0, 0, 0.18)`)
- Invalid · `.is-invalid` class adds red border + 3px red ring

### Cards
- **Product card** (`.site-product`) — 28px padding, 10px radius, min-height 380px, hover lift -4px
- **Team card** (`.site-team__card`) — 4:3 image area on top + 28/32 body; image slot inside `.site-team__photo`
- **Stat / commitment card** (`.pm-card`) — generic surface card, 24px padding, 10px radius
- **FAQ item** (`.site-faq__item`) — top border, click-to-expand answer (max-height transition 360ms), 32px round + icon at right rotates 45° when open and turns red

### Badges (`.pm-badge`)
Variants: default, `--brand`, `--success`, `--warning`, `--info`. Optional `--dot` modifier adds a 6px dot before.

---

## State, content & data

The prototypes are static, but assume these data shapes for the real implementation:

```ts
type Product = {
  num: string;          // "01 / Wireless"
  title: string;        // "Rogers Business Wireless"
  desc: string;
  icon: SVG;
  featured?: boolean;   // applies .site-product--featured
};

type FAQItem = {
  q: string;
  a: string;            // can include inline HTML
  defaultOpen?: boolean;
};

type ProcessStep = {
  num: string;          // "01."
  eyebrow: string;      // "Step 01 · Inquire"
  title: string;
  desc: string;
  bullets: string[];
  side: { label: string; val: string; desc: string; }[];  // exactly 3
};

type TeamMember = {
  role: string;         // "Managing Partner · Channel & Operations"
  name: string;         // "Dean Mayke"
  initials: string;     // "DM" — fallback when no photo
  bio: string;
  meta: { label: string; value: string; href?: string; }[];
};
```

### Form submission
The contact form currently just shows a success message inline. Wire it to your CRM
or email service (e.g. POST to `/api/contact` and dispatch to HubSpot / Salesforce /
postmark). Validate the same fields server-side.

### Routing
- `/` → homepage
- `/about` → about
- `/process` → process
- The site nav uses `is-active` class on the current page link — set this server-side
  in your framework's routing layer.

---

## Files in this bundle

| File | Purpose |
|---|---|
| `tokens.css` | All design tokens (colors, fonts, spacing, radii, shadows, motion). **Source of truth.** Lift directly or port into your theming system. |
| `design-system.css` | Styles for the design system reference page (`Design System.html`). Not used by the marketing site — included for context. |
| `site.css` | All marketing-site component + layout styles |
| `animations.css` | Animation + interaction styles (reveals, marquee, scroll-rules, cursor, etc.) |
| `site.js` | Nav scroll, FAQ accordion, contact form validation, smooth anchor scroll, Tweaks panel |
| `animations.js` | Text reveal, marquee duplication, magnetic, parallax, scroll progress, scroll-rules, cursor follower |
| `image-slot.js` | Web component for drag-drop image placeholders (used in About team cards) |
| `ds-icons.js` | Icon set for the design system reference page |
| `homepage.html` | Homepage prototype |
| `about.html` | About prototype |
| `process.html` | Process prototype |
| `Design System.html` | Full brand guidelines reference — read this for visual context on tokens, components, applications |
| `assets/` | Logo SVG variants + photography (Vancouver / Toronto / rail station) |

---

## Implementation recommendations

### Framework choice
**Next.js 14+ (App Router)** is recommended:
- Marketing site needs server-rendered HTML for SEO
- File-based routing maps cleanly: `app/page.tsx` (home), `app/about/page.tsx`, `app/process/page.tsx`
- React Server Components handle the content with zero client JS overhead
- Move client-only interactions (FAQ toggle, animations, contact form) into client components

### Token integration
Two good options:

1. **Lift `tokens.css` directly** — import once in the root layout, reference `var(--pm-*)` everywhere. Lowest friction.
2. **Port to Tailwind config** — set `theme.extend.colors`, `fontFamily`, `spacing`, `borderRadius` from `tokens.css`. Better DX for component composition.

Either works. The token names are designed to read cleanly in both worlds.

### Animation library
The included `animations.js` is vanilla and ~250 lines. You can either:

- **Keep it as-is** in a client component, loaded once
- **Port to GSAP** if you want polish on the magnetic + text-reveal effects (recommended for production)
- **Port to Motion (Framer Motion)** if you're already using it

For text reveals specifically, GSAP's `SplitText` is more robust than the included word-splitter.

### Image handling
The 3 photographs in `assets/` are JPEGs. Run them through `next/image` (or your
framework's image optimization) for responsive sizes — they'll appear in the hero,
page heroes, image break, and editorial inset.

### Fonts
Google Fonts. In Next.js:
```ts
import { Bai_Jamjuree, Manrope, JetBrains_Mono } from "next/font/google";
```
This handles font subsetting and FOUC prevention automatically.

### What NOT to ship
- The "Tweaks" panel in `site.js` (everything under `// ---------- Tweaks ----------`)
  is for prototype iteration only. Strip it for production.
- The `Design System.html` reference page is a designer/dev tool, not a customer page.
- The fabricated copy (founding story, "Dean Mayke" / "Brian Ochab" details, FAQ
  answers) is plausible-but-invented. **Replace with real content** before launch.
- The "Rogers®" + dashed placeholder marquee — replace with real customer logos as
  partnerships are signed.

### Accessibility checklist
- The contact form uses semantic labels + native validation ✓
- FAQ accordion uses real `<button>` elements ✓
- Color contrast on red-on-dark and ink-on-light meets WCAG AA ✓
- `prefers-reduced-motion` respected throughout ✓
- Heading hierarchy is clean (one H1 per page) ✓
- Add skip-to-content link in your nav (not in the prototype)
- Test all interactive elements with keyboard nav before launch

---

## Pre-launch content checklist

- [ ] Replace all placeholder customer logos with real signed-partner marks
- [ ] Replace the 4 FAQ answers with legal-reviewed copy
- [ ] Replace the founding-story copy with real PartnerMax history
- [ ] Confirm Dean Mayke + Brian Ochab bios with them
- [ ] Add real portraits to the team image-slots (4:3 ratio, dark/moody to match site palette)
- [ ] Wire the contact form to a real backend
- [ ] Replace "Rogers®" treatment with whatever Rogers' co-brand guidelines actually permit
- [ ] Add a real privacy policy + terms (linked in footer)
- [ ] Add meta tags, OG image, favicon
- [ ] Set up analytics

---

## Questions?

If anything in the prototype is unclear — a particular animation, a layout decision, the
intent behind a section — open the corresponding HTML file and inspect the live behavior.
The CSS class names are descriptive (e.g. `.site-process__num`, `.site-image-break__bg`)
and the JS in `animations.js` is annotated.

Good luck shipping it.
