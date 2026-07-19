/* ============================================================
   AKIN.IMPACT — Masterclass (Narrative Coach)
   A two-panel workspace: left rail of lessons, right panel that
   either teaches a framework (no model call) or coaches a draft
   (Improve mode → /api/coach → Haiku 4.5).
   Content lives in masterclass-data.jsx + masterclass/knowledge-base.md
   ============================================================ */
const { useState, useEffect, useRef } = React;

const MC_STORE_KEY = 'akin-coach-v1';

/* pick a stable signature line without Math.random (per session) */
const mcHashPick = (arr, seed) => arr[Math.abs(seed) % arr.length];

/* ── persistence ─────────────────────────────────────────── */
const mcLoad = () => {
  try {
    const raw = window.localStorage.getItem(MC_STORE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};
const mcSave = (state) => {
  try { window.localStorage.setItem(MC_STORE_KEY, JSON.stringify(state)); } catch {}
};

/* ── left rail ───────────────────────────────────────────── */
const McRail = ({ active, onPick }) => (
  <aside className="mc-rail">
    <div className="mc-rail-group">
      <button
        className={`mc-rail-item intro ${active === null ? 'active' : ''}`}
        onClick={() => onPick(null)}>
        <span className="mc-rail-n">✦</span>
        <span>
          <span className="mc-rail-name">Introduction</span>
          <span className="mc-rail-tag">What this is, and how to use it</span>
        </span>
      </button>
    </div>
    <div className="mc-rail-group">
      <div className="mc-rail-head">Learn the frameworks</div>
      {MC_FRAMEWORKS.map(f => (
        <button key={f.id}
          className={`mc-rail-item ${active === f.id ? 'active' : ''}`}
          onClick={() => onPick(f.id)}>
          <span className="mc-rail-n">{f.n}</span>
          <span>
            <span className="mc-rail-name">{f.name}</span>
            <span className="mc-rail-tag">{f.tagline}</span>
          </span>
        </button>
      ))}
    </div>
    <div className="mc-rail-group">
      <div className="mc-rail-head">Coach my story</div>
      <button
        className={`mc-rail-item improve ${active === 'improve' ? 'active' : ''}`}
        onClick={() => onPick('improve')}>
        <span className="mc-rail-n">→</span>
        <span>
          <span className="mc-rail-name">Improve my story</span>
          <span className="mc-rail-tag">Paste a draft, get quick wins</span>
        </span>
      </button>
    </div>
    <div className="mc-rail-foot">
      Not sure where to begin?{' '}
      <button className="mc-inline-link" onClick={() => onPick('where-to-start')}>
        Start here →
      </button>
    </div>
  </aside>
);

/* ── framework lesson (right panel, Learn mode) ──────────── */
const McLesson = ({ fw, card, setCard, onPick }) => {
  const renderCard = () => {
    if (card === 'steps') {
      return (
        <div className="mc-card">
          <div className="mc-card-label">{fw.steps.title}</div>
          <ol className="mc-steps">
            {fw.steps.items.map((s, i) => (
              <li key={i}><strong>{s.k}</strong> {s.d}</li>
            ))}
          </ol>
        </div>
      );
    }
    if (card === 'example') {
      return (
        <div className="mc-card">
          <div className="mc-card-label">{fw.example.label}</div>
          <dl className="mc-example">
            {fw.example.lines.map((l, i) => (
              <div key={i} className="mc-example-row">
                <dt>{l[0]}</dt><dd>{l[1]}</dd>
              </div>
            ))}
          </dl>
        </div>
      );
    }
    if (card === 'coach') {
      return (
        <div className="mc-card">
          <div className="mc-card-label">Questions the coach would ask you</div>
          <ul className="mc-coach-qs">
            {fw.coach.map((q, i) => <li key={i}>{q}</li>)}
          </ul>
        </div>
      );
    }
    /* default: promise */
    return (
      <div className="mc-card promise">
        <p className="mc-promise">{fw.promise}</p>
      </div>
    );
  };

  return (
    <div className="mc-lesson">
      <div className="mc-lesson-head">
        <div className="mc-eyebrow"><span className="dot"></span> Framework {fw.n} · Learn</div>
        <h2>{fw.name}</h2>
        <p className="mc-lesson-sub">{fw.promise}</p>
      </div>

      <div className="mc-card-tabs">
        {[
          ['promise', 'Overview'],
          ['steps', 'The steps'],
          ['example', 'Example'],
          ['coach', 'Coaching questions'],
        ].map(([v, l]) => (
          <button key={v}
            className={`mc-tab ${card === v ? 'active' : ''}`}
            onClick={() => setCard(v)}>{l}</button>
        ))}
      </div>

      {renderCard()}

      <div className="mc-trap">
        <span className="mc-trap-label">Common trap</span>
        <p>{fw.trap}</p>
      </div>

      <div className="mc-chips">
        {fw.chips.map((c, i) => (
          <button key={i} className="mc-chip"
            onClick={() => c.view === 'assess' ? onPick('improve') : setCard(c.view)}>
            {c.label}
          </button>
        ))}
        <button className="mc-chip solid" onClick={() => onPick('improve')}>
          Improve my story →
        </button>
      </div>
    </div>
  );
};

/* ── improve mode (right panel, coached by Haiku) ────────── */
const McImprove = ({ goal, setGoal, draft, setDraft, result, setResult }) => {
  const [status, setStatus] = useState('idle'); // idle | loading | error
  const [errMsg, setErrMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const resultRef = useRef(null);

  const canSubmit = goal && draft.trim().length > 40 && status !== 'loading';

  const submit = async () => {
    if (!canSubmit) return;
    setStatus('loading'); setErrMsg(''); setCopied(false);
    try {
      const res = await fetch(MC_COACH_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, draft: draft.trim() }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        if (res.status === 501 || res.status === 503) {
          throw new Error('The coach isn’t switched on yet. Learn mode still works while we finish setup.');
        }
        if (res.status === 429) {
          throw new Error('That’s a lot of coaching in a short time. Give it a minute and try again.');
        }
        throw new Error(body.error || 'Something went wrong reaching the coach. Try again in a moment.');
      }
      const data = await res.json();
      setResult(data);
      setStatus('idle');
      setTimeout(() => resultRef.current && resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    } catch (e) {
      setErrMsg(e.message); setStatus('error');
    }
  };

  const copyAll = () => {
    if (!result) return;
    const text = [
      'MY STORY',
      draft.trim(),
      '',
      'QUICK WINS',
      ...(result.quickWins || []).map(w => '· ' + w),
      '',
      'QUESTIONS TO SHARPEN IT',
      ...(result.questions || []).map(q => '· ' + q),
    ].join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <div className="mc-improve">
      <div className="mc-lesson-head">
        <div className="mc-eyebrow"><span className="dot"></span> Coach · Improve my story</div>
        <h2>Let’s sharpen it together</h2>
        <p className="mc-lesson-sub">
          Pick your goal, paste a draft or your rough inputs. You’ll get quick wins and
          questions, not a score. Revise and resubmit as many times as you like. That’s the point.
        </p>
      </div>

      <div className="mc-field">
        <label className="mc-label">1 · What’s this story for?</label>
        <div className="mc-goals">
          {MC_GOALS.map(g => (
            <button key={g.id}
              className={`mc-goal ${goal === g.id ? 'selected' : ''}`}
              onClick={() => setGoal(g.id)}>
              <span className="mc-goal-name">{g.label}</span>
              <span className="mc-goal-blurb">{g.blurb}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mc-field">
        <label className="mc-label">2 · Your draft (or your raw inputs)</label>
        <textarea className="mc-draft" value={draft} onChange={e => setDraft(e.target.value)}
          placeholder="Paste your post, appeal or pitch. Or jot the raw inputs: who you're speaking to, what's hard for them right now, and the one thing you want them to do."/>
        <div className="mc-draft-meta">
          <span>{draft.trim().length} characters</span>
          {draft.trim().length > 0 && draft.trim().length <= 40 &&
            <span className="mc-hint">A little more to work with, please.</span>}
        </div>
      </div>

      <div className="mc-submit-row">
        <button className="btn-ink" onClick={submit} disabled={!canSubmit}>
          {status === 'loading' ? 'Coaching…' : (result ? 'Coach it again' : 'Coach my story')} <span>→</span>
        </button>
        {!goal && <span className="mc-hint">Pick a goal first.</span>}
      </div>

      {status === 'error' && (
        <div className="mc-error">{errMsg}</div>
      )}

      {result && status !== 'loading' && (
        <div className="mc-result" ref={resultRef}>
          {result.encouragement &&
            <p className="mc-encourage">{result.encouragement}</p>}
          {result.quickWins && result.quickWins.length > 0 && <>
            <div className="mc-result-label">Quick wins</div>
            <ul className="mc-wins">
              {result.quickWins.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </>}
          {result.questions && result.questions.length > 0 && <>
            <div className="mc-result-label">Questions to sharpen it</div>
            <ul className="mc-qs">
              {result.questions.map((q, i) => <li key={i}>{q}</li>)}
            </ul>
          </>}
          <div className="mc-result-foot">
            <p className="mc-nudge">
              Now test it on one real person. Watch their face, not their words. Then bring it back and coach it again.
            </p>
            <button className="btn-ghost" onClick={copyAll}>
              {copied ? 'Copied ✓' : 'Copy story + notes'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── welcome (right panel, first load) ───────────────────── */
const McWelcome = ({ onPick, line }) => (
  <div className="mc-welcome">
    <div className="mc-eyebrow"><span className="dot"></span> AKIN Masterclass · Storytelling &amp; Narrative Genie</div>
    <h2>“{line}”</h2>
    <p className="mc-welcome-sub">
      This is Arvin’s Digital Storytelling masterclass, turned into a coach you can use on your own.
      Two things it does: teach you the five frameworks, and sharpen a story you’re working on right now.
    </p>
    <div className="mc-welcome-cards">
      <button className="mc-welcome-card" onClick={() => onPick('story-map')}>
        <span className="mc-wc-k">Learn the craft</span>
        <span className="mc-wc-t">Five short frameworks</span>
        <span className="mc-wc-d">Story Map, HEART, the Feel-Good Loop, CTA design, and where to start. Click through at your own pace.</span>
        <span className="mc-wc-go">Start with Story Map →</span>
      </button>
      <button className="mc-welcome-card solid" onClick={() => onPick('improve')}>
        <span className="mc-wc-k">Improve a story</span>
        <span className="mc-wc-t">Paste a draft, get coached</span>
        <span className="mc-wc-d">Tell the coach your goal, paste what you’ve got, and get quick wins plus sharpening questions. No scores.</span>
        <span className="mc-wc-go">Coach my story →</span>
      </button>
    </div>
    <div className="mc-quickref">
      <div className="mc-quickref-head">The one-pager</div>
      {MC_QUICK_REF.map((r, i) => (
        <div key={i} className="mc-quickref-row">
          <span className="mc-qr-k">{r[0]}</span>
          <span className="mc-qr-v">{r[1]}</span>
        </div>
      ))}
      <p className="mc-northstar">{MC_NORTH_STAR}</p>
    </div>
  </div>
);

/* ── top-level ───────────────────────────────────────────── */
const Masterclass = () => {
  const saved = useRef(mcLoad()).current || {};
  const [active, setActive] = useState(saved.active || null); // framework id | 'improve' | null
  const [card, setCard] = useState(saved.card || 'promise');
  const [goal, setGoal] = useState(saved.goal || null);
  const [draft, setDraft] = useState(saved.draft || '');
  const [result, setResult] = useState(saved.result || null);
  const line = useRef(mcHashPick(MC_SIGNATURE_LINES, (saved.seed ?? 3))).current;
  const wsRef = useRef(null);

  /* reset the card view whenever the framework changes, and align the
     workspace just under the sticky nav (not the whole page top) */
  const pick = (id) => {
    setActive(id);
    if (id !== 'improve') setCard('promise');
    if (wsRef.current) wsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* persist */
  useEffect(() => {
    mcSave({ active, card, goal, draft, result, seed: saved.seed ?? 3 });
  }, [active, card, goal, draft, result]);

  const fw = active && active !== 'improve'
    ? MC_FRAMEWORKS.find(f => f.id === active) : null;

  return (
    <div className="mc-shell">
      <div className="mc-intro">
        <div className="section-num">Masterclass</div>
        <h1 className="mc-title">Storytelling &amp; Narrative <span className="accent">Genie</span></h1>
        <p className="mc-intro-sub">
          Fifteen years of go-to-market craft, distilled for causes. AKIN has spent fifteen
          years helping brands move people to act, and our founder Arvin has spent as many
          years volunteering on the ground. This genie turns that hard-won storytelling craft
          into a coach you can use yourself: learn the five frameworks, then have it sharpen
          your own draft so your story actually gets people to volunteer, give, or share.
        </p>
      </div>
      <div className="mc-workspace" ref={wsRef}>
        <McRail active={active} onPick={pick}/>
        <section className="mc-panel">
          {!active && <McWelcome onPick={pick} line={line}/>}
          {fw && <McLesson fw={fw} card={card} setCard={setCard} onPick={pick}/>}
          {active === 'improve' &&
            <McImprove goal={goal} setGoal={setGoal} draft={draft} setDraft={setDraft}
              result={result} setResult={setResult}/>}
        </section>
      </div>
    </div>
  );
};

Object.assign(window, { Masterclass });
