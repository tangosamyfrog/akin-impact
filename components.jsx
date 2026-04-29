/* ============================================================
   AKIN.IMPACT — Components
   ============================================================ */
const { useState, useEffect, useMemo } = React;

/* ── NAV ─────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Dashboard',   id: 'dashboard'   },
  { label: 'Initiatives', id: 'initiatives' },
  { label: 'Projects',    id: 'projects'    },
  { label: 'Causes',      id: 'causes'      },
  { label: 'Report',      id: 'report'      },
];

const Nav = ({ active, setActive, onApply }) => (
  <nav className="nav">
    <a href="https://www.helloakin.com" className="brand" style={{textDecoration:'none'}}>
      <img src="assets/AKIN_Logo.png" alt="AKIN" style={{height:36,width:'auto'}}/>
      <span className="brand-tag">Impact</span>
    </a>
    <div className="nav-links">
      {NAV_LINKS.map(({label, id}) => (
        <a key={label} href={`#${id}`}
          className={active === label ? 'active' : ''}
          onClick={() => setActive(label)}>
          {label}
        </a>
      ))}
      <button className="btn-primary" onClick={onApply}>
        Apply for a pro-bono project <span>→</span>
      </button>
    </div>
  </nav>
);

/* ── HERO ─────────────────────────────────────────── */
const Hero = ({ onApply }) => (
  <header className="hero" data-screen-label="01 Hero">
    <div>
      <div className="eyebrow"><span className="dot"></span> AKIN's Annual Impact Report</div>
      <h1>
        Lift together,<br />
        <span className="underline">measure honestly.</span>
      </h1>
      <p className="hero-sub">
        We fund and run programmes that strengthen civic infrastructure across SEA.
        Initiatives updated quarterly, including learnings across projects.
      </p>
      <div className="hero-ctas">
        <a className="btn-ink" href="https://www.helloakin.com/post/our-purpose" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>Read more on our purpose <span>→</span></a>
        <button className="btn-ghost" onClick={onApply}>Apply for help</button>
        <span className="eyebrow alt" style={{marginLeft: 8}}>
          <span className="dot"></span> 5 LIVE · 1 UPCOMING · 3 OPEN FOR VOLUNTEERS
        </span>
      </div>
      <div className="hero-stats">
        <div className="stat-card"><div className="num peach">1,270+</div><div className="lbl">volunteer hours · 5 yrs</div></div>
        <div className="stat-card"><div className="num slate">45+</div><div className="lbl">partner orgs activated</div></div>
        <div className="stat-card"><div className="num ink">S$60K</div><div className="lbl">pro-bono pledged · annually</div></div>
        <div className="stat-card"><div className="num peach">&gt;S$500K</div><div className="lbl">cumulative since 2020</div></div>
      </div>
    </div>

    <aside className="live-panel">
      <div className="live-panel-eyebrow">Beneficiaries Served · 2020 Rolling</div>
      <div className="live-big">132+</div>
      <div className="live-sub">People Touched, with 20,000 Mothers reached via Go!Mama Pods-of-impact</div>
      <div className="live-chart-wrap">
        <div className="live-chart-legend">
          <span className="l">Reach · last 12 months</span>
          <span style={{color:'var(--slate-deep)'}}>▸ enrolled · ▸ retained</span>
        </div>
        <svg viewBox="0 0 320 60" style={{width:'100%', height:50, display:'block'}}>
          <polyline fill="none" stroke="#2C3E50" strokeWidth="2" points="0,50 30,46 60,42 90,38 120,32 150,28 180,24 210,20 240,16 270,12 300,8 320,6"/>
          <polyline fill="none" stroke="#3D1A0F" strokeWidth="1.5" strokeDasharray="3 3" points="0,55 30,52 60,50 90,46 120,40 150,36 180,32 210,28 240,24 270,20 300,16 320,14"/>
        </svg>
        <div className="live-x-axis"><span>Q1 2025</span><span>Q3 2025</span><span>Q1 2026</span></div>
      </div>
    </aside>
  </header>
);

/* ── DASHBOARD ─────────────────────────────────────────── */
const Donut = ({ data }) => {
  const total = data.reduce((s,d) => s + d.value, 0);
  const r = 50, c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox="0 0 132 132" className="donut">
      <circle cx="66" cy="66" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="18"/>
      {data.map((d,i) => {
        const len = (d.value/total) * c;
        const seg = (
          <circle key={i} cx="66" cy="66" r={r} fill="none"
            stroke={d.color} strokeWidth="18"
            strokeDasharray={`${len} ${c-len}`}
            strokeDashoffset={-offset}
            transform="rotate(-90 66 66)"/>
        );
        offset += len;
        return seg;
      })}
      <text x="66" y="62" textAnchor="middle" fill="#FFE9DD" style={{font:"600 22px/1 'Space Grotesk'", letterSpacing:'-0.02em'}}>
        {total.toLocaleString()}
      </text>
      <text x="66" y="80" textAnchor="middle" fill="rgba(231,230,228,0.6)" style={{font:"500 9px/1 'Inter'", letterSpacing:'0.14em'}}>
        HOURS · 2026
      </text>
    </svg>
  );
};

const Dashboard = () => {
  const [hover, setHover] = useState(null);
  return (
    <section id="dashboard" data-screen-label="02 Dashboard">
      <div className="section-head">
        <div>
          <div className="eyebrow alt"><span className="dot"></span> 02 / IMPACT DASHBOARD · LIVE</div>
          <h2 className="section-title">Outcomes, <span className="accent">not intentions.</span></h2>
        </div>
        <p className="section-aside">
          A live cut of where the money, hours and partnerships actually went.
          Refreshed weekly from project-management and finance systems.
        </p>
      </div>

      <div className="dash-row cols-3">
        {KPIS.slice(0,3).map((k,i) => (
          <div key={i} className="dash-card kpi">
            <div className="label">{k.label}</div>
            <div className="value">{k.value}</div>
            <div className={`delta ${k.dir}`}>{k.delta}</div>
          </div>
        ))}
      </div>

      <div className="dash-grid" style={{marginTop:16}}>
        <div className="dash-card">
          <div className="dash-card-head">
            <span className="dash-card-title">Cause-tenant alignment · 2026 portfolio</span>
            <span className="dash-card-meta">% of programmes contributing</span>
          </div>
          <div className="sdg-list">
            {TENANTS.map((s,i) => (
              <div key={i} className="sdg-row"
                onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                <div className="sdg-num" style={{background: s.color}}>{String(s.num).padStart(2,'0')}</div>
                <div>
                  <div className="label" style={{font:"500 13px/1.2 'Inter'"}}>{s.name}</div>
                  <div style={{font:"400 11px/1.3 'Inter'", color:'var(--ink-3)', marginTop:3, marginBottom:6}}>{s.note}</div>
                  <div className="sdg-bar"><i style={{width: `${s.pct}%`, opacity: hover === null || hover === i ? 1 : 0.3, background: s.color}}/></div>
                </div>
                <div className="pct">{s.pct}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-card dark">
          <div className="dash-card-head">
            <span className="dash-card-title">Pro-bono hours by craft</span>
            <span className="dash-card-meta">YTD 2026</span>
          </div>
          <div className="donut-wrap">
            <Donut data={HOURS_PLEDGED}/>
            <div className="donut-legend">
              {HOURS_PLEDGED.map((h,i) => (
                <div key={i} className="li">
                  <span className="sw" style={{background: h.color}}></span>
                  <span>{h.label}</span>
                  <span className="v">{h.value.toLocaleString()}h</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="dash-row cols-2" style={{marginTop:16}}>
        <div className="dash-card map-card">
          <div className="map-head">
            <div className="dash-card-head">
              <span className="dash-card-title">Reach by market · 2025</span>
              <span className="dash-card-meta">Pan-APAC · 7 markets · 70% of scope of work</span>
            </div>
          </div>
          <div className="reach-bars">
            {REACH.map((r,i) => (
              <div key={i} className="reach-row">
                <span className="country">{r.country}</span>
                <div className="bar"><i style={{width: `${r.pct}%`}}/></div>
                <span className="v">{r.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-card peach kpi">
          <div className="label">ESTIMATED VALUE</div>
          <div className="value">S$350K</div>
          <div style={{marginTop: 18, paddingTop: 18, borderTop: '1px solid rgba(61,26,15,0.18)', display:'grid', gap: 10, font:"500 13px/1.4 'Inter'"}}>
            <div style={{display:'flex', justifyContent:'space-between'}}><span>Skill-based pro-bono hours</span><span style={{font:"500 12px 'JetBrains Mono'"}}>1,270+ h · 71%</span></div>
            <div style={{display:'flex', justifyContent:'space-between'}}><span>Cash pledged · annually</span><span style={{font:"500 12px 'JetBrains Mono'"}}>S$60K · 17%</span></div>
            <div style={{display:'flex', justifyContent:'space-between'}}><span>Cross-agency activation</span><span style={{font:"500 12px 'JetBrains Mono'"}}>150+ ppl · 12%</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── INITIATIVES ─────────────────────────────────────────── */
const InitiativeCard = ({ i, onEngage }) => (
  <article className={`init-card ${i.featured ? 'featured' : ''}`} onClick={() => onEngage(i)}>
    <div className="meta-row">
      <span className={`pill ${i.status}`}>{i.status}</span>
      {i.tags.slice(0,2).map((t,k) => <span key={k} className="pill tag">{t}</span>)}
      <span style={{marginLeft: 'auto'}}>{i.deadline}</span>
    </div>
    <h3>{i.title}</h3>
    <p className="desc">{i.desc}</p>
    {i.progress !== null && (
      <div>
        <div className="progress-row" style={{marginBottom: 8}}>
          <span style={{color: i.featured ? 'rgba(231,230,228,0.7)' : 'var(--ink-3)'}}>{i.progressLabel}</span>
          <span style={{color: i.featured ? 'var(--peach-300)' : 'var(--peach-700)'}}>{i.progress}%</span>
        </div>
        <div className="progress"><i style={{width: `${i.progress}%`}}/></div>
      </div>
    )}
    <div className="cta-row">
      <span style={{font:"500 12px/1 'JetBrains Mono'", color: i.featured ? 'rgba(231,230,228,0.55)' : 'var(--ink-3)', letterSpacing:'0.1em', textTransform:'uppercase'}}>
        {i.seats || (i.status === 'recurring' ? 'Recurring' : 'Open')}
      </span>
      <a className="cta-link" onClick={(e) => { e.stopPropagation(); onEngage(i); }}>
        {i.cta} <span>→</span>
      </a>
    </div>
  </article>
);

const Initiatives = ({ onEngage }) => (
  <section id="initiatives" data-screen-label="03 Initiatives">
    <div className="section-head">
      <div>
        <div className="eyebrow"><span className="dot"></span> 03 / LIVE NOW · OPEN TO ENGAGE</div>
        <h2 className="section-title">What we're<br/>working on <span className="accent">right now.</span></h2>
      </div>
      <p className="section-aside">
        Each initiative is open in some way — funding, hours, mentors, or office-hours slots.
        Click any card to engage.
      </p>
    </div>
    <div className="init-grid">
      {INITIATIVES.map(i => <InitiativeCard key={i.id} i={i} onEngage={onEngage}/>)}
    </div>
  </section>
);

/* ── ENGAGE ─────────────────────────────────────────── */
const Engage = ({ onApply }) => (
  <section data-screen-label="04 Engage">
    <div className="section-head">
      <div>
        <div className="eyebrow alt"><span className="dot"></span> 04 / FOUR WAYS TO ENGAGE</div>
        <h2 className="section-title">Show up <span className="accent">how you can.</span></h2>
      </div>
    </div>
    <div className="engage-grid">
      {ENGAGE.map((e,i) => (
        <div key={i} className="engage-cell" onClick={onApply}>
          <span className="num">{e.num}</span>
          <h4>{e.title}</h4>
          <p>{e.body}</p>
          <span className="arrow">→</span>
        </div>
      ))}
    </div>
  </section>
);

/* ── PROJECTS ─────────────────────────────────────────── */
const Projects = () => {
  const [filter, setFilter] = useState('all');
  const filtered = useMemo(() => {
    if (filter === 'all') return PROJECTS;
    if (filter === 'pro-bono' || filter === 'low-bono') return PROJECTS.filter(p => p.kind === filter);
    return PROJECTS.filter(p => p.sector === filter);
  }, [filter]);

  return (
    <section id="projects" data-screen-label="05 Projects">
      <div className="section-head">
        <div>
          <div className="eyebrow"><span className="dot"></span> 05 / PRO-BONO &amp; LOW-BONO ARCHIVE</div>
          <h2 className="section-title">Selected projects<br/><span className="accent">2023 — now.</span></h2>
        </div>
        <p className="section-aside">
          A running ledger of who we worked with, what we shipped, and the outcome we're tracking.
          Filter by kind or sector.
        </p>
      </div>
      <div className="filters">
        {FILTERS.map(f => (
          <button key={f.id}
            className={`filter-chip ${filter === f.id ? 'active' : ''}`}
            onClick={() => setFilter(f.id)}>{f.label}</button>
        ))}
        <span style={{marginLeft: 'auto', alignSelf: 'center', font:"500 12px/1 'JetBrains Mono'", color: 'var(--ink-3)', letterSpacing: '0.1em'}}>
          {filtered.length} OF {PROJECTS.length}
        </span>
      </div>
      <div className="project-list">
        {filtered.map((p,i) => {
          const inner = <>
            <span className="idx">{String(i+1).padStart(2,'0')}</span>
            <div>
              <div className="title">{p.title}</div>
              <div className="tag-row">
                {p.tags.map((t,k) => <span key={k} className="tag">{t}</span>)}
              </div>
            </div>
            <div className="partner">{p.partner}<br/><span style={{color:'var(--ink-3)'}}>{p.region} · {p.kind}</span></div>
            <div className="outcome">
              <span className="num">{p.outcomeNum}</span>
              {p.outcomeLbl}
            </div>
            <div className="year">{p.year}</div>
            <span className="arrow">↗</span>
          </>;
          return p.href
            ? <a key={p.id} className="project-row" href={p.href} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>{inner}</a>
            : <div key={p.id} className="project-row">{inner}</div>;
        })}
      </div>
    </section>
  );
};

/* ── CAUSES ─────────────────────────────────────────── */
const Causes = () => (
  <section id="causes" data-screen-label="06 Causes">
    <div className="section-head">
      <div>
        <div className="eyebrow alt"><span className="dot"></span> 06 / FOUR CAUSES WE BACK</div>
        <h2 className="section-title">Where we put<br/>our <span className="accent">weight.</span></h2>
      </div>
      <p className="section-aside">
        As social impact catalyst, we gather partners and friends to deliver skillbased volunteering to causes we support. Let's meaningfully move the needle across Brand, Digital, Research, Creatives domains together.
      </p>
    </div>
    <div className="causes-grid">
      {CAUSES.map((c,i) => (
        <div key={i} className="cause-card">
          <span className="glyph">{c.glyph}</span>
          <h4>{c.title}</h4>
          <span className="meta">{c.meta}</span>
          <p>{c.desc}</p>
        </div>
      ))}
    </div>

    <div className="un-sdg">
      <img src="assets/sdg_wheel.png" alt="UN Sustainable Development Goals" className="un-sdg-logo"/>
      <div className="un-sdg-chips">
        <div className="un-sdg-chip" style={{background:'#4C9F38'}}><span>3</span><span>Good Health</span></div>
        <div className="un-sdg-chip" style={{background:'#C5192D'}}><span>4</span><span>Quality Education</span></div>
        <div className="un-sdg-chip" style={{background:'#FF3A21'}}><span>5</span><span>Gender Equality</span></div>
        <div className="un-sdg-chip" style={{background:'#FD6925'}}><span>9</span><span>Innovation</span></div>
      </div>
      <p className="un-sdg-text">
        Our programmes map to four UN Sustainable Development Goals — advancing equitable health outcomes for women and families, widening access to quality education across all life stages, championing gender equality through economic participation, and driving industry innovation and infrastructure through AI and technology leadership.
      </p>
    </div>
  </section>
);

/* ── PARTNERS ─────────────────────────────────────────── */
const Partners = () => (
  <section data-screen-label="07 Partners">
    <div className="section-head">
      <div>
        <div className="eyebrow"><span className="dot"></span> 07 / PARTNER ORGANISATIONS</div>
        <h2 className="section-title">It takes <span className="accent">two to tango.</span></h2>
      </div>
      <p className="section-aside">
        45+ non-profits, civic bodies, and cross-agency networks we've shipped alongside since 2020.
        We believe in long, deliberate partnerships — not drive-by interventions.
      </p>
    </div>
    <div className="partners-grid">
      {PARTNERS.map((p,i) => (
        p.href
          ? <a key={i} className="partner-cell" href={p.href} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>{p.name}</a>
          : <div key={i} className="partner-cell">{p.name}</div>
      ))}
    </div>
  </section>
);

/* ── HONEST LEARNINGS ─────────────────────────────────────────── */
const Learnings = () => (
  <section id="report" data-screen-label="08 Learnings" style={{borderTop:'none', paddingTop: 24}}>
    <div className="learnings">
      <div className="head">
        <div className="eyebrow"><span className="dot"></span> 08 / WHAT DIDN'T WORK</div>
        <h2>Receipts, including the ones that hurt.</h2>
        <p>
          Three things from the last 24 months that went sideways.
          We publish these because the alternative — only showing the wins —
          is how the social-impact sector keeps making the same mistakes.
        </p>
      </div>
      <div className="learnings-list">
        {LEARNINGS.map((l,i) => (
          <div key={i} className="learning-row">
            <span className="num">{String(i+1).padStart(2,'0')}</span>
            <div>
              <h5>{l.title}</h5>
              <p>{l.body}</p>
              <span className="verdict">{l.verdict}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── QUOTE ─────────────────────────────────────────── */
const Quote = () => (
  <section style={{borderTop: 'none', padding: 0}}>
    <div className="quote">
      <span className="glyph">"</span>
      <div className="body">
        {TESTIMONIAL.body}
      </div>
      <div className="attribution">
        <span className="name">{TESTIMONIAL.name}</span>
        {TESTIMONIAL.role},<br/>{TESTIMONIAL.org}<br/>
        <span style={{color:'var(--ink-3)', font:"500 11px 'JetBrains Mono'", letterSpacing:'0.1em', textTransform:'uppercase', display:'block', marginTop: 8}}>
          {TESTIMONIAL.meta}
        </span>
      </div>
    </div>
  </section>
);

/* ── CTA / FOOTER ─────────────────────────────────────────── */
const CTABand = ({ onApply }) => (
  <div className="cta-band">
    <div className="inner">
      <div>
        <div className="eyebrow alt" style={{color:'var(--ink)'}}><span className="dot" style={{background:'var(--ink)'}}></span> GET IN TOUCH</div>
        <h2 style={{marginTop: 16}}>Got a cause<br/>that needs lift?</h2>
        <p>
          Apply for our pro-bono intake or pledge skilled hours to a live cohort.
          We respond within five working days, every time.
        </p>
      </div>
      <div className="right">
        <button className="btn-ink" onClick={onApply}>Apply for pro bono projects <span>→</span></button>
        <button className="btn-paper" onClick={onApply}>Pledge skilled hours <span>→</span></button>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <>
    <div className="footer">
      <div>
        <div className="brand" style={{marginBottom: 16}}>
          <div className="brand-mark">A</div>
          <span className="brand-name">AKIN</span>
          <span className="brand-tag">Impact</span>
        </div>
        <p style={{font:"400 14px/1.55 'Inter'", color:'var(--ink-2)', maxWidth: 320}}>
          AKIN.IMPACT is the social-impact arm of AKIN by Techlyon, headquartered in Singapore.
          Outcomes, not intentions.
        </p>
      </div>
      <div>
        <h6>Programmes</h6>
        <ul>
          <li><a>Live initiatives</a></li>
          <li><a>Office hours</a></li>
          <li><a>Apply for a pro-bono project</a></li>
          <li><a>Pledge hours</a></li>
        </ul>
      </div>
      <div>
        <h6>Connect</h6>
        <ul>
          <li><a href="mailto:marketing@helloakin.com">marketing@helloakin.com</a></li>
          <li><a href="https://www.linkedin.com/company/helloakin/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="https://www.helloakin.com/blog" target="_blank" rel="noopener noreferrer">Thought leadership</a></li>
          <li><a href="https://www.helloakin.com" target="_blank" rel="noopener noreferrer">Home</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <span>AKIN.IMPACT · OUTCOMES, NOT INTENTIONS</span>
      <span>Singapore · Jakarta · Manila</span>
    </div>
  </>
);

/* ── APPLY MODAL (multi-step) ─────────────────────────────────────────── */
const FORMSPREE_ID = 'mzdynoaq';

const ApplyModal = ({ open, onClose }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ kind: null, org: '', focus: null, scope: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const total = 4;

  useEffect(() => { if (!open) { setStep(0); setData({ kind: null, org: '', focus: null, scope: '', email: '' }); } }, [open]);
  if (!open) return null;

  const next = () => setStep(s => Math.min(s+1, total));
  const back = () => setStep(s => Math.max(s-1, 0));
  const set = (k,v) => setData(d => ({ ...d, [k]: v }));

  const submit = async () => {
    setSubmitting(true);
    try {
      await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          type: data.kind,
          organisation: data.org,
          'cause-area': data.focus,
          outcome: data.scope,
          _replyto: data.email,
          email: data.email,
        }),
      });
    } finally {
      setSubmitting(false);
      setStep(total);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{position:'relative'}}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="eyebrow alt"><span className="dot"></span> AKIN.IMPACT INTAKE</div>

        {step < total ? (
          <>
            <div className="step-bar">
              {[0,1,2,3].map(i => <i key={i} className={i <= step ? 'done' : ''}/>)}
            </div>
            <div className="step-text">STEP {step+1} OF {total}</div>

            {step === 0 && <>
              <h3 style={{marginTop: 12}}>What are you here to do?</h3>
              <div className="radio-grid" style={{marginTop: 24}}>
                {[
                  { k: 'apply',     t: 'Apply for our help', d: 'Pro-bono / low-bono support for a cause.' },
                  { k: 'volunteer', t: 'Volunteer skilled hours', d: 'Designers, strategists, engineers.' },
                  { k: 'fund',      t: 'Co-fund a programme', d: 'Sponsor an initiative end-to-end.' },
                  { k: 'refer',     t: 'Refer a partner', d: 'Send another non-profit our way.' },
                ].map(r => (
                  <div key={r.k}
                    className={`radio-card ${data.kind === r.k ? 'selected' : ''}`}
                    onClick={() => set('kind', r.k)}>
                    <div style={{font:"600 14px/1.2 'Space Grotesk'"}}>{r.t}</div>
                    <div style={{marginTop: 6, color:'var(--ink-3)', font:"400 12px/1.4 'Inter'"}}>{r.d}</div>
                  </div>
                ))}
              </div>
            </>}

            {step === 1 && <>
              <h3 style={{marginTop: 12}}>Tell us about your organisation</h3>
              <label>Organisation name</label>
              <input value={data.org} onChange={e => set('org', e.target.value)} placeholder="e.g. Tani Bersama Co-op"/>
              <label>Cause area</label>
              <select value={data.focus || ''} onChange={e => set('focus', e.target.value)}>
                <option value="">Select one…</option>
                <option>Climate resilience</option>
                <option>Education access</option>
                <option>Health equity</option>
                <option>Civic & inclusion</option>
                <option>Other / cross-cutting</option>
              </select>
            </>}

            {step === 2 && <>
              <h3 style={{marginTop: 12}}>What does success look like?</h3>
              <p style={{color:'var(--ink-2)', marginTop: 8, font:"400 14px/1.5 'Inter'"}}>
                In 2-3 sentences. We're looking for a measurable outcome we can publish in our quarterly report.
              </p>
              <label>The outcome you're aiming for</label>
              <textarea value={data.scope} onChange={e => set('scope', e.target.value)}
                placeholder="e.g. 240 smallholder farmers shifting at least 30% of revenue from middlemen to direct-to-consumer over 12 months."/>
            </>}

            {step === 3 && <>
              <h3 style={{marginTop: 12}}>How do we reach you?</h3>
              <label>Email</label>
              <input value={data.email} onChange={e => set('email', e.target.value)} type="email" placeholder="hello@yourorg.org"/>
              <p style={{marginTop: 18, padding: 14, background: 'var(--peach-50)', borderRadius: 8, font:"400 13px/1.5 'Inter'", color:'var(--ink-2)'}}>
                We respond to every applicant within 5 working days. If we're not the right fit,
                we'll route you to a peer agency or partner who is.
              </p>
            </>}

            <div className="modal-actions">
              {step > 0 ? (
                <button className="btn-ghost" onClick={back}>← Back</button>
              ) : <span/>}
              <button className="btn-primary" onClick={step === total - 1 ? submit : next} disabled={submitting}>
                {submitting ? 'Submitting…' : (step === total - 1 ? 'Submit application' : 'Continue')} <span>→</span>
              </button>
            </div>
          </>
        ) : (
          <div className="modal-success">
            <div className="check">✓</div>
            <h3>Submitted. Thank you.</h3>
            <p style={{marginTop: 14, color: 'var(--ink-2)', font:"400 15px/1.55 'Inter'"}}>
              You'll hear from us within five working days at <strong>{data.email || 'your email'}</strong>.
              Reference <span style={{font:"500 13px 'JetBrains Mono'", background:'var(--peach-100)', padding:'2px 8px', borderRadius:4}}>IMP-2026-0247</span>.
            </p>
            <button className="btn-ink" style={{marginTop: 24}} onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

Object.assign(window, {
  Nav, Hero, Dashboard, Initiatives, Engage, Projects, Causes,
  Partners, Learnings, Quote, CTABand, Footer, ApplyModal,
});
