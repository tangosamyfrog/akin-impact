# PRD — Narrative Coach

**A guided practitioner tool for volunteers building stories that recruit, raise, and raise awareness.**

Owner: Arvin Tang, AKIN
Source material: *Digital Storytelling for Social Good* masterclass + recorded session insights
Status: Draft v1.0
Companion file: `narrative-coach-knowledge-base.md`

---

## 1. Summary

Narrative Coach is a lightweight, self-hostable chatbot that turns Arvin's masterclass into a hands-on coach volunteers can use on their own. It does two jobs:

1. **Learn the frameworks interactively.** Volunteers click through short, prompted lessons on the five core frameworks, in Arvin's voice.
2. **Improve their own story.** Volunteers paste a draft or raw inputs, and a cheap Claude model returns quick wins and sharpening questions, assessed against all five frameworks.

The goal is not to hand volunteers a finished story. It is to teach the craft and coach them toward a better one, so their storytelling actually moves people to volunteer, give, or share.

---

## 2. Problem

Volunteers are asked to tell their organisation's story, but most have never been taught how. They default to the biggest storytelling mistake from the masterclass: they start with the organisation ("we need donations", "we have an event") instead of the audience. The result is information that doesn't change behaviour.

The masterclass fixes this in a room, once. Narrative Coach makes that coaching available any time, at each volunteer's own pace, applied to their own real cause.

---

## 3. Goals and non-goals

**Goals**
- Teach five frameworks (Story Map, HEART, Feel-Good Loop, CTA design, Where to Start) in an interactive, click-to-learn format.
- Coach a volunteer's own draft with quick wins and follow-up questions, no scores.
- Tune coaching to the volunteer's chosen goal: recruitment, fundraising, or awareness.
- Sound unmistakably like Arvin: direct, warm, plain-spoken, British English, no em dashes.
- Run self-hosted, reflecting off an editable Markdown knowledge base, using a cheap Claude model only for the analysis step.

**Non-goals**
- Not a story generator. It coaches; it does not write the volunteer's story for them.
- Not a grading tool. No scores, no report cards.
- Does not teach tension theory or AI prompting. Deliberately out of scope to keep volunteers focused.
- Not a CRM or campaign manager. It ends at "your story is stronger, go use it".

---

## 4. Users

- **Primary:** volunteers with little or no storytelling training, preparing a post, appeal, or pitch.
- **Secondary:** volunteer leads and coordinators who want a consistent way to level up their people.
- **Context of use:** solo, on a phone or laptop, often the night before they need to post or send something. Short sessions. Low patience for theory.

---

## 5. The two modes

### Mode 1 — Learn the frameworks (click-through)

- Volunteer picks a framework or taps "where do I start?".
- Each framework is a short lesson card: the promise, the steps, a worked micro-example, and a coaching question.
- Every card ends with tappable next prompts (e.g. "Give me a worked example", "Help me map my own story") so learning flows without typing.
- Cards cross-link, and always offer a jump to Mode 2.

*Frameworks and their click-through chips are defined in the knowledge base, section 4.*

### Mode 2 — Improve my story (assessment)

- Volunteer states their goal (recruitment / fundraising / awareness), then pastes a draft or their raw inputs (audience, situation, what they want people to do).
- The cheap Claude model runs the draft against all five frameworks, using HEART as the spine.
- It returns: one line of encouragement, then **quick wins** (1 to 3 concrete fixes) and **questions to sharpen it** (2 to 4). No scores.
- The volunteer can revise and resubmit as many times as they like. Iteration is the point.

*Assessment logic is defined in the knowledge base, section 3.*

---

## 6. Frameworks in scope

Full teaching content lives in the knowledge base. Summary:

1. **Story Map** — Who, Why, Tension, Change, Action. Clarity before writing.
2. **HEART** — Human first, Emotion before information, Arc of change, Relevant, Take action. The master rubric.
3. **Feel-Good Loop** — Story, Feel Good, Action, Reward, Stickiness. Why supporters come back. Instant vs delayed gratification.
4. **CTA design** — one clear action, matched to readiness, delivered inside the 36-hour window.
5. **Where to Start** — the sequence that unblocks a frozen volunteer: goal, map, one human, rough draft, HEART check, loop and CTA, test.

Cross-cutting principles carried from the session: begin with the audience not the organisation; "what's in it for me?"; the 36-hour memory-decay window; deep singular stories beat broad shallow ones; people buy hope, belonging, identity, and the feeling of doing good.

---

## 7. Voice and tone

The bot is Arvin coaching, not a manual reciting. Full spec in knowledge base section 0. In short: person before framework, blunt but kind, short sentences, coach by question, British English, no em dashes, uses the class's own language.

---

## 8. Architecture

**Principle:** as much logic as possible lives in scripts reflecting off the Markdown knowledge base. The AI model is used only where genuine language analysis is needed (Mode 2 assessment, and free-form questions), and it is a cheap model.

- **Knowledge base:** a single Markdown file (`narrative-coach-knowledge-base.md`), editable by the AKIN team. Content changes without touching code.
- **Front end:** self-hosted static page. Learn mode is driven directly by the knowledge base content and click-through chips, no model call needed for standard lessons.
- **Assessment / Q&A:** front end sends the volunteer's input plus the relevant knowledge base sections to a cheap Claude model via a small backend proxy that holds the API key. The system prompt is assembled from knowledge base sections 0 and 3.
- **Cost control:** default to serving lessons from the knowledge base with no model call. Only call the model when the volunteer submits a draft or asks a free-form question. Keep max tokens tight. Cache the system prompt.

*Note on deployment:* the browser cannot call the Anthropic API directly on a public site without exposing a key. A thin backend proxy (a serverless function is enough) holds the key and forwards requests. This is the only server-side piece required.

---

## 9. Feedback and iteration (built into the product)

Reflecting the session's emphasis on testing narratives with real people:
- The bot always ends an assessment by inviting a revise-and-resubmit, so iteration is one tap away.
- Volunteers are nudged to test their refined story on one real person and bring back what they observed.
- Optional later: log (anonymised) which quick wins recur most, to show AKIN where volunteers struggle and to feed future masterclass content.

---

## 10. Success metrics

- **Learning:** volunteers complete at least one full framework path per session.
- **Application:** share of sessions that reach Mode 2 (a real draft submitted).
- **Iteration:** average number of resubmissions per story (higher is better here; it means they're refining).
- **Craft signal (qualitative):** in submitted drafts, presence of a named human hero, an emotion-first opening, and a clear single CTA over time.
- **Outcome (self-reported, optional):** did the story help hit a recruitment, fundraising, or awareness goal?

---

## 11. Build phases

- **Phase 1:** knowledge base + Learn mode (click-through lessons, no model calls). Ships value with zero AI cost.
- **Phase 2:** Mode 2 assessment via cheap model + backend proxy. Quick wins and questions, no scores.
- **Phase 3:** goal-tuning polish, resubmission flow, and optional anonymised insight logging.

---

## 12. Open questions

- Where will the backend proxy live (existing AKIN infra, or a serverless function)?
- Should volunteers be able to save or export a refined story, or is the tool intentionally session-only?
- Do we want a lightweight sign-in to track a volunteer's progress across the five paths, or keep it frictionless and anonymous?
- Which cheap Claude model is the target for the assessment step, and what is the per-session token budget?

---

*Companion deliverable: `narrative-coach-knowledge-base.md` contains the full teaching content, voice spec, assessment logic, and click-through paths that this product reflects off.*
