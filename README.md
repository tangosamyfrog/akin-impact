# AKIN Impact Report

**Live site:** [impact.helloakin.com](https://impact.helloakin.com)  
**GitHub:** [github.com/tangosamyfrog/akin-impact](https://github.com/tangosamyfrog/akin-impact)  
**Owner:** Arvin Tang · arvin.t@helloakin.com  
**Last updated:** April 2026

---

## What this is

A standalone React SPA serving as AKIN's live impact dashboard — tracking pro-bono programmes, volunteer hours, partner orgs, DE&I metrics and live initiatives. Separate from the main Webflow site (`helloakin.com`) so it can be updated independently without touching Webflow.

Design system: peach-duotone paper canvas (Impact division colours). Built mobile-responsive, no build step required — plain HTML + JSX loaded via Babel standalone.

---

## Infrastructure

| Layer | Service | Detail |
|---|---|---|
| Hosting | Vercel | Auto-deploys on every GitHub push to `main` |
| DNS | Cloudflare | A record `impact` → `76.76.21.21` (proxy OFF / grey cloud) |
| Domain | `impact.helloakin.com` | SSL issued by Vercel |
| Repo | GitHub | `tangosamyfrog/akin-impact` |

**Edit workflow:** edit files locally → `git add -A && git commit -m "..." && git push` → Vercel deploys in ~30 seconds.

---

## File structure

```
akin-impact/
├── index.html          # Entry point — all CSS, font imports, loads JSX files via Babel
├── app.jsx             # Root React app, TweaksPanel (paper variants, section toggles)
├── components.jsx      # All UI components (Nav, Hero, Dashboard, Initiatives, etc.)
├── data.jsx            # All content data — edit this for copy/stats/partner changes
├── tweaks-panel.jsx    # Dev toggle panel (paper warmth, section visibility)
├── vercel.json         # SPA routing — all paths serve index.html
└── assets/
    ├── colors_and_type.css   # AKIN design tokens (shared across divisions)
    ├── AKIN_Logo.png          # Primary AKIN mark (blue pentagon) — used in nav + favicon
    ├── sdg_wheel.png          # UN SDG wheel logo — used in Causes section
    ├── akin_element_dark.png  # Dark element mark (alternative logo)
    ├── akin_element_coloured.png
    ├── akin_quote.svg
    ├── akin_arrow_right.svg
    ├── akin_dark_arrow.svg
    ├── akin_instagram.png
    └── akin_linkedin.png
```

---

## Components (sections in order)

| Component | Section | Key data source |
|---|---|---|
| `Nav` | Sticky top bar | Hardcoded — logo, anchor links, CTA |
| `Hero` | 01 Hero | `HONOURS`, hardcoded stats |
| `Dashboard` | 02 Dashboard | `KPIS`, `TENANTS`, `HOURS_PLEDGED`, `REACH`, `DEI_METRICS` |
| `Initiatives` | 03 Live now | `INITIATIVES` |
| `Engage` | 04 Four ways to engage | `ENGAGE` |
| `Projects` | 05 Project archive | `PROJECTS`, `FILTERS` |
| `Causes` | 06 Four causes + SDG bar | `CAUSES` |
| `Partners` | 07 Partner grid | `PARTNERS` |
| `Learnings` | 08 What didn't work | `LEARNINGS` |
| `Quote` | Testimonial | `TESTIMONIAL` |
| `CTABand` | Get in touch | Hardcoded |
| `Footer` | Footer | Hardcoded |
| `ApplyModal` | Multi-step apply form | Formspree POST |

---

## How to edit content

All copy and data lives in **`data.jsx`** — no component knowledge required for most updates.

### Update a KPI number
```js
// data.jsx → KPIS array
{ label: 'Volunteer hours · committed', value: '1,270+', ... }
```

### Add / remove a partner
```js
// data.jsx → PARTNERS array
{ name: 'Org Name', href: 'https://...' },   // with link
{ name: 'Org Name', href: null },             // no link yet
```

### Add an initiative
```js
// data.jsx → INITIATIVES array
{
  id: 'i-new',
  status: 'live',          // 'live' | 'upcoming' | 'recurring'
  featured: false,         // true = dark hero card (only one at a time)
  title: '...',
  desc: '...',
  tags: ['Tag1', 'Tag2'],
  progress: 60,
  progressLabel: '...',
  deadline: '...',
  seats: '...',
  cta: 'Button text',
}
```

### Update a project row
```js
// data.jsx → PROJECTS array
{ id: 9, title: '...', partner: '...', year: '2026', region: 'SG',
  sector: 'Education', kind: 'pro-bono', tags: ['...'],
  outcomeLbl: '...', outcomeNum: '...',
  href: 'https://...'   // if set, row becomes a clickable outbound link
}
```

---

## Form submissions (ApplyModal)

The multi-step apply modal POSTs to **Formspree**. Submissions arrive at `arvin.t@helloakin.com`.

### To activate (one-time setup)
1. Go to [formspree.io](https://formspree.io) → sign in with `arvin.t@helloakin.com`
2. Create a new form → name it "AKIN Impact Apply"
3. Copy the form ID (e.g. `xyzabcde` — the part after `/f/` in the endpoint)
4. Open `components.jsx` and replace on line ~1:
```js
const FORMSPREE_ID = 'YOUR_FORMSPREE_ID'; // ← paste your ID here
```
5. Commit and push

Fields sent per submission: `type`, `organisation`, `cause-area`, `outcome`, `email`.

---

## Design tokens (quick reference)

Defined in `index.html` `:root` and `assets/colors_and_type.css`:

| Token | Value | Usage |
|---|---|---|
| `--canvas` | `#FFF4EE` | Page background (peach-50) |
| `--paper` | `#FFFFFF` | Cards, modals |
| `--paper-warm` | `#F8E9DD` | Cause cards, warm surfaces |
| `--ink` | `#3D1A0F` | Primary text |
| `--peach-500` | `#FF8A6B` | Accent / highlights |
| `--peach-700` | `#C25B3F` | CTAs, active states |
| `--slate` | `#5B7B9A` | Secondary text, tags |

Fonts loaded from Google Fonts: **Space Grotesk** (headings), **Inter** (body), **JetBrains Mono** (mono/data).

---

## Pending items (as of April 2026)

| Item | Status | Notes |
|---|---|---|
| Formspree ID | Not set | See form submissions section above |
| Project #7 URL | Not set | BossMama / Go!Mama — set `href` in `PROJECTS[3]` once confirmed |
| SAAC URL | Not set | Confirm which SAAC org, then set `href` in `PARTNERS[4]` |
| Rinna AI URL | Not set | Confirm URL, then set `href` in `PARTNERS[12]` |
| TTAB URL | Set (verify) | `https://www.ttab.org.sg/` — confirm with NTUC TTAB |

---

## Webflow note

A Webflow page (`/impactreport`) was created during an earlier session but is now deleted. The canonical impact report lives here at `impact.helloakin.com`. The main `helloakin.com` site remains fully on Webflow and is unaffected.
