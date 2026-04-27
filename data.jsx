/* ============================================================
   AKIN.IMPACT — Data
   Contextualised from PVPA / COG / B2B AOTY 2026 / Pods of Impact
   ============================================================ */

/* ── HERO HONOURS ─────────────────────────────────────────── */
const HONOURS = [
  { year: '2024 / 2025', name: 'Champion of Good',                 by: 'NVPC',                       note: 'One of only 73 awarded across 2024–25' },
  { year: '2024',        name: "President's Volunteerism & Philanthropy Award", by: 'Conferred by President Tharman', note: 'PVPA · Corporate purpose & impact' },
  { year: '2025',        name: 'Tatler Gen.T Leader of Tomorrow',  by: 'Tatler Asia · Media & Marketing', note: 'Founder, Arvin Tang · 9 markets' },
];

/* ── DASHBOARD KPIs (now grounded in real numbers) ─────────────────────────────────────────── */
/* Hours economics: 1,000+ collective volunteer hours · 132+ humans activated
   $50K pledged yearly to pro-bono · cross-agency network 150+ employees · $60K/yr pledged
   Quantify hours @ $350: 1,000h × $350 = $350K · take whichever $$ is HIGHER → $350K */
const KPIS = [
  { label: 'Volunteer hours · committed',       value: '1,270+',  delta: 'Across 5 years · 132+ humans', dir: 'up' },
  { label: 'Hours valuation @ S$350/hr',         value: 'S$350K',  delta: 'Higher than cash pledged',     dir: 'up' },
  { label: 'Pro-bono cash pledged · annually',   value: 'S$60K',   delta: 'Up from S$50K in 2024',        dir: 'up' },
  { label: 'Partner orgs activated · cumulative',value: '45+',     delta: '12 new in 2025',               dir: 'up' },
];

/* DE&I + intangibles (from B2B AOTY) ─────────── */
const DEI_METRICS = [
  { label: 'Female directors',                pct: 67, note: '67% — deliberate hiring, not aspiration' },
  { label: 'Talent retention · 2-yr',         pct: 95, note: 'Same consultant onboards & sees through' },
  { label: 'Reported fair treatment · 2022 pulse', pct: 100, note: 'Regardless of sex, gender or race' },
  { label: 'AI fluency · workforce coverage', pct: 100, note: 'Every employee upskilled via Elgo' },
  { label: 'Pan-APAC scope of work',          pct: 70, note: 'Across 7 markets in 2025' },
  { label: 'Pro-bono leave uptake',           pct: 85, note: '4 days/year volunteering policy' },
];

/* Causes alignment (replacing SDGs with AKIN's four tenants) */
const TENANTS = [
  { num: 1, name: 'AI for Good',              pct: 88, color: '#C25B3F', note: 'TTAB AI Council · 3 tracks' },
  { num: 2, name: 'Social Impact',            pct: 76, color: '#FF8A6B', note: 'COG · NVPC · PVPA conferred' },
  { num: 3, name: 'Co-creation with Partners',pct: 71, color: '#5B7B9A', note: '45+ partner orgs · 132 humans' },
  { num: 4, name: 'Education',                pct: 62, color: '#3F5972', note: 'NUS · Kaplan · TJC · Polytechnics' },
  { num: 5, name: 'Animal Welfare',           pct: 28, color: '#2C3E50', note: 'Emerging tenant · WWF #WeGotThis' },
];

const HOURS_PLEDGED = [
  { label: 'Strategy & Brand',     value: 400, color: '#FF8A6B' },
  { label: 'Creative & Design',    value: 350, color: '#C25B3F' },
  { label: 'Research & Insights',  value: 280, color: '#5B7B9A' },
  { label: 'AI Build & Engineering', value: 240, color: '#2C3E50' },
];

const REACH = [
  { country: 'Singapore',   value: 8420, pct: 92 },
  { country: 'Indonesia',   value: 2650, pct: 48 },
  { country: 'Japan / Korea', value: 1980, pct: 38 },
  { country: 'Philippines', value:  920, pct: 22 },
  { country: 'Malaysia',    value:  698, pct: 16 },
];

/* ── LIVE INITIATIVES ─────────────────────────────────────────── */
const INITIATIVES = [
  {
    id: 'i-cog',
    status: 'live',
    featured: true,
    title: 'NVPC Consulting · Company of Good × National Campaign',
    desc: "Shaping how consumers can take part in the COG momentum — inviting the public to do good alongside purpose-led businesses. Visual identity (ripple-effect, coral/navy), 2 FGDs, post-qual synthesis, B2C CTA architecture and volunteering funnel for the 10th Anniversary programme.",
    tags: ['Consulting', 'Brand', 'B2C activation'],
    progress: 71,
    progressLabel: 'In delivery · 10th Anniversary launch',
    deadline: 'NVPC · National rollout',
    seats: 'Closed cohort · Founder-led',
    cta: 'See programme brief',
  },
  {
    id: 'i-digitallyus',
    status: 'live',
    title: 'DigitallyUs · Touch Community Services',
    desc: "A cyber-wellness and proactive intervention programme for students. AKIN is assisting with narrative, brand, positioning, funding angles and creative consultancy — turning prevention messaging into something students actually opt into.",
    tags: ['Brand & narrative', 'Cyberwellness', 'Youth'],
    progress: 54,
    progressLabel: '54% scoped · 6 of 12 wks',
    deadline: 'Open · creative consult',
    seats: '1 strategist seat · 1 copy seat',
    cta: 'Volunteer skills',
  },
  {
    id: 'i-saac',
    status: 'live',
    title: 'SAAC Volunteer Portal · user journey & retention',
    desc: 'Working with the SAAC team on volunteer onboarding, journey, matching and retention — redesigning the portal so first-time volunteers actually return for a second shift.',
    tags: ['UX research', 'Service design', 'Animal welfare'],
    progress: 42,
    progressLabel: '42% staffed · 8 wks',
    deadline: 'Open until filled',
    seats: '2 UX research seats · 1 designer',
    cta: 'Join the cohort',
  },
  {
    id: 'i-ttab',
    status: 'live',
    title: 'National AI Council · TTAB × NTUC · 3 tracks',
    desc: 'Sitting on the National AI Council administered by TTAB / NTUC, contributing across three tracks: AI for Good, Tech Pulse (ground-up health-check of relevant skillsets for upskilling) and CTO/CIO Leaders Community for the betterment of workers.',
    tags: ['AI for Good', 'Policy', 'Upskilling'],
    progress: 60,
    progressLabel: 'Concept paper seeded · AISG · AWS · Tata · JTC · IAL',
    deadline: 'Quarterly council',
    seats: 'Founder serves on EXCO',
    cta: 'Read concept paper',
  },
  {
    id: 'i-pods',
    status: 'live',
    title: 'Pods of Impact · with Go!Mama',
    desc: 'Backed by NVPC and Temasek Foundation, POI converts nursing-pod infrastructure into a purpose-built OOH network — reaching mothers during high-dwell, high-trust care moments. Not a CSR initiative; a structural argument about where attention lives.',
    tags: ['Co-creation', 'Mothers', 'OOH network'],
    progress: 45,
    progressLabel: '300 pods targeted by 2027 · 45+ impact partners',
    deadline: 'Rolling onboarding',
    seats: '20,000+ community supported',
    cta: 'Partner with Pods',
  },
  {
    id: 'i-rise',
    status: 'upcoming',
    title: 'RISE · 6-module youth + parent AI curriculum',
    desc: 'A national youth skilling programme with ACE.sg. Six modules, two tracks (youth + parent). Looking for facilitators and curriculum reviewers ahead of pilot.',
    tags: ['Education', 'Curriculum', 'AI literacy'],
    progress: 18,
    progressLabel: '18% scoped · pilot Q3',
    deadline: 'Apply by Aug 1',
    cta: 'Apply to facilitate',
  },
];

/* ── ENGAGE ─────────────────────────────────────────── */
const ENGAGE = [
  { num: '01', title: 'Submit a cause',         body: 'If your non-profit needs brand, narrative, AI or research support, apply for our pro-bono intake.', cta: 'apply' },
  { num: '02', title: 'Pledge skilled hours',   body: 'Designers, strategists, researchers, engineers — pledge 8+ hours a quarter into a live cohort.',     cta: 'volunteer' },
  { num: '03', title: 'Co-fund a programme',    body: 'Sponsor an initiative end-to-end, or co-fund alongside other purpose-led businesses. Quarterly reporting.', cta: 'fund' },
  { num: '04', title: 'Refer a partner',        body: 'Know a non-profit doing real work? Send them our way — we close the loop with you within five working days.', cta: 'refer' },
];

/* ── SELECTED PROJECTS ─────────────────────────────────────────── */
/* Lifted from B2B AOTY content bank + COG/PVPA decks.
   Internal initiatives + DE&I + brand-guardian style engagements. */
const PROJECTS = [
  { id: 4, title: 'DigitallyUs · cyber-wellness narrative',      partner: 'Touch Community Services',    year: '2025', region: 'SG', sector: 'Education',      kind: 'pro-bono', tags: ['Narrative','Brand','Funding'], outcomeLbl: 'Programme positioning', outcomeNum: 'In flight' },
  { id: 5, title: 'SAAC Volunteer Portal · onboarding redesign', partner: 'SAAC',                        year: '2025', region: 'SG', sector: 'Animal welfare', kind: 'pro-bono', tags: ['UX','Service','Retention'], outcomeLbl: 'Volunteer matching uplift', outcomeNum: 'Target +30%' },
  { id: 6, title: 'WWF #WeGotThis · climate campaign',           partner: 'WWF',                         year: '2024', region: 'SG', sector: 'AI for Good',    kind: 'pro-bono', tags: ['Climate','Campaign'], outcomeLbl: 'Cross-agency activation', outcomeNum: '4 partners' },
  { id: 7, title: 'BossMama / Go!Mama · GTM & fundraising',      partner: 'Social enterprises',          year: '2024', region: 'SG', sector: 'Social Impact',  kind: 'pro-bono', tags: ['Strategy','GTM','Fundraising'], outcomeLbl: 'Mothers reached', outcomeNum: '7,500+', href: null },
  { id: 8, title: 'TTSH · Breast Cancer Awareness Month',        partner: 'Tan Tock Seng Hospital',      year: '2023', region: 'SG', sector: 'Social Impact',  kind: 'pro-bono', tags: ['Health','Campaign'], outcomeLbl: 'Sunset · ad-hoc model', outcomeNum: 'Learnings filed' },
];

const FILTERS = [
  { id: 'all',           label: 'All initiatives' },
  { id: 'AI for Good',   label: 'AI for Good' },
  { id: 'Social Impact', label: 'Social Impact' },
  { id: 'Co-creation',   label: 'Co-creation' },
  { id: 'Education',     label: 'Education' },
  { id: 'Animal welfare',label: 'Animal welfare' },
];

/* ── CAUSES (4 tenants) ─────────────────────────────────────────── */
const CAUSES = [
  { glyph: '01', title: 'AI for Good',               desc: 'TTAB AI Council, three tracks: AI for Good, Tech Pulse and CTO/CIO Leaders. Architecture seeded with AISG, AWS, Tata, JTC and IAL.', meta: '2 active programmes' },
  { glyph: '02', title: 'Social Impact',             desc: 'NVPC COG consulting, PVPA-conferred work, Pods of Impact and a $60K-a-year pro-bono pledge across mission-driven orgs.',           meta: '4 active programmes' },
  { glyph: '03', title: 'Co-creation with Partners', desc: 'Cross-agency network of 150+ employees across Oangle, NVPC, Finn Partners and Rinna AI — activating a societal cause-of-choice each year.', meta: '12+ partners activated' },
  { glyph: '04', title: 'Education & Animal welfare', desc: 'University curricula at NUS, Kaplan, polytechnics; mentorship cohorts; and SAAC volunteer-portal redesign for the animal-welfare community.', meta: '3 active programmes' },
];

/* ── PARTNERS ─────────────────────────────────────────── */
const PARTNERS = [
  { name: 'NVPC',                       href: 'https://www.nvpc.org.sg' },
  { name: 'TTAB',                       href: 'https://www.ttab.org.sg/' },
  { name: 'NTUC',                       href: 'https://www.ntuc.org.sg' },
  { name: 'Touch Community',            href: 'https://www.touch.org.sg' },
  { name: 'SAAC',                       href: null },
  { name: 'Go!Mama',                    href: 'https://gomama.com.sg/' },
  { name: 'Temasek Foundation',         href: 'https://www.temasekfoundation.org.sg' },
  { name: 'WWF',                        href: 'https://www.wwf.sg' },
  { name: 'TTSH',                       href: 'https://www.ttsh.com.sg' },
  { name: 'Temasek JC',                 href: 'https://www.temasekjc.moe.edu.sg' },
  { name: 'RICE Comms',                 href: 'https://ricecomms.com' },
  { name: 'Oangle',                     href: 'https://www.oangle.com.sg' },
  { name: 'Rinna AI',                   href: null },
  { name: 'raiSE',                      href: 'https://www.raise.sg' },
  { name: 'Access SG',                  href: 'https://www.access-sg.co/' },
  { name: 'The Local Farm',             href: 'https://thelocalfarm.sg/' },
  { name: 'Rainbow Centre',             href: 'https://www.rainbowcentre.org.sg' },
  { name: 'Willing Hearts',             href: 'https://www.willinghearts.org.sg' },
  { name: 'ICDL / Kaplan',             href: 'https://www.icdlasia.org' },
  { name: 'SAFRA Punggol',             href: 'https://www.safra.sg/clubhouses/punggol' },
  { name: 'Singapore Computing Society',href: 'https://www.scs.org.sg' },
  { name: 'PA · SG75',                 href: 'https://www.pa.gov.sg' },
  { name: 'AISG',                       href: 'https://aisingapore.org' },
  { name: 'NUS',                        href: 'https://www.nus.edu.sg' },
];

/* ── HONEST LEARNINGS · 8 retained, contextualised ─────────────────────────────────────────── */
const LEARNINGS = [
  {
    title: 'Bloodbank interactive site that informed without a clear CTA',
    body: 'We built an interactive donor-information site, but the experience over-indexed on education and under-indexed on the ask. Without a single, strong CTA tying the journey to a booked appointment, attention converted to interest — not action. We now require a primary conversion event scoped before any visual concepts.',
    verdict: 'Sunset · 2024',
  },
  {
    title: "Breast Cancer Awareness Month — handover doesn't survive annual org rotation",
    body: "Each year's Breast Cancer Awareness Month team at TTSH was different, so the data, audience segments and remarketing hooks we built couldn't be handed across. Year-on-year compounding evaporated. We now scope ad-hoc campaigns only when there's a multi-year custodian on the partner side.",
    verdict: 'Pivoted · 2024',
  },
  {
    title: 'Ad-hoc campaign pro-bono is less effective than skill-based brand-guardianship',
    body: 'One-off campaign donations look generous on a slide but rarely move the needle for the cause. Embedded, multi-year, skill-based consultancy — where AKIN acts as brand guardian over a sustained window — produces compounding outcomes. As of 2025 our default engagement is a 12-month minimum brand-guardian model.',
    verdict: 'Policy change · 2025',
  },
];

/* ── TESTIMONIAL ─────────────────────────────────────────── */
const TESTIMONIAL = {
  body: "AKIN didn't just hand us a brand and walk away. They sat in our team meetings for months — that's why the work outlasted the engagement. Their team felt like an extension of our own — proactive, strategic, and always willing to go the extra mile.",
  name: 'Prakash Menon',
  role: 'Group Director, National Blood Donation Programme',
  org: 'Singapore Red Cross',
  meta: 'Cross-agency DE&I & volunteering · Singapore · 2025',
};

Object.assign(window, {
  HONOURS, KPIS, DEI_METRICS, TENANTS, HOURS_PLEDGED, REACH,
  INITIATIVES, ENGAGE, PROJECTS, FILTERS, CAUSES, PARTNERS,
  LEARNINGS, TESTIMONIAL,
});
