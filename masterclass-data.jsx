/* ============================================================
   AKIN.IMPACT — Masterclass (Narrative Coach) content
   Structured lesson data for the "Learn" mode of the coach.
   Mirrors masterclass/knowledge-base.md — the canonical source
   the AI assessment reads. Edit lessons here; edit AI behaviour
   and voice in the knowledge base markdown.
   ============================================================ */

/* ── Signature lines the coach opens with (voice, KB §0) ─────── */
const MC_SIGNATURE_LINES = [
  "Information doesn't change behaviour. Stories do.",
  "Every audience is silently asking: what's in it for me?",
  "The hero isn't your organisation. It's your beneficiary, your donor, or your volunteer.",
  "People don't buy charities. They buy hope, belonging, and the feeling of doing good.",
  "Feel-good isn't fluff. It's the engine of retention.",
];

/* ── The five frameworks (KB §1) ─────────────────────────────
   Each framework renders as a lesson in the right panel.
   `chips` are the tappable click-through prompts; each chip has
   a `view` telling the panel which card to swap to:
     'promise' | 'steps' | 'example' | 'coach'  → cards below
     'assess'                                    → jump to Improve mode
     framework id (e.g. 'heart')                 → jump to that framework
   ------------------------------------------------------------ */
const MC_FRAMEWORKS = [
  {
    id: 'story-map',
    n: 'A',
    name: 'Story Map',
    tagline: 'Start here',
    promise: 'Get clarity before you write a single sentence.',
    steps: {
      title: 'The five questions, in order',
      items: [
        { k: 'Who',     d: 'are we speaking to? One person, not "the public".' },
        { k: 'Why',     d: 'should they care? Their reason, not yours.' },
        { k: 'Tension', d: 'what is hard or unresolved right now?' },
        { k: 'Change',  d: 'what transformation are we promising?' },
        { k: 'Action',  d: 'what one thing do we want them to do?' },
      ],
    },
    example: {
      label: 'Worked example · recruitment',
      lines: [
        ['Who', 'a working parent in their 30s who feels they have no spare time.'],
        ['Why', 'they want their kids to see them give back, not just talk about it.'],
        ['Tension', 'they think volunteering means a weekly commitment they can’t make.'],
        ['Change', 'they discover a two-hour monthly slot that fits, and it becomes the thing their family does together.'],
        ['Action', 'sign up for one Saturday session.'],
      ],
    },
    coach: [
      'Who is the one person you picture when you tell this? Give me an age, a worry, a Saturday.',
      'Say why they should care in their words, not the charity’s words.',
      'What do they believe today that gets in the way?',
      'After your story, they should be able to do one thing. What is it?',
    ],
    trap: 'Starting with the organisation ("we have an event") instead of the audience. If the Who and Why aren’t sharp, nothing downstream works.',
    chips: [
      { label: 'Show me the five questions', view: 'steps' },
      { label: 'Give me a worked example', view: 'example' },
      { label: 'Help me map my own story', view: 'assess' },
    ],
  },
  {
    id: 'heart',
    n: 'B',
    name: 'HEART',
    tagline: 'The master rubric',
    promise: 'If you forget everything else, remember HEART. It is the checklist a finished story must pass.',
    steps: {
      title: 'What each letter means',
      items: [
        { k: 'H · Human First',            d: 'Is there a real person at the centre? Not a programme, a person.' },
        { k: 'E · Emotion Before Information', d: 'Does the reader feel something before they’re handed a fact or a figure?' },
        { k: 'A · Arc of Change',          d: 'Does someone move from one state to another? Before and after.' },
        { k: 'R · Relevant to the Audience', d: 'Does it answer "what’s in it for me?" for the exact person you’re speaking to?' },
        { k: 'T · Take Action',            d: 'Is there one clear, timely thing to do next?' },
      ],
    },
    example: {
      label: 'How the coach uses HEART',
      lines: [
        ['Spine', 'HEART is the spine of every assessment.'],
        ['Silent check', 'When you submit a draft, the coach checks each letter quietly.'],
        ['Surfaces gaps', 'It surfaces the one or two weakest letters as quick wins.'],
        ['No report card', 'It coaches the gap. It never reads out a grade.'],
      ],
    },
    coach: [
      'Point me to the human in your story. Who is it?',
      'What’s the first thing the reader feels? If the answer is a statistic, we have work to do.',
      'Show me the before and the after.',
      'Would this person say "this is for me"? Why?',
      'What’s the one action, and can they do it today?',
    ],
    trap: 'Leading with information (the need, the numbers, the mission) before earning any emotion. Emotion first, facts second.',
    chips: [
      { label: 'What does each letter mean?', view: 'steps' },
      { label: 'How does the coach use HEART?', view: 'example' },
      { label: 'Check my story against HEART', view: 'assess' },
    ],
  },
  {
    id: 'feel-good-loop',
    n: 'C',
    name: 'Feel-Good Loop',
    tagline: 'Why they come back',
    promise: 'One story gets one action. A loop gets a lifelong supporter.',
    steps: {
      title: 'The loop: Story → Feel Good → Action → Reward → Stickiness → (repeat)',
      items: [
        { k: 'Story',      d: 'triggers emotion.' },
        { k: 'Feel Good',  d: 'the instant emotional reward of helping. A warm glow, a dopamine hit.' },
        { k: 'Action',     d: 'the thing they do: share, sign up, donate.' },
        { k: 'Reward',     d: 'reinforces it. This is where recognition lives.' },
        { k: 'Stickiness', d: 'the reward pulling them back, again and again. Each loop deepens the bond.' },
      ],
    },
    example: {
      label: 'Two kinds of gratification to design for',
      lines: [
        ['Instant', 'public recognition at the moment of giving, a thank-you, a visible thermometer. Feels good now.'],
        ['Delayed', 'the update weeks later. The photo of the child who learned to read because of them. This is what makes someone stay.'],
        ['From the class', 'a donor received a photo of a child learning English thanks to their gift. That single delayed reward did more for retention than any ask.'],
      ],
    },
    coach: [
      'After they act, what do they get back, in the next five minutes?',
      'And what do they get back in three weeks? If nothing, they won’t return.',
      'How would this person know their action mattered?',
    ],
    trap: 'Designing the ask and forgetting the reward. No reward, no loop, no second gift. Feel-good is the engine of retention, not a nice-to-have.',
    chips: [
      { label: 'Walk me through the loop', view: 'steps' },
      { label: 'Instant vs delayed reward?', view: 'example' },
      { label: 'Design a loop for my cause', view: 'assess' },
    ],
  },
  {
    id: 'cta',
    n: 'D',
    name: 'CTA design',
    tagline: 'The next step',
    promise: 'A story with no clear next step is a feeling that evaporates. Design the action as carefully as the story.',
    steps: {
      title: 'Three rules of CTA design',
      items: [
        { k: 'One primary action', d: 'made obvious. Don’t bury it. Don’t offer ten.' },
        { k: 'Match to readiness', d: 'not everyone is ready to donate. Offer a ladder from share → sign up → give.' },
        { k: 'Make it timely',     d: 'tie back to the 36-hour rule. The action must be available while the emotion is still warm.' },
      ],
    },
    example: {
      label: 'Worked example · fundraising (a CTA ladder)',
      lines: [
        ['Primary', '"Give $30, that funds one week of meals."'],
        ['Secondary', '"Not today? Share Aisha’s story with one person who might."'],
        ['Tertiary', '"Want to see where it goes? Join the monthly update."'],
      ],
    },
    coach: [
      'What’s the single most important action? Say just one.',
      'What do you offer the person who cares but can’t give money right now?',
      'Can they do it in the next 36 hours, while they still feel it?',
    ],
    trap: 'A vague or missing CTA ("support us", "learn more"), or piling on so many options that the reader chooses none.',
    chips: [
      { label: 'How do I write one CTA?', view: 'steps' },
      { label: 'What’s a CTA ladder?', view: 'example' },
      { label: 'Fix my call to action', view: 'assess' },
    ],
  },
  {
    id: 'where-to-start',
    n: 'E',
    name: 'Where to Start',
    tagline: 'The sequence',
    promise: 'Volunteers freeze because they try to write and think at once. Separate the two. Here is the order.',
    steps: {
      title: 'The starting sequence',
      items: [
        { k: '1 · Pick the goal',    d: 'recruitment, fundraising, or awareness? The goal shapes everything downstream.' },
        { k: '2 · Run the Story Map', d: 'get Who / Why / Tension / Change / Action clear.' },
        { k: '3 · Find your one human', d: 'one beneficiary, one donor, one volunteer. Deep and singular beats broad and shallow.' },
        { k: '4 · Draft rough',       d: 'write it badly first. Emotion before information.' },
        { k: '5 · Check against HEART', d: 'fix the weakest letter.' },
        { k: '6 · Design loop + CTA',  d: 'reward and next step.' },
        { k: '7 · Test on a real person', d: 'watch their face. Refine. Repeat.' },
      ],
    },
    example: {
      label: 'Why the sequence works',
      lines: [
        ['Thinking, then writing', 'steps 1–3 are thinking. Step 4 is writing. Don’t do both at once.'],
        ['One deep story wins', 'in the class A/B test, one deep story about a single person beat several shallow ones.'],
        ['Testing is built in', 'the last step is always: show one real person, watch, refine.'],
      ],
    },
    coach: [
      'Before anything: which goal? Recruits, funds, or awareness?',
      'Have you run the Story Map yet, or are you trying to write cold?',
      'Who is your one person? If you named a group, narrow it to one.',
    ],
    trap: 'Skipping straight to writing the post without picking the goal or the person. That’s where most stories die.',
    chips: [
      { label: 'Give me the sequence', view: 'steps' },
      { label: 'I have no idea where to begin', view: 'coach' },
      { label: 'Start my story now', view: 'assess' },
    ],
  },
];

/* ── Goals for Improve-my-story mode (KB §2) ─────────────────── */
const MC_GOALS = [
  {
    id: 'recruitment',
    label: 'Volunteer recruitment',
    blurb: 'Get the right people to show up and stay.',
    wiifm: 'belonging, purpose, identity — "people like me do this".',
  },
  {
    id: 'fundraising',
    label: 'Fundraising / donations',
    blurb: 'Turn a feeling into a gift, then a second gift.',
    wiifm: 'the feeling of doing good, and seeing a concrete result.',
  },
  {
    id: 'awareness',
    label: 'Awareness',
    blurb: 'Make an issue matter enough to pass on.',
    wiifm: 'a story worth sharing, feeling informed, belonging to people who care.',
  },
];

/* ── Quick reference one-pager (KB §5) ───────────────────────── */
const MC_QUICK_REF = [
  ['Story Map', 'Who → Why → Tension → Change → Action.'],
  ['HEART', 'Human first. Emotion before information. Arc of change. Relevant. Take action.'],
  ['Feel-Good Loop', 'Story → Feel Good → Action → Reward → Stickiness (repeat).'],
  ['CTA design', 'One clear action, matched to readiness, available within 36 hours.'],
  ['Where to Start', 'goal → Story Map → one human → rough draft → HEART check → loop and CTA → test.'],
];

const MC_NORTH_STAR = 'People don’t buy charities. They buy hope, belonging, identity, and the feeling of doing good.';

/* endpoint for the assessment proxy (Vercel serverless function) */
const MC_COACH_ENDPOINT = '/api/coach';

Object.assign(window, {
  MC_SIGNATURE_LINES, MC_FRAMEWORKS, MC_GOALS,
  MC_QUICK_REF, MC_NORTH_STAR, MC_COACH_ENDPOINT,
});
