# AKIN Impact Report

**Live site:** [impact.helloakin.com](https://impact.helloakin.com)  
**GitHub:** [github.com/tangosamyfrog/akin-impact](https://github.com/tangosamyfrog/akin-impact)  
**Owner:** Arvin Tang · marketing@helloakin.com  
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
├── app.jsx             # Root React app, view switch (report | masterclass), TweaksPanel
├── components.jsx      # All UI components (Nav, Hero, Dashboard, Initiatives, etc.)
├── data.jsx            # All content data — edit this for copy/stats/partner changes
├── masterclass.jsx     # Narrative Coach UI (two-panel workspace: Learn + Improve)
├── masterclass-data.jsx# Structured lesson content for the Coach's Learn mode
├── tweaks-panel.jsx    # Dev toggle panel (paper warmth, section visibility)
├── vercel.json         # SPA routing + bundles masterclass/ into the api function
├── api/
│   └── coach.js        # Serverless proxy → Claude Haiku 4.5 (Mode 2 assessment)
├── masterclass/
│   ├── knowledge-base.md   # Canonical Coach content — the AI reads this at runtime
│   └── PRD.md              # Product spec for the Narrative Coach
└── assets/
    ├── colors_and_type.css     # AKIN design tokens (shared across divisions)
    ├── AKIN_Logo.png           # Primary AKIN mark (blue pentagon) — nav + favicon
    ├── sdg_wheel.png           # UN SDG wheel — used in Causes section
    ├── akin_element_dark.png   # Dark element mark (alternative)
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
| `Nav` | Sticky top bar — logo links to helloakin.com, anchor nav | Hardcoded |
| `Hero` | 01 Hero — 4 stat cards, live panel | `HONOURS`, hardcoded stats |
| `Dashboard` | 02 Dashboard | `KPIS`, `TENANTS`, `HOURS_PLEDGED`, `REACH` |
| `Initiatives` | 03 Live now | `INITIATIVES` |
| `Engage` | 04 Four ways to engage | `ENGAGE` |
| `Projects` | 05 Project archive | `PROJECTS`, `FILTERS` |
| `Causes` | 06 Four causes + UN SDG band | `CAUSES` |
| `Partners` | 07 Partner grid (clickable links) | `PARTNERS` |
| `Learnings` | 08 What didn't work | `LEARNINGS` |
| `Quote` | Testimonial | `TESTIMONIAL` |
| `CTABand` | Get in touch | Hardcoded |
| `Footer` | Footer | Hardcoded |
| `ApplyModal` | Multi-step apply form → Formspree | Pending FORMSPREE_ID |

---

## How to edit content

All copy and data lives in **`data.jsx`** — no component knowledge needed for most updates.

### Update a KPI / stat
```js
// data.jsx → KPIS array
{ label: 'Volunteer hours · committed', value: '1,270+', delta: '...', dir: 'up' }
```

### Add / edit a partner
```js
// data.jsx → PARTNERS array (24 entries, displayed in a 4×6 grid)
{ name: 'Org Name', href: 'https://...' },   // clickable
{ name: 'Org Name', href: null },             // not linked yet
```

### Add / edit an initiative card
```js
// data.jsx → INITIATIVES array
{
  id: 'i-new',
  status: 'live',          // 'live' | 'upcoming' | 'recurring'
  featured: false,         // true = dark hero card (one at a time only)
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

### Add / edit a project row
```js
// data.jsx → PROJECTS array
{ id: 9, title: '...', partner: '...', year: '2026', region: 'SG',
  sector: 'Education', kind: 'pro-bono', tags: ['...'],
  outcomeLbl: '...', outcomeNum: '...',
  href: 'https://...'  // if set, the row becomes a clickable outbound link
}
```

---

## Form submissions (ApplyModal)

The multi-step apply modal POSTs to **Formspree**. Submissions will arrive at `marketing@helloakin.com`.

### To activate (one-time setup)
1. Go to [formspree.io](https://formspree.io) → sign in
2. Create a new form → name it "AKIN Impact Apply"
3. Copy the form ID (e.g. `xyzabcde` — the part after `/f/` in the endpoint URL)
4. Open `components.jsx` and update line 1:
```js
const FORMSPREE_ID = 'YOUR_FORMSPREE_ID'; // ← paste your ID here
```
5. `git add -A && git commit -m "activate formspree" && git push`

Fields submitted per entry: `type`, `organisation`, `cause-area`, `outcome`, `email`.

---

## UN SDG alignment (Causes section)

A band below the four cause cards shows AKIN's alignment to four UN Sustainable Development Goals:

| SDG | Goal | Colour |
|---|---|---|
| 3 | Good Health & Well-being | `#4C9F38` |
| 4 | Quality Education | `#C5192D` |
| 5 | Gender Equality | `#FF3A21` |
| 9 | Industry, Innovation & Infrastructure | `#FD6925` |

**CSS note:** the UN SDG band uses class `.un-sdg` (not `.sdg-bar`). The `.sdg-bar` class is already used by the dashboard's 6px progress bars — do not reuse it.

---

## Design tokens (quick reference)

Defined in `index.html` `:root` and `assets/colors_and_type.css`:

| Token | Value | Usage |
|---|---|---|
| `--canvas` | `#FFF4EE` | Page background (peach-50) |
| `--paper` | `#FFFFFF` | Cards, modals |
| `--paper-warm` | `#F8E9DD` | Cause cards |
| `--ink` | `#3D1A0F` | Primary text |
| `--peach-500` | `#FF8A6B` | Accent / highlights |
| `--peach-700` | `#C25B3F` | CTAs, active states |
| `--slate` | `#5B7B9A` | Secondary text, tags |

Fonts: **Space Grotesk** (headings), **Inter** (body), **JetBrains Mono** (mono/data).

---

## Pending items (as of April 2026)

| Item | Where | Notes |
|---|---|---|
| Formspree ID | `components.jsx` line 1 | Create form at formspree.io → paste ID |
| Project #7 URL | `data.jsx` → `PROJECTS[3].href` | BossMama / Go!Mama outbound link |
| SAAC URL | `data.jsx` → `PARTNERS[4].href` | Confirm which SAAC org first |
| Rinna AI URL | `data.jsx` → `PARTNERS[12].href` | Confirm URL |
| TTAB URL | `data.jsx` → `PARTNERS[1].href` | Currently set — verify with NTUC TTAB |

---

## Masterclass — Narrative Coach

A "Masterclass" tab (last nav link, before the Apply button) opens a full-screen **Narrative Coach**: Arvin's *Digital Storytelling for Social Good* masterclass turned into a self-serve coach for volunteers. It's a two-panel workspace — a left rail of the five frameworks plus an "Improve my story" mode; a right panel that teaches or coaches.

**Two modes, two content sources:**

| Mode | What it does | Powered by |
|---|---|---|
| **Learn** | Click-through lessons on the 5 frameworks (Story Map, HEART, Feel-Good Loop, CTA design, Where to Start) | `masterclass-data.jsx` — no model call, no cost |
| **Improve my story** | Volunteer picks a goal + pastes a draft → gets quick wins + questions (no scores) | `api/coach.js` → **Claude Haiku 4.5**, reading `masterclass/knowledge-base.md` |

**Editing content:**
- Change a lesson card (Learn mode) → edit `masterclass-data.jsx`.
- Change the coach's voice / assessment behaviour (Improve mode / the AI) → edit `masterclass/knowledge-base.md`. The serverless function reads it at request time, so no code change is needed.

State (current framework, goal, draft, last result) is anonymous, session-only, and mirrored to `localStorage` — a refresh doesn't wipe work; nothing is stored server-side.

### Activating Mode 2 (one-time)

Improve mode calls Claude via a Vercel serverless function that holds the API key. **Learn mode works with or without this** — until the key is set, Improve mode shows a friendly "coach isn't switched on yet" message.

1. In the Vercel dashboard for `akin-impact` → Settings → Environment Variables, add:
   ```
   ANTHROPIC_API_KEY = sk-ant-...
   ```
   (Or via CLI: `vercel env add ANTHROPIC_API_KEY`.)
2. Redeploy (any push to `main`, or `vercel --prod`).

**Guardrails baked into `api/coach.js`:** requests are accepted only from the `impact.helloakin.com` origin, input length and output tokens are capped, there's a light per-IP rate limit, and the knowledge-base system prompt is cached to cut cost. Each assessment is a fresh, stateless call. The model is set as one constant (`MODEL`) at the top of the file.

---

## Webflow note

The Webflow page `/impactreport` (created April 2026, then deleted) is gone. The canonical impact report lives at `impact.helloakin.com`. The main `helloakin.com` Webflow site is unaffected.
