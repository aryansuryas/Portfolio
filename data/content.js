// ============================================================================
// SINGLE SOURCE OF TRUTH — all copy and data for the portfolio.
// Icons reference keys in components/Icons.jsx (inline SVG — no icon fonts).
// ============================================================================

export const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'journey', label: 'About' },
  { id: 'work', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' }
];

export const HERO_ROLES = ['Full-Stack Developer', 'AI Builder', 'Frontend Engineer', 'DSA Practitioner'];

export const HERO_STATS = [
  { value: 3, suffix: '+', label: 'Years coding' },
  { value: 10, suffix: '+', label: 'Projects built' },
  { value: 228, suffix: '', label: 'DSA concepts mapped' }
];

export const MARQUEE_TEXT =
  'ARYAN SURYA S  ·  CSE STUDENT  ·  FULL-STACK DEVELOPER  ·  AI BUILDER  ·  CONTENT CREATOR  ·  COMPETITIVE PROGRAMMER  ·  ';

export const STATEMENT =
  'I build software the way editors cut film — every interaction deliberate, every system built to scale, nothing shipped that I would not sign my name under.';

export const FIGURES = [
  {
    tag: 'FIG. A',
    title: 'Relentless builder',
    desc: 'Ship fast, iterate faster — every line of code is a step toward something real.'
  },
  {
    tag: 'FIG. B',
    title: 'Systems thinker',
    desc: 'Architecture before aesthetics. Scalable foundations matter more than a quick fix.'
  },
  {
    tag: 'FIG. C',
    title: 'Always learning',
    desc: 'DSA, AI, and whatever comes next — the roadmap keeps extending.'
  }
];

export const SKILLS = [
  { icon: 'layout', label: 'Frontend', desc: 'React, Tailwind CSS, HTML5/CSS3, GSAP' },
  { icon: 'server', label: 'Backend', desc: 'Node.js, Firebase, REST APIs, Express' },
  { icon: 'code', label: 'Languages', desc: 'C++, JavaScript, Apex (Salesforce)' },
  { icon: 'sparks', label: 'AI & LLMs', desc: 'Claude API, OpenAI API, LangChain, prompt engineering' },
  { icon: 'cloud', label: 'Platforms', desc: 'Salesforce Trailhead, Vercel, GitHub, Cursor IDE' },
  { icon: 'wrench', label: 'Dev tools', desc: 'Git, VS Code, Vite, Figma, Lovable' }
];

export const JOURNEY_COL_1 = [
  {
    period: '2024 – PRESENT',
    role: 'Full-stack developer',
    roleDetail: '(personal projects)',
    org: 'Self-directed / open source',
    desc: 'Building CodeSense, an AI code review tool, using React, Firebase and the Claude API — exploring agentic AI workflows and full-stack product development.'
  },
  {
    period: '2023 – PRESENT',
    role: 'Content creator',
    roleDetail: null,
    org: 'CassGX — YouTube / Instagram',
    desc: 'Gaming and tech short-form content — AI-generated video production, branding, and audience growth.'
  }
];

export const JOURNEY_COL_2 = [
  {
    period: '2022 – PRESENT',
    role: 'B.E. Computer Science Engineering',
    roleDetail: null,
    org: 'Dayananda Sagar University, Bengaluru',
    desc: 'Focus on DSA in C++, full-stack web development, Salesforce, and competitive programming.'
  },
  {
    period: '2024',
    role: 'Salesforce Developer path',
    roleDetail: null,
    org: 'Trailhead, Salesforce',
    desc: 'Apex, LWC, admin fundamentals, and platform architecture.'
  }
];

export const PROJECTS = [
  {
    id: 'codesense',
    number: '01',
    era: '2024 · AI TOOL',
    title: 'CodeSense',
    desc: 'An AI-powered code review assistant. Paste in code, get structured feedback on quality, bugs, and improvements — powered by Claude.',
    tags: ['React', 'Firebase', 'Claude API', 'Tailwind CSS'],
    cta: 'View project',
    href: '#',
    art: 'codesense',
    flip: false
  },
  {
    id: 'cassgx',
    number: '02',
    era: '2024 · BRAND',
    title: 'CassGX Brand',
    desc: 'Built a full gaming and tech content brand from scratch — logo, channel identity, AI-generated shorts, and a viral clip strategy.',
    tags: ['Branding', 'AI video', 'Short-form', 'YouTube'],
    cta: 'View channel',
    href: 'https://youtube.com/@TheCassGX',
    art: 'cassgx',
    flip: true
  },
  {
    id: 'battleplan',
    number: '03',
    era: '2024 · OPEN SOURCE',
    title: 'CS Battle Plan',
    desc: 'A comprehensive 228-concept DSA roadmap and full CS fundamentals study system — 15 phases, competitive programming prep, shared on GitHub.',
    tags: ['C++', 'DSA', '9-week curriculum', 'Open source'],
    cta: 'View on GitHub',
    href: 'https://github.com/aryansuryas',
    art: 'battleplan',
    flip: false
  }
];

export const ACHIEVEMENTS = [
  { icon: 'cloud', title: 'Salesforce Trailhead', sub: 'Active Developer path', year: '2024' },
  { icon: 'rocket', title: 'CodeSense shipped', sub: 'Built and deployed using AI-first tooling', year: '2024' },
  { icon: 'trophy', title: 'Competitive programmer', sub: 'C++ · DSA · LeetCode', year: '2023 – Present' }
];

export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/aryansuryas', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/aryansuryas', icon: 'linkedin' },
  { label: 'Instagram', href: 'https://instagram.com/aryansuryasgowda', icon: 'instagram' },
  { label: 'YouTube', href: 'https://youtube.com/@TheCassGX', icon: 'youtube' },
  { label: 'Bluesky', href: 'https://bsky.app/profile/aryansuryas', icon: 'bluesky' }
];

export const CONTACT = {
  // Email is intentionally split so scrapers never see the full address in
  // source or markup — Contact.jsx assembles it at runtime.
  emailUser: 'aryansurya752006',
  emailDomain: 'gmail.com',
  location: 'Bengaluru, India',
  availability: 'Open to internships and collaborations',
  // Get a free key at https://web3forms.com and paste it here:
  web3formsKey: 'YOUR_WEB3FORMS_ACCESS_KEY'
};
