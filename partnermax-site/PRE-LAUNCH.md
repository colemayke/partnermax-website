# PartnerMax — Pre-launch checklist

The site is built to the design handoff with **fidelity to the prototype**.
Everything below is plausible-but-invented content from the prototype, or
infrastructure that needs real credentials. **None of it should ship to
production as-is.** Items map to the README's "Pre-launch content checklist"
and "Accessibility checklist".

Status legend: ✅ done · ⚠️ needs real content/credentials · ⛔ blocked on a
third party.

---

## Content (all currently prototype copy — replace before launch)

- [ ] ⚠️ **Customer logos** — `app/components/LogoMarquee.tsx` ships `Rogers®`
      + 7 dashed "Partner logo" placeholders. Replace with real signed-partner
      marks. Drop SVGs in `public/assets/` and render real `<img>`/inline SVG.
- [ ] ⚠️ **FAQ answers** — homepage `app/page.tsx` (`FAQ_ITEMS`) and process
      `app/process/page.tsx` (`PROCESS_FAQ`). Legal-review every answer
      (SLAs, ownership, billing claims).
- [ ] ⚠️ **Founding story** — `app/about/page.tsx` story section. Replace with
      real PartnerMax history.
- [ ] ⚠️ **Leadership bios** — `app/about/page.tsx` (`TEAM`). Confirm Dean
      Mayke + Brian Ochab roles, bios, emails, LinkedIn URLs with them. The
      "34-person team" line and the Dean Mayke pull-quote are invented.
- [ ] ⚠️ **Wider team ("The team" grid)** — `app/about/page.tsx` (`STAFF`):
      names are real (Melanie Tessier, Dan Charbonneau, Ryan Jemielity,
      Cole Mayke, Cristian Vegara). The **roles are still placeholders**
      assigned arbitrarily — confirm each person's real title, and add
      portraits, before launch.
- [ ] ⚠️ **Team portraits** — `TeamCard` falls back to initials (DM / BO).
      Pass `member.photo` (4:3, dark/moody) once real portraits exist; put
      files in `public/assets/`.
- [ ] ⚠️ **Mission / differentiators / product copy** — all
      invented marketing copy in `app/page.tsx` + `app/about/page.tsx`.
      Confirm every operational claim (timelines, "$0 consultation",
      "99.9% SLA", "14–21 days", phone/address) is true and approved.
- [ ] ⚠️ **Contact details (placeholders)** — `hello@partnermax.ca`,
      `999 999 9999` (explicit placeholder number), `Placeholder St` appear
      in `app/components/SiteFooter.tsx` AND `app/contact/page.tsx`. Replace
      all with real ones.
- [ ] ⛔ **Rogers® treatment** — wordmark in the marquee + references in copy.
      Replace per Rogers' actual co-brand guidelines / channel agreement.

## Legal (drafts in place, NOT reviewed)

- [ ] ⚠️ **Privacy / Terms / Accessibility** — `app/privacy`, `app/terms`,
      `app/accessibility`. Each renders a visible "Draft — not legal advice"
      banner and is `robots: noindex`. Replace with counsel-reviewed copy and
      remove the banner + noindex. (Footer links already point at these
      routes instead of the prototype's `#`.)

## Contact form backend

- [x] ✅ Wired to **Resend** — `app/api/contact/route.ts`, server-side
      validation, HTML escaping, graceful 503 when unconfigured.
- [ ] ⚠️ Set env vars (see `.env.example` → copy to `.env.local`):
      `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
- [ ] ⚠️ **Verify the sending domain in Resend** (resend.com → Domains).
      The `onboarding@resend.dev` fallback only delivers to the Resend
      account owner — it is not a production sender.
- [ ] Optional: add spam protection (honeypot / Turnstile) before going live.

## SEO / meta / assets

- [x] ✅ Title template + description + OpenGraph + Twitter — `app/layout.tsx`.
- [x] ✅ Favicon — `app/icon.svg` (brand "PM" tile; replace the scaffold's
      Next logo, done).
- [x] ✅ OG image — `app/opengraph-image.tsx` (system-font brand card).
- [ ] ⚠️ Confirm `metadataBase` URL in `app/layout.tsx` (currently
      `https://partnermax.ca`) and have brand sign off the favicon / OG art.
- [ ] ⚠️ **Analytics** not installed (no provider chosen). Add Vercel
      Analytics / Plausible / GA4 and a cookie/consent notice consistent
      with the privacy policy.
- [ ] ⚠️ **Hero/break photos are oversized** — `public/assets/photo-*.jpg`
      are 2.5–7 MB PNGs (mislabeled `.jpg`), used as CSS backgrounds to
      preserve the documented parallax + overlay. Compress/convert to
      optimized WebP/AVIF (target < ~300 KB each) before launch; update the
      `backgroundImage` URLs if filenames change.

## Accessibility (README checklist)

- [x] ✅ Skip-to-content link (`app/layout.tsx` + `.skip-link`).
- [x] ✅ Semantic FAQ buttons with `aria-expanded` / `aria-controls`
      (`app/components/Faq.tsx`).
- [x] ✅ Labelled form fields, native validation, visible focus rings.
- [x] ✅ One H1 per page; `prefers-reduced-motion` respected throughout.
- [ ] ⚠️ Full keyboard-nav pass + screen-reader test (NVDA / VoiceOver) and
      a WCAG 2.2 AA contrast audit before launch.
- [ ] Note: the prototype has **no mobile nav menu** (links hide < 700px,
      only logo + CTA show). Reproduced faithfully — decide if a real mobile
      menu is needed before launch.

## Prototype-only — intentionally NOT shipped

- Tweaks panel (`site.js` edit-mode) — stripped.
- `Design System.html` reference page — not a customer page, excluded.
- `<image-slot>` drag-drop web component — replaced by `TeamCard`'s
  initials fallback + optional `photo` prop.
- The prototype's JS smooth-anchor — replaced by CSS
  `scroll-behavior: smooth` + `scroll-margin-top` (honours reduced-motion).

## Verify before launch

```bash
npm run build && npm run lint   # both must pass
```
