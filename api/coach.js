/* ============================================================
   AKIN.IMPACT — Narrative Coach assessment proxy
   Vercel serverless function. Holds ANTHROPIC_API_KEY, reflects
   off masterclass/knowledge-base.md, calls a cheap Claude model
   (Haiku 4.5) and returns quick wins + questions. No SDK — plain
   fetch, so the site stays build-free.

   Guardrails (sensible defaults):
     - only accepts POST from the impact.helloakin.com origin
     - caps input length and output tokens
     - light per-IP rate limit (best-effort, in-memory)
     - system prompt (voice + KB) is cached to cut cost
   ============================================================ */
const fs = require('fs');
const path = require('path');

const MODEL = 'claude-haiku-4-5';          // cheap model for the assessment step
const MAX_DRAFT_CHARS = 6000;              // input cap
const MAX_TOKENS = 1024;                   // output cap
const RATE_LIMIT = { windowMs: 60_000, max: 8 };  // per IP per minute

const ALLOWED_ORIGIN_SUFFIXES = ['helloakin.com'];
const ALLOWED_GOALS = { recruitment: 1, fundraising: 1, awareness: 1 };

/* KB is loaded once per warm invocation and reused (bundled via vercel.json) */
let KB_CACHE = null;
function loadKnowledgeBase() {
  if (KB_CACHE) return KB_CACHE;
  const p = path.join(process.cwd(), 'masterclass', 'knowledge-base.md');
  KB_CACHE = fs.readFileSync(p, 'utf8');
  return KB_CACHE;
}

/* best-effort in-memory rate limiter (resets on cold start) */
const HITS = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const arr = (HITS.get(ip) || []).filter(t => now - t < RATE_LIMIT.windowMs);
  if (arr.length >= RATE_LIMIT.max) { HITS.set(ip, arr); return true; }
  arr.push(now);
  HITS.set(ip, arr);
  return false;
}

function originAllowed(origin) {
  if (!origin) return true; // same-origin requests may omit Origin; allow
  try {
    const host = new URL(origin).hostname;
    return ALLOWED_ORIGIN_SUFFIXES.some(s => host === s || host.endsWith('.' + s))
      || host === 'localhost' || host === '127.0.0.1';
  } catch { return false; }
}

const SYSTEM_INSTRUCTIONS = `You are Arvin, coaching a volunteer through the AKIN "Digital Storytelling for Social Good" masterclass. You are not a manual reciting itself; you are a coach in the room.

The volunteer has picked a goal (recruitment, fundraising, or awareness) and pasted a draft or their raw inputs. Assess it strictly against the knowledge base below, using HEART as the spine and following the assessment logic in section 3.

Return ONLY:
- one line of genuine encouragement naming what is already working (never manufactured praise),
- 1 to 3 quick wins, each one concrete, doable, and phrased as an action,
- 2 to 4 questions that help the volunteer strengthen the story themselves.

No scores. No report cards. No headings inside the values. British English. No em dashes. Coach by question. Stay strictly inside the five frameworks; never invent facts about the volunteer's cause, and never drift into tension theory or AI prompting. If the draft is already strong, say so plainly and offer one stretch improvement rather than inventing criticism.`;

const OUTPUT_SCHEMA = {
  type: 'object',
  properties: {
    encouragement: { type: 'string' },
    quickWins: { type: 'array', items: { type: 'string' } },
    questions: { type: 'array', items: { type: 'string' } },
  },
  required: ['encouragement', 'quickWins', 'questions'],
  additionalProperties: false,
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  if (!originAllowed(req.headers.origin)) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Learn mode still works; Mode 2 is simply not switched on yet.
    res.status(503).json({ error: 'The coach is not switched on yet.' });
    return;
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    res.status(429).json({ error: 'Too many requests. Give it a minute.' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const goal = body && body.goal;
  let draft = body && body.draft;

  if (!ALLOWED_GOALS[goal]) {
    res.status(400).json({ error: 'Pick a goal: recruitment, fundraising, or awareness.' });
    return;
  }
  if (typeof draft !== 'string' || draft.trim().length < 40) {
    res.status(400).json({ error: 'Give the coach a little more to work with.' });
    return;
  }
  draft = draft.trim().slice(0, MAX_DRAFT_CHARS);

  const kb = loadKnowledgeBase();

  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: [
          {
            type: 'text',
            text: SYSTEM_INSTRUCTIONS + '\n\n=== KNOWLEDGE BASE ===\n\n' + kb,
            cache_control: { type: 'ephemeral' },
          },
        ],
        output_config: { format: { type: 'json_schema', schema: OUTPUT_SCHEMA } },
        messages: [
          {
            role: 'user',
            content: `The volunteer's goal is: ${goal}.\n\nHere is their draft (or raw inputs):\n\n${draft}`,
          },
        ],
      }),
    });

    if (!anthropicRes.ok) {
      const detail = await anthropicRes.text().catch(() => '');
      console.error('Anthropic error', anthropicRes.status, detail);
      res.status(502).json({ error: 'The coach had trouble responding. Try again in a moment.' });
      return;
    }

    const data = await anthropicRes.json();
    const textBlock = (data.content || []).find(b => b.type === 'text');
    if (!textBlock) {
      res.status(502).json({ error: 'The coach returned an empty response. Try again.' });
      return;
    }

    let parsed;
    try { parsed = JSON.parse(textBlock.text); }
    catch { res.status(502).json({ error: 'The coach returned an unexpected format. Try again.' }); return; }

    res.status(200).json({
      encouragement: String(parsed.encouragement || ''),
      quickWins: Array.isArray(parsed.quickWins) ? parsed.quickWins.slice(0, 3).map(String) : [],
      questions: Array.isArray(parsed.questions) ? parsed.questions.slice(0, 4).map(String) : [],
    });
  } catch (e) {
    console.error('coach proxy error', e);
    res.status(500).json({ error: 'Something went wrong reaching the coach.' });
  }
};
