/* ═══════════════════════════════════════════════════════════════════════════
   ICHIRO OKOCHI — PORTFOLIO SCRIPT  v2.0
   ───────────────────────────────────────────────────────────────────────────
   1.  AI_CONFIG          — toggle local / HuggingFace modes here
   2.  KNOWLEDGE_BASE     — all portfolio content for local AI
   3.  Custom Cursor
   4.  Hero Canvas        — particle constellation
   5.  Navbar             — scroll + mobile hamburger + active section
   6.  Scroll Reveal      — IntersectionObserver animations
   7.  Contact Form
   8.  AI Assistant       — full engine: detectIntent, navigate, HF fallback
   ═══════════════════════════════════════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — AI CONFIGURATION
   ─────────────────────────────────────────────────────────────
   To enable real LLM responses:
     1. Set mode to "huggingface"
     2. Paste your HuggingFace API key in huggingFaceApiKey
     3. Choose a model (suggestions below)
     4. Optionally customise SYSTEM_PROMPT below
   ═══════════════════════════════════════════════════════════════ */
const AI_CONFIG = {
  // "local" = built-in knowledge base only (always works, no API key needed)
  // "huggingface" = call HuggingFace Inference API for richer responses
  mode: 'local',

  // ── HuggingFace settings ─────────────────────────────────────
  // Keep frontend tokens empty on public deployments. Use a server-side proxy if you re-enable hosted AI.
  huggingFaceApiKey: '',

  // Conversational models work best through the chat-completions router. (Choose model by commenting)
  model: 'HuggingFaceH4/zephyr-7b-beta',
  provider: 'featherless-ai',
  endpointType: 'chat-completions',

  // Max tokens for HF response
  maxTokens: 300,
  temperature: 0.7,
};

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — KNOWLEDGE BASE
   Everything the local AI knows about Ichiro.
   Edit this object to keep the portfolio up-to-date.
   ═══════════════════════════════════════════════════════════════ */
const KNOWLEDGE_BASE_PLACEHOLDER = {

  name:     'Ichiro Okochi',
  pronouns: 'he/him',
  headline: 'Computer Engineering Student · AI · Systems Engineering · Avionics',
  location: 'West Lafayette, IN (Purdue University)',
  email:    'okochi@purdue.edu',
  github:   'github.com/iokochi',
  linkedin: 'linkedin.com/in/ichiro-okochi',
  status:   'Actively looking for internship and research opportunities',

  /* ── About ── */
  about: {
    summary: `Ichiro is a Computer Engineering student at Purdue University with a GPA of 3.7,
      focused on the intersection of AI, embedded systems, and aerospace engineering.
      He builds things that are both rigorous and elegant — from rocket avionics to real-time
      machine learning pipelines.`,
    currentWork: 'AI-powered multilingual translation pipeline and rocket avionics systems',
    interests:   'machine learning, embedded systems, aerospace, computer vision, open-source',
    mission:     'Build technology that is useful, beautiful, and works reliably under pressure',
    keywords:    ['about', 'who', 'ichiro', 'bio', 'background', 'story', 'person'],
    section:     'about',
  },

  /* ── Education ── */
  education: {
    school:   'Purdue University',
    degree:   'Bachelor of Science - BS, Computer Engineering',
    gpa:      '3.68',
    years:    'Aug 2025 - May 2029',
    honors:   'Purdue Space Program, Purdue Student Union Board, and Taekwondo',
    courses:  'Computer Engineering curriculum at Purdue University',
    keywords: ['study', 'major', 'degree', 'school', 'university', 'purdue', 'gpa', 'education', 'course', 'class'],
    section:  'experience',
  },

  /* ── Projects ── */
  projects: [
    {
      title:    'AI Translator App',
      short:    'Real-time multilingual translation using OpenAI Whisper and custom transformer fine-tuning.',
      full:     `An end-to-end multilingual translation pipeline that fine-tunes OpenAI Whisper for
        low-latency speech recognition, then passes transcriptions through a custom transformer
        for translation. Supports 12 language pairs and runs via a FastAPI backend.`,
      stack:    ['Python', 'PyTorch', 'Whisper', 'FastAPI'],
      keywords: ['translate', 'translation', 'whisper', 'language', 'speech', 'nlp', 'transformer', 'ai translator'],
      type:     'ai',
    },
    {
      title:    'Rocket Avionics Enclosure',
      short:    'Flight-ready avionics bay for high-power rocketry with custom PCB and autonomous recovery.',
      full:     `A complete avionics system for high-powered rockets: custom PCB layout in KiCad,
        sensor-fusion IMU for orientation tracking, real-time telemetry over RF, and automatic
        dual-deployment recovery. Modelled and toleranced in Siemens NX.`,
      stack:    ['C++', 'Siemens NX', 'OpenRocket', 'KiCad'],
      keywords: ['rocket', 'avionics', 'aerospace', 'pcb', 'hardware', 'embedded', 'flight', 'space', 'imu', 'telemetry'],
      type:     'hardware',
    },
    {
      title:    'Computer Vision System',
      short:    'Real-time YOLOv8 object detection achieving 60fps on embedded GPU via TensorRT.',
      full:     `Custom-trained YOLOv8 pipeline optimised for edge deployment. Uses TensorRT for
        quantised inference, hitting 60fps on an embedded NVIDIA GPU. Includes an OpenCV-based
        streaming frontend and a REST API for integration.`,
      stack:    ['Python', 'YOLOv8', 'OpenCV', 'TensorRT'],
      keywords: ['vision', 'computer vision', 'yolo', 'detection', 'object', 'camera', 'cv', 'image'],
      type:     'ai',
    },
    {
      title:    'Soccer Scorekeeper App',
      short:    'Progressive web app for live soccer match tracking with real-time sync and offline support.',
      full:     `A full-stack PWA that syncs match scores live over WebSockets, tracks player statistics,
        generates tournament brackets, and works offline via IndexedDB caching.`,
      stack:    ['JavaScript', 'Node.js', 'WebSockets', 'IndexedDB'],
      keywords: ['soccer', 'scorekeeper', 'score', 'web app', 'pwa', 'sports', 'javascript', 'node'],
      type:     'web',
    },
  ],

  /* ── Skills ── */
  skills: {
    programming:  { items: ['Python', 'JavaScript', 'C++', 'MATLAB', 'Rust'], level: 'strong' },
    ai:           { items: ['PyTorch', 'Transformers', 'OpenAI Whisper', 'YOLOv8', 'TensorRT'], level: 'strong' },
    engineering:  { items: ['Siemens NX', 'OpenRocket', 'KiCad', 'Embedded C', 'FPGA/VHDL'], level: 'solid' },
    tools:        { items: ['Git', 'Docker', 'Linux', 'FastAPI', 'AWS'], level: 'solid' },
    keywords:     ['skill', 'know', 'language', 'tech', 'stack', 'tools', 'experience with', 'familiar', 'proficient', 'use'],
    section:      'skills',
  },

  /* ── Experience ── */
  experience: [
    {
      org:     'EPICS at Purdue',
      role:    'Design Lead',
      years:   'Jan 2026 - Present',
      desc:    'Architected an early backend for a multi-model AI pipeline, integrated STT/T2T/TTS components, and improved parallel processing and latency.',
    },
    {
      org:     'Indian Institute of Technology, Delhi',
      role:    'Project Liaison',
      years:   'Aug 2025 - Dec 2025',
      desc:    'Coordinated Purdue and IIT Delhi collaboration, organized meetings, and supported requirements, design research, and partner communication for a low-cost seed decorticator.',
    },
    {
      org:     'Purdue Student Union Board (PSUB)',
      role:    'General Member',
      years:   'Feb 2026 - Present',
      desc:    'Supports planning, logistics, outreach, and execution for large-scale campus events that increase student engagement.',
    },
    {
      org:     'Purdue Space Program: A SEDS Chapter',
      role:    'Avionics Team Member',
      years:   'Feb 2026 - Present',
      desc:    'Current team member in Purdue Space Program avionics.',
    },
  ],

  /* ── Blog ── */
  blog: {
    posts: [
      'How I Built a Real-Time Multilingual Translator with Whisper',
      'Designing Avionics for a 30,000ft Rocket',
      'YOLOv8 on the Edge: 60fps Object Detection on Embedded Hardware',
    ],
    keywords: ['blog', 'writing', 'article', 'post', 'read', 'write', 'publish'],
    section:  'blog',
  },

  /* ── Contact ── */
  contact: {
    email:    'okochi@purdue.edu',
    github:   'github.com/iokochi',
    linkedin: 'linkedin.com/in/ichiro-okochi',
    keywords: ['contact', 'reach', 'email', 'hire', 'connect', 'linkedin', 'github', 'message', 'touch', 'talk'],
    section:  'contact',
  },

  /* ── Goals / career ── */
  goals: {
    summary: `Ichiro is interested in roles at the intersection of AI systems and hardware —
      think robotics, aerospace autonomy, edge ML, or AI infrastructure. He's also open to
      research internships in machine learning and embedded systems.`,
    keywords: ['goal', 'career', 'job', 'intern', 'internship', 'future', 'want', 'looking', 'opportunity', 'hire'],
    section:  null,
  },
};

const KNOWLEDGE_BASE = {

  name:     'Ichiro Okochi',
  pronouns: 'he/him',
  headline: 'Computer Engineering Student @Purdue in Indianapolis · AI, embedded hardware, student leadership',
  location: 'Indianapolis, IN',
  email:    'iokochi@purdue.edu',
  github:   'github.com/IchiroOkochi',
  linkedin: 'linkedin.com/in/okochi',
  status:   'open to internships, research, and project collaborations',

  about: {
    summary: `Ichiro is a Computer Engineering student at Purdue University in Indianapolis (class of 2029).
      He likes projects where code has to deal with the real world: noisy audio in under-served languages,
      hands in front of a webcam, and boards that have to fit in a case he printed himself. Outside class he
      helps run Amplify Purdue, the Sustainable Energy Club at Indy, the Japanese Student Association, and
      the Purdue Student Union Board.`,
    currentWork: `HandForge (a webcam hand-gesture controller for Onshape) and club leadership as Treasurer of
      Amplify Purdue, External Affairs Manager of the Sustainable Energy Club, and Secretary of the Japanese Student Association`,
    interests:   'AI and speech, computer vision, embedded hardware, developer tools, entrepreneurship, clean energy',
    mission:     'Build things that work outside the lab, and help the people around him build theirs.',
    keywords:    ['about', 'who', 'ichiro', 'bio', 'background', 'story', 'person'],
    section:     'about',
  },

  education: {
    school:   'Purdue University (Indianapolis)',
    degree:   'Bachelor of Science, Computer Engineering',
    gpa:      '3.68',
    years:    'Aug 2025 - May 2029',
    honors:   'involvement in the ECE Student Society, Amplify Purdue, the Sustainable Energy Club, the Japanese Student Association, and PSUB',
    courses:  'computer engineering fundamentals, C programming (CS 159), algorithms, and electromagnetics',
    keywords: ['study', 'major', 'degree', 'school', 'university', 'purdue', 'gpa', 'education', 'course', 'class'],
    section:  'about',
  },

  projects: [
    {
      title:    'Vaani Connect',
      short:    'A text and speech translation app for 23 languages, built with EPICS at Purdue and KL University.',
      full:     `Vaani Connect translates text and speech across 23 languages, focused on Indian languages that
        mainstream apps handle poorly. As EPICS Design Lead, Ichiro led full-stack development: an Expo React Native
        app talking to a FastAPI and PyTorch backend. He integrated IndicTrans2, Whisper Large V3 Turbo, IndicWav2Vec
        and gTTS with fallback handling, health checks and runtime metrics, and grew the benchmark to 230 multilingual
        test cases with latency and success-rate charts.`,
      stack:    ['Python', 'PyTorch', 'FastAPI', 'Expo React Native', 'Whisper', 'IndicTrans2', 'IndicWav2Vec', 'gTTS'],
      keywords: ['vaani', 'vaani connect', 'translate', 'translation', 'speech', 'language', 'whisper', 'indictrans', 'fastapi', 'expo', 'multilingual'],
      type:     'ai',
    },
    {
      title:    'HandForge',
      short:    'Control Onshape or any browser 3D viewer with hand gestures through a normal webcam.',
      full:     `HandForge tracks hand landmarks with MediaPipe and maps gestures to viewport controls: index finger to move,
        index pinch to zoom, open hand to rotate, middle pinch to pan, ring pinch to fit the view, and a closed palm as idle.
        It needs no special hardware, just a webcam.`,
      stack:    ['Python', 'MediaPipe', 'pynput', 'Onshape'],
      keywords: ['handforge', 'hand', 'gesture', 'webcam', 'mediapipe', 'onshape', 'cad', 'computer vision', 'air mouse'],
      type:     'ai',
    },
    {
      title:    'Payload enclosure',
      short:    'A Siemens NX case for a Raspberry Pi Pico and LoRa radio, made for the Purdue Space Program payload pod.',
      full:     `Ichiro designed a custom enclosure for a Raspberry Pi Pico and a 900 MHz LoRa module for the Purdue Space Program
        payload pod. He measured the boards by hand, worked out tolerances from their specs, modeled the housing in Siemens NX,
        and 3D printed it in PLA.`,
      stack:    ['Siemens NX', 'Raspberry Pi Pico', 'LoRa', '3D Printing'],
      keywords: ['embedded', 'enclosure', 'raspberry pi pico', 'lora', '3d printing', 'siemens nx', 'hardware', 'payload', 'case'],
      type:     'hardware',
    },
    {
      title:    'Vocareum C Formatter',
      short:    'A VS Code extension that formats C assignments for the Vocareum grader used in CS 159.',
      full:     `A VS Code formatter for C files: it replaces tabs with two spaces everywhere except inside string and character
        literals (so program output never changes), collapses repeated blank lines, and sets two-space indentation for C and headers.`,
      stack:    ['TypeScript', 'VS Code API'],
      keywords: ['vocareum', 'formatter', 'vs code', 'vscode', 'extension', 'cs 159', 'cs159'],
      type:     'software',
    },
    {
      title:    'donut.c, reshaped',
      short:    "Andy Sloane's spinning ASCII donut, with the C source rearranged into a donut shape.",
      full:     `A tribute remix of Andy Sloane's classic donut.c: the spinning ASCII torus, with the source code itself arranged
        into the shape of a donut. The portfolio runs a live version of the animation in the browser.`,
      stack:    ['C', 'JavaScript'],
      keywords: ['donut', 'ascii', 'code art', 'donut.c'],
      type:     'software',
    },
  ],

  skills: {
    programming:  { items: ['Python', 'C', 'TypeScript', 'JavaScript'], level: 'strong' },
    ai:           { items: ['PyTorch', 'FastAPI', 'Whisper', 'IndicTrans2', 'Hugging Face', 'MediaPipe'], level: 'solid' },
    engineering:  { items: ['Soldering', 'Siemens NX', 'PCB design', 'Raspberry Pi Pico', 'LoRa', '3D printing'], level: 'strong' },
    tools:        { items: ['Expo React Native', 'VS Code extensions', 'Git and GitHub', 'PowerShell', 'WSL', 'budgeting and grant writing'], level: 'solid' },
    keywords:     ['skill', 'know', 'language', 'tech', 'stack', 'tools', 'experience with', 'familiar', 'proficient', 'use'],
    section:      'skills',
  },

  experience: [
    {
      org:   'Amplify Purdue',
      role:  'Treasurer',
      years: 'Sep 2026 - Present',
      desc:  'Runs finances for a student entrepreneurship club: grant applications for 2027 case competitions and a campus pitch competition, event budgets, and reimbursement tracking that follows Purdue BOSO rules.',
    },
    {
      org:   'Sustainable Energy Club at Indy',
      role:  'External Affairs Manager',
      years: 'Sep 2026 - Present',
      desc:  'Building a coalition of clean-energy student groups across Indiana and shaping a possible student-led clean energy design challenge.',
    },
    {
      org:   'Japanese Student Association, Purdue University in Indianapolis',
      role:  'Secretary',
      years: 'Sep 2026 - Present',
      desc:  'Keeps board minutes and action items, helps run cultural events, and works with Japanese student groups at other universities.',
    },
    {
      org:   'Purdue Student Union Board (PSUB)',
      role:  'General Member',
      years: 'Feb 2026 - Present',
      desc:  'Plans and runs large campus events and pitches new event ideas.',
    },
    {
      org:   'Purdue ECE Student Society',
      role:  'Member',
      years: 'Mar 2026 - Present',
      desc:  'Member of the Electrical and Computer Engineering Student Society in Indianapolis.',
    },
    {
      org:   'Purdue Space Program: A SEDS Chapter',
      role:  'Avionics Team Member, Payload Pod',
      years: 'Feb 2026 - Oct 2026',
      desc:  'Worked on payload pod electronics, from soldering to the printed LoRa enclosure.',
    },
    {
      org:   'EPICS at Purdue',
      role:  'Design Lead',
      years: 'Jan 2026 - May 2026',
      desc:  'Led full-stack development of Vaani Connect across 23 languages with a FastAPI and PyTorch backend and a 230-case benchmark.',
    },
    {
      org:   'Indian Institute of Technology, Delhi',
      role:  'Project Liaison',
      years: 'Aug 2025 - Dec 2025',
      desc:  'Coordinated Purdue and IIT Delhi teams on a low-cost Bhilawa seed decorticator for rural communities.',
    },
  ],

  blog: {
    posts: [],
    summary: "There's no writing section right now. The best way to see Ichiro's work is the Work section or his GitHub.",
    keywords: ['blog', 'writing', 'article', 'post', 'read', 'write', 'publish'],
    section:  'projects',
  },

  contact: {
    email:    'iokochi@purdue.edu',
    github:   'github.com/IchiroOkochi',
    linkedin: 'linkedin.com/in/okochi',
    keywords: ['contact', 'reach', 'email', 'hire', 'connect', 'linkedin', 'github', 'message', 'touch', 'talk'],
    section:  'contact',
  },

  goals: {
    summary: `Ichiro is looking for internships and research where software meets hardware or real users:
      speech and language AI, computer vision, embedded systems, and developer tools. He also enjoys
      the organizing side, from club finances to cross-campus partnerships.`,
    keywords: ['goal', 'career', 'job', 'intern', 'internship', 'future', 'want', 'looking', 'opportunity', 'hire'],
    section:  null,
  },
};

/* ═══════════════════════════════════════════════════════════════
   SYSTEM PROMPT for HuggingFace mode
   Personalise this text for richer LLM responses.
   ═══════════════════════════════════════════════════════════════ */
function buildSystemPrompt() {
  return `You are Ichibot, a portfolio assistant for ${KNOWLEDGE_BASE.name}.
Speak in a concise, professional, and friendly tone. Answer only about Ichiro's portfolio.
Key facts:
- ${KNOWLEDGE_BASE.headline}
- Location: ${KNOWLEDGE_BASE.location}
- Email: ${KNOWLEDGE_BASE.email}
- Projects: ${KNOWLEDGE_BASE.projects.map(p => p.title).join(', ')}
- Skills: ${Object.values(KNOWLEDGE_BASE.skills).filter(v => v.items).flatMap(v => v.items).join(', ')}
- Currently: ${KNOWLEDGE_BASE.about.currentWork}
If contact details differ across sections, mention the values shown on the site instead of guessing.
Keep responses under 80 words. Do not make up information not listed above.`;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[ch]));
}

function getConfiguredHFModel() {
  const model = String(AI_CONFIG.model || '').trim();
  const provider = String(AI_CONFIG.provider || '').trim();

  if (!model) return '';
  if (!provider || model.includes(':')) return model;
  return `${model}:${provider}`;
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — CONTACT FORM (posts to /api/contact, falls back to mailto)
   ═══════════════════════════════════════════════════════════════ */
(function initContactApiForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formSuccess');
  const btn = form?.querySelector('.form-submit');
  const fallbackRecipient = 'iokochi@purdue.edu';
  const idleLabel = btn ? btn.textContent : 'Send message';

  if (!form || !btn) return;

  const setMessage = (text, isError = false) => {
    if (!status) return;
    status.textContent = text;
    status.classList.toggle('is-error', isError);
  };

  const openEmailFallback = payload => {
    const subject = `Portfolio message from ${payload.name}`;
    const body = [`Name: ${payload.name}`, `Email: ${payload.email}`, '', payload.message].join('\n');
    window.location.href = `mailto:${fallbackRecipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    };

    const missing = [];
    if (!payload.name) missing.push('your name');
    if (!payload.email) missing.push('your email');
    if (!payload.message) missing.push('a message');
    if (missing.length) {
      const list = missing.length > 1 ? `${missing.slice(0, -1).join(', ')} and ${missing[missing.length - 1]}` : missing[0];
      setMessage(`Add ${list} before sending.`, true);
      return;
    }
    if (!form.femail.checkValidity()) {
      setMessage('That email address looks incomplete. Check it and try again.', true);
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending…';
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let data = null;
      try { data = await response.json(); } catch (_) { data = null; }

      if (!response.ok) throw new Error(data?.error || 'Unable to send message right now.');

      form.reset();
      setMessage(data?.message || "Message sent. I'll reply to the email you gave.");
    } catch (error) {
      openEmailFallback(payload);
      setMessage('The form could not send, so your email app opened with the message filled in.');
    } finally {
      btn.disabled = false;
      btn.textContent = idleLabel;
    }
  });
})();

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — TOP BAR (border on scroll, mobile menu, active link)
   ═══════════════════════════════════════════════════════════════ */
(function initNavbar() {
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('navLinks');
  const links      = navLinks ? navLinks.querySelectorAll('.nav-link') : [];
  const sections   = document.querySelectorAll('main section[id]');

  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (hamburger && navLinks) {
    const setOpen = open => {
      navLinks.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      hamburger.textContent = open ? 'Close' : 'Menu';
    };
    hamburger.addEventListener('click', () => setOpen(!navLinks.classList.contains('open')));
    links.forEach(l => l.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  }

  function setActive() {
    const pos = window.scrollY + 140;
    let current = null;
    sections.forEach(s => { if (pos >= s.offsetTop) current = s.id; });
    links.forEach(l => {
      const on = l.getAttribute('href') === `#${current}`;
      l.classList.toggle('active', on);
      if (on) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();

/* ═══════════════════════════════════════════════════════════════
   SECTION 5 — CIRCUIT HERO
   Generates PCB-style traces (45° routing, pads, vias). A faint copy
   sits underneath; a copper copy is revealed by a radial mask that
   follows the cursor. On touch screens the probe wanders on its own
   and jumps to wherever you tap.
   ═══════════════════════════════════════════════════════════════ */
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

(function initCircuit() {
  const hero = document.getElementById('home');
  const base = document.getElementById('tracesBase');
  const lit  = document.getElementById('tracesLit');
  if (!hero || !base || !lit) return;

  const W = 1600, H = 900, G = 20, NS = 'http://www.w3.org/2000/svg';
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const STRAIGHT = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  const DIAG = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

  const traces = [];
  for (let i = 0; i < 78; i++) {
    let x = Math.round((rnd() * W) / G) * G;
    let y = Math.round((rnd() * H) / G) * G;
    const pts = [[x, y]];
    let dir = STRAIGHT[Math.floor(rnd() * 4)];
    const segs = 3 + Math.floor(rnd() * 4);
    for (let s = 0; s < segs; s++) {
      const len = (2 + Math.floor(rnd() * 9)) * G;
      x += dir[0] * len; y += dir[1] * len;
      pts.push([x, y]);
      dir = rnd() < 0.45 ? DIAG[Math.floor(rnd() * 4)] : STRAIGHT[Math.floor(rnd() * 4)];
    }
    traces.push(pts);
  }
  // a few IC footprints
  const chips = Array.from({ length: 6 }, () => ({
    x: Math.round((rnd() * (W - 160)) / G) * G + 40,
    y: Math.round((rnd() * (H - 120)) / G) * G + 30,
    w: (4 + Math.floor(rnd() * 4)) * G,
    h: (3 + Math.floor(rnd() * 3)) * G,
  }));

  function el(name, attrs) {
    const n = document.createElementNS(NS, name);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function draw(svg, isLit) {
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const stroke = isLit ? '#E2A86B' : '#F2EEE8';
    const frag = document.createDocumentFragment();
    for (const c of chips) {
      frag.appendChild(el('rect', { x: c.x, y: c.y, width: c.w, height: c.h, rx: 3, fill: isLit ? '#0C0B0A' : 'none', stroke, 'stroke-width': 1.6 }));
      for (let px = c.x + 10; px < c.x + c.w - 4; px += 14) {
        frag.appendChild(el('line', { x1: px, y1: c.y - 8, x2: px, y2: c.y, stroke, 'stroke-width': 2 }));
        frag.appendChild(el('line', { x1: px, y1: c.y + c.h, x2: px, y2: c.y + c.h + 8, stroke, 'stroke-width': 2 }));
      }
    }
    for (const pts of traces) {
      const d = 'M' + pts.map(p => p.join(' ')).join(' L');
      frag.appendChild(el('path', { d, fill: 'none', stroke, 'stroke-width': 2.2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
      const [sx, sy] = pts[0], [ex, ey] = pts[pts.length - 1];
      frag.appendChild(el('circle', { cx: sx, cy: sy, r: 4.5, fill: isLit ? '#000' : 'none', stroke, 'stroke-width': 2 }));
      frag.appendChild(el('rect', { x: ex - 6, y: ey - 6, width: 12, height: 12, rx: 2, fill: isLit ? '#000' : 'none', stroke, 'stroke-width': 2 }));
      if (isLit && !REDUCED_MOTION) {
        const p = el('path', { d, fill: 'none', stroke: '#FFF1DC', 'stroke-width': 3, 'stroke-linecap': 'round', class: 'trace-pulse' });
        p.style.animationDelay = `${(-rnd() * 3.4).toFixed(2)}s`;
        frag.appendChild(p);
      }
    }
    svg.appendChild(frag);
  }
  draw(base, false);
  draw(lit, true);
  base.classList.add('hero-fade');

  // probe position, eased toward the target
  let tx = -999, ty = -999, cx = -999, cy = -999, active = false, lastMove = 0;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect();
    tx = e.clientX - r.left; ty = e.clientY - r.top;
    if (!active) { cx = tx; cy = ty; active = true; }
    lastMove = performance.now();
  });
  hero.addEventListener('pointerleave', () => { if (fine) { active = false; } });

  let raf = 0, visible = true;
  new IntersectionObserver(([en]) => {
    visible = en.isIntersecting;
    if (visible && !raf) raf = requestAnimationFrame(tick);
  }).observe(hero);

  function tick(t) {
    raf = 0;
    if (!visible) return;
    const idle = t - lastMove > 2500;
    if ((!fine || idle) && !REDUCED_MOTION) {
      // wander along a slow Lissajous path when nobody is steering
      const w = hero.clientWidth, h = hero.clientHeight;
      tx = w * (0.5 + 0.38 * Math.sin(t / 3100));
      ty = h * (0.45 + 0.32 * Math.sin(t / 2300 + 1.3));
      if (!active) { cx = tx; cy = ty; active = true; }
    }
    if (active) {
      cx += (tx - cx) * 0.14; cy += (ty - cy) * 0.14;
      hero.style.setProperty('--mx', cx.toFixed(1) + 'px');
      hero.style.setProperty('--my', cy.toFixed(1) + 'px');
    } else {
      hero.style.setProperty('--mx', '-999px');
    }
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);
})();

/* Name decodes in from circuit glyphs on load */
(function initScramble() {
  const elName = document.querySelector('[data-scramble]');
  if (!elName || REDUCED_MOTION) return;
  const target = elName.textContent;
  const glyphs = '01<>/#*+=:';
  elName.setAttribute('aria-label', target);
  let f = 0;
  const iv = setInterval(() => {
    elName.textContent = target.split('').map((ch, i) => (i < f / 3 ? ch : glyphs[Math.floor(Math.random() * glyphs.length)])).join('');
    if (++f > target.length * 3) { clearInterval(iv); elName.textContent = target; }
  }, 38);
})();

/* Magnetic buttons: a gentle pull toward the cursor */
(function initMagnetic() {
  if (REDUCED_MOTION || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('.magnetic').forEach(b => {
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
    });
    b.addEventListener('pointerenter', () => { b.style.transition = 'background-color .3s, color .3s, border-color .3s'; });
    b.addEventListener('pointerleave', () => {
      b.style.transition = 'transform .6s cubic-bezier(.2,.8,.2,1), background-color .3s, color .3s, border-color .3s';
      b.style.transform = '';
    });
  });
})();

/* ═══════════════════════════════════════════════════════════════
   SECTION 6 — WORK INDEX (expand on click, preview on hover)
   ═══════════════════════════════════════════════════════════════ */
(function initWork() {
  const items = document.querySelectorAll('.work');
  const peek = document.getElementById('peek');

  items.forEach(item => {
    const btn = item.querySelector('.work-row');
    const panel = item.querySelector('.work-panel');
    if (!btn || !panel) return;
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      if (open) {
        panel.hidden = false;
        requestAnimationFrame(() => panel.classList.add('open'));
        hidePeek();
      } else {
        panel.classList.remove('open');
        const done = () => { if (btn.getAttribute('aria-expanded') === 'false') panel.hidden = true; };
        panel.addEventListener('transitionend', done, { once: true });
        setTimeout(done, 600);
      }
      document.dispatchEvent(new CustomEvent('work:toggle', { detail: { id: panel.id, open } }));
    });
  });

  if (!peek || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  let px = 0, py = 0, qx = 0, qy = 0, raf = 0;
  function hidePeek() { peek.classList.remove('on'); }
  items.forEach(item => {
    const row = item.querySelector('.work-row');
    const tpl = document.getElementById(item.dataset.peek);
    if (!row || !tpl) return;
    row.addEventListener('pointerenter', e => {
      if (row.getAttribute('aria-expanded') === 'true') return;
      peek.replaceChildren(tpl.content.cloneNode(true));
      qx = px = e.clientX; qy = py = e.clientY;
      peek.classList.add('on');
      if (!raf) raf = requestAnimationFrame(follow);
    });
    row.addEventListener('pointerleave', hidePeek);
  });
  addEventListener('pointermove', e => { px = e.clientX; py = e.clientY; }, { passive: true });
  function follow() {
    qx += (px - qx) * 0.15; qy += (py - qy) * 0.15;
    peek.style.left = qx + 'px'; peek.style.top = qy + 'px';
    raf = peek.classList.contains('on') ? requestAnimationFrame(follow) : 0;
  }
})();

/* Live ASCII donut (torus math from Andy Sloane's donut.c), runs only while its panel is open */
(function initDonut() {
  const out = document.getElementById('donut');
  if (!out) return;
  let A = 1, B = 1, running = false, raf = 0, last = 0;
  const chars = '.,-~:;=!*#$@';
  function frame(t) {
    if (!running) { raf = 0; return; }
    if (t - last > 45) {
      last = t;
      const w = 64, h = 30, b = new Array(w * h).fill(' '), z = new Array(w * h).fill(0);
      const cA = Math.cos(A), sA = Math.sin(A), cB = Math.cos(B), sB = Math.sin(B);
      for (let j = 0; j < 6.28; j += 0.07) {
        const ct = Math.cos(j), st = Math.sin(j);
        for (let i = 0; i < 6.28; i += 0.02) {
          const sp = Math.sin(i), cp = Math.cos(i), hh = ct + 2;
          const D = 1 / (sp * hh * sA + st * cA + 5);
          const tt = sp * hh * cA - st * sA;
          const x = 0 | (w / 2 + 30 * D * (cp * hh * cB - tt * sB));
          const y = 0 | (h / 2 + 15 * D * (cp * hh * sB + tt * cB));
          const o = x + w * y;
          const N = 0 | (8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));
          if (y < h && y >= 0 && x >= 0 && x < w && D > z[o]) { z[o] = D; b[o] = chars[N > 0 ? N : 0]; }
        }
      }
      let s = '';
      for (let k = 0; k < h; k++) s += b.slice(k * w, k * w + w).join('') + '\n';
      out.textContent = s;
      A += 0.07; B += 0.03;
    }
    raf = requestAnimationFrame(frame);
  }
  function start() { if (running) return; running = true; if (!raf) raf = requestAnimationFrame(frame); }
  function stop() { running = false; }
  if (REDUCED_MOTION) { running = true; frame(100); running = false; return; }
  document.addEventListener('work:toggle', e => {
    if (e.detail.id === 'w-donut') e.detail.open ? start() : stop();
  });
  document.addEventListener('visibilitychange', () => {
    const open = document.getElementById('w-donut')?.classList.contains('open');
    if (document.hidden) stop(); else if (open) start();
  });
})();

/* Copy email button */
(function initCopy() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied';
      } catch (_) {
        btn.textContent = 'Press Ctrl+C';
        const r = document.createRange(); r.selectNodeContents(btn.previousElementSibling);
        const s = getSelection(); s.removeAllRanges(); s.addRange(r);
      }
      btn.classList.add('done');
      setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('done'); }, 1800);
    });
  });
})();

/* Local time in Indianapolis */
(function initClock() {
  const out = document.getElementById('localTime');
  if (!out) return;
  const fmt = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Indiana/Indianapolis', hour: 'numeric', minute: '2-digit' });
  const tick = () => { out.textContent = fmt.format(new Date()); };
  tick(); setInterval(tick, 30000);
})();

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 8 — AI ASSISTANT ENGINE
   ───────────────────────────────────────────────────────────────────────────
   Public API: toggleChat, addMessage, detectIntent, handleNavigation,
               getLocalResponse, queryHuggingFace, generateAssistantReply
   ═══════════════════════════════════════════════════════════════════════════ */
(function initAIAssistant() {

  /* ── DOM refs ─────────────────────────────────────────────── */
  const fab        = document.getElementById('aiFab');
  const chat       = document.getElementById('aiChat');
  const closeBtn   = document.getElementById('aiClose');
  const clearBtn   = document.getElementById('aiClear');
  const input      = document.getElementById('aiInput');
  const sendBtn    = document.getElementById('aiSend');
  const messagesEl = document.getElementById('aiMessages');
  const suggestBar = document.getElementById('aiSuggestionsBar');
  const statusText = document.getElementById('aiStatusText');
  const poweredBy  = document.getElementById('aiPoweredBy');

  if (!fab || !chat) return;

  /* ── State ────────────────────────────────────────────────── */
  let isOpen          = false;
  let hasGreeted      = false;
  let currentSection  = 'home';
  let isWaitingReply  = false;

  /* ── Mode display ────────────────────────────────────────── */
  const isAIMode = AI_CONFIG.mode === 'huggingface' && Boolean(String(AI_CONFIG.huggingFaceApiKey || '').trim());
  const configuredModel = getConfiguredHFModel();
  const defaultStatusLabel = isAIMode ? 'AI Mode' : 'Local Mode';
  let persistentStatusLabel = defaultStatusLabel;
  if (poweredBy) poweredBy.textContent = isAIMode
    ? `Powered by ${configuredModel}`
    : 'Powered by local knowledge base';
  if (chat) chat.classList.add(isAIMode ? 'mode-ai' : 'mode-local');

  function renderStatus(label) {
    if (statusText) statusText.textContent = label;
  }

  function setPersistentStatus(label) {
    persistentStatusLabel = label;
    renderStatus(label);
  }

  function syncSendButtonState() {
    if (!sendBtn || !input) return;
    sendBtn.classList.toggle('active', !isWaitingReply && input.value.trim().length > 0);
  }

  function setWaitingState(isBusy) {
    if (chat) {
      chat.classList.toggle('is-thinking', isBusy);
      chat.setAttribute('aria-busy', String(isBusy));
    }
    if (messagesEl) messagesEl.setAttribute('aria-busy', String(isBusy));
    if (sendBtn) {
      sendBtn.disabled = isBusy;
      sendBtn.classList.toggle('is-loading', isBusy);
      sendBtn.setAttribute('aria-disabled', String(isBusy));
    }
    if (clearBtn) {
      clearBtn.disabled = isBusy;
      clearBtn.setAttribute('aria-disabled', String(isBusy));
    }
    syncSendButtonState();
    renderStatus(isBusy ? 'Thinking...' : persistentStatusLabel);
  }

  renderStatus(persistentStatusLabel);
  setWaitingState(false);

  /* ─────────────────────────────────────────────────────────────
     toggleChat() — open / close the panel
  ───────────────────────────────────────────────────────────── */
  function toggleChat(forceOpen) {
    isOpen = forceOpen !== undefined ? forceOpen : !isOpen;
    chat.classList.toggle('is-open', isOpen);
    fab.classList.toggle('is-open', isOpen);
    fab.setAttribute('aria-expanded', isOpen);
    chat.setAttribute('aria-hidden', !isOpen);

    if (isOpen) {
      if (!hasGreeted) { sendWelcome(); hasGreeted = true; }
      setTimeout(() => input && input.focus(), 300);
      updateSuggestions();
    }
  }

  /* ─────────────────────────────────────────────────────────────
     addMessage(html, role, opts)
     role: 'assistant' | 'user'
     opts: { nav: 'sectionId' }   — appends a nav confirm pill
  ───────────────────────────────────────────────────────────── */
  function addMessage(html, role = 'assistant', opts = {}) {
    const wrap = document.createElement('div');
    wrap.className = `ai-msg ${role}`;

    const bubble = document.createElement('div');
    bubble.className = 'ai-bubble';
    bubble.innerHTML = html;
    wrap.appendChild(bubble);

    if (opts.nav) {
      const pill = document.createElement('div');
      pill.className = 'ai-nav-confirm';
      const sectionName = opts.nav.charAt(0).toUpperCase() + opts.nav.slice(1);
      pill.textContent = `Scrolling to ${sectionName}`;
      wrap.appendChild(pill);
    }

    const now = new Date();
    const time = document.createElement('div');
    time.className = 'ai-msg-time';
    time.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    wrap.appendChild(time);

    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return wrap;
  }

  /* ─────────────────────────────────────────────────────────────
     showTyping() / hideTyping()
  ───────────────────────────────────────────────────────────── */
  let typingEl = null;
  function showTyping(label = 'Thinking') {
    if (typingEl) return;
    typingEl = document.createElement('div');
    typingEl.className = 'ai-msg assistant ai-typing';
    typingEl.setAttribute('role', 'status');
    typingEl.setAttribute('aria-label', `${label}...`);
    const bubble = document.createElement('div');
    bubble.className = 'ai-bubble';
    bubble.innerHTML = `
      <span class="ai-typing-label">${escapeHTML(label)}</span>
      <span class="ai-typing-dots" aria-hidden="true"><span></span><span></span><span></span></span>
    `;
    typingEl.appendChild(bubble);
    messagesEl.appendChild(typingEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
  function hideTyping() {
    if (typingEl) { typingEl.remove(); typingEl = null; }
  }

  /* ─────────────────────────────────────────────────────────────
     handleNavigation(sectionId) — smooth scroll + close mobile
  ───────────────────────────────────────────────────────────── */
  function handleNavigation(sectionId) {
    if (!sectionId) return;
    const el = document.getElementById(sectionId);
    if (!el) return;
    setTimeout(() => {
      window.scrollTo({ top: sectionId === 'home' ? 0 : el.offsetTop - 72, behavior: 'smooth' });
    }, 600);
  }

  /* ─────────────────────────────────────────────────────────────
     detectIntent(text) — returns { type, payload }
     Types: 'navigate', 'projects', 'skills', 'about',
            'experience', 'contact', 'blog', 'goals',
            'education', 'greeting', 'summarize', 'unknown'
  ───────────────────────────────────────────────────────────── */
  function detectIntent(text) {
    const t = text.toLowerCase().trim();

    /* Navigation commands — highest priority */
    const NAV_PATTERNS = [
      { pattern: /\b(go to|take me to|show me?|open|navigate to|scroll to|jump to)\b.*\b(home|top)\b/i, section: 'home' },
      { pattern: /\b(go to|take me to|show me?|open|navigate to|scroll to|jump to)\b.*\b(about|bio|biography)\b/i, section: 'about' },
      { pattern: /\b(go to|take me to|show me?|open|navigate to|scroll to|jump to)\b.*\b(project|work|portfolio)\b/i, section: 'projects' },
      { pattern: /\b(go to|take me to|show me?|open|navigate to|scroll to|jump to)\b.*\b(skill|tech|stack)\b/i, section: 'skills' },
      { pattern: /\b(go to|take me to|show me?|open|navigate to|scroll to|jump to)\b.*\b(experience|timeline|history)\b/i, section: 'experience' },
      { pattern: /\b(go to|take me to|show me?|open|navigate to|scroll to|jump to)\b.*\b(blog|writing|article)\b/i, section: 'blog' },
      { pattern: /\b(go to|take me to|show me?|open|navigate to|scroll to|jump to)\b.*\b(contact|reach|email|hire)\b/i, section: 'contact' },
    ];
    for (const nav of NAV_PATTERNS) {
      if (nav.pattern.test(t)) return { type: 'navigate', payload: nav.section };
    }

    /* Summarise current section */
    if (/\b(summarize|summary|summarise|what('s| is) (on )?this (page|section))\b/i.test(t)) {
      return { type: 'summarize', payload: currentSection };
    }

    /* Greeting */
    if (/^(hi|hey|hello|sup|yo|howdy|good (morning|afternoon|evening))[\s!?.,]*$/.test(t)) {
      return { type: 'greeting', payload: null };
    }

    /* Topic intents */
    const KB = KNOWLEDGE_BASE;
    const checks = [
      { keywords: KB.about.keywords,     type: 'about',      payload: 'about' },
      { keywords: KB.education.keywords, type: 'education',  payload: 'about' },
      { keywords: KB.skills.keywords,    type: 'skills',     payload: 'skills' },
      { keywords: KB.blog.keywords,      type: 'blog',       payload: 'blog' },
      { keywords: KB.contact.keywords,   type: 'contact',    payload: 'contact' },
      { keywords: KB.goals.keywords,     type: 'goals',      payload: null },
      {
        keywords: ['project', 'built', 'build', 'made', 'created', 'work', 'app', 'system', 'demo'],
        type: 'projects', payload: 'projects',
      },
      {
        keywords: ['experience', 'job', 'internship', 'intern', 'team', 'club', 'purdue space', 'epics', 'work at'],
        type: 'experience', payload: 'experience',
      },
    ];

    for (const c of checks) {
      if (c.keywords.some(k => t.includes(k))) {
        return { type: c.type, payload: c.payload };
      }
    }

    return { type: 'unknown', payload: null };
  }

  /* ─────────────────────────────────────────────────────────────
     getLocalResponse(text, intent) — returns HTML string
  ───────────────────────────────────────────────────────────── */
  function getLocalResponse(text, intent) {
    const KB = KNOWLEDGE_BASE;
    const t  = text.toLowerCase();

    switch (intent.type) {

      case 'greeting':
        return `Hey! Good to see you here. I'm Ichiro's portfolio assistant.<br>
          Ask me about his <strong>projects</strong>, <strong>skills</strong>, <strong>experience</strong>,
          or tell me where you'd like to go on the site.`;

      case 'navigate':
        return navigateResponse(intent.payload);

      case 'summarize':
        return summarizeSection(intent.payload);

      case 'about':
        return `${KB.about.summary}<br><br>
          He's currently focused on: <strong>${KB.about.currentWork}</strong>.<br>
          Mission: <em>${KB.about.mission}</em>`;

      case 'education':
        const edu = KB.education;
        return `Ichiro studies <strong>${edu.degree}</strong> at <strong>${edu.school}</strong>
          (${edu.years}), with a GPA of <strong>${edu.gpa}</strong> and ${edu.honors}.<br><br>
          Relevant coursework: ${edu.courses}.`;

      case 'projects': {
        // Check for type filter
        const isAI  = /ai|ml|machine|vision|translate|whisper|neural|deep/i.test(t);
        const isHW  = /rocket|avionics|hardware|pcb|embedded|aerospace/i.test(t);
        const list  = KB.projects.filter(p =>
          isAI ? p.type === 'ai' : isHW ? p.type === 'hardware' : true
        );
        const items = list.map(p =>
          `<strong>${p.title}</strong> — ${p.short}`
        ).join('<br><br>');
        return `${isAI ? "Ichiro's AI projects" : isHW ? "His engineering/hardware projects" : "Here are Ichiro's featured projects"}:<br><br>${items}`;
      }

      case 'skills': {
        const sk = KB.skills;
        return `Ichiro's skill set:<br><br>
          <strong>Programming:</strong> ${sk.programming.items.join(', ')}<br>
          <strong>AI / ML:</strong> ${sk.ai.items.join(', ')}<br>
          <strong>Engineering:</strong> ${sk.engineering.items.join(', ')}<br>
          <strong>Tools:</strong> ${sk.tools.items.join(', ')}`;
      }

      case 'experience': {
        const items = KB.experience.map(e =>
          `<strong>${e.org}</strong><br><em>${e.role}</em> · ${e.years}<br>${e.desc}`
        ).join('<br><br>');
        return `Ichiro's experience:<br><br>${items}`;
      }

      case 'blog': {
        const posts = KB.blog.posts.map((p, i) => `${i+1}. ${p}`).join('<br>');
        return `${KB.blog.summary}<br><br>${posts ? `Visible right now:<br><br>${posts}` : ''}`;
      }

      case 'contact': {
        const emailLine = KB.contact.emailAlt && KB.contact.emailAlt !== KB.contact.email
          ? `<strong>Email:</strong> ${KB.contact.email}<br><strong>Hero email link:</strong> ${KB.contact.emailAlt}<br>`
          : `<strong>Email:</strong> ${KB.contact.email}<br>`;
        return `You can reach Ichiro at:<br><br>
          ${emailLine}
          <strong>GitHub:</strong> ${KB.contact.github}<br>
          <strong>LinkedIn:</strong> ${KB.contact.linkedin}<br><br>
          He's currently <em>${KB.status}</em>.`;
      }

      case 'goals':
        return KB.goals.summary;

      default: {
        // Try project keyword matching as a last resort
        for (const p of KB.projects) {
          if (p.keywords.some(k => t.includes(k))) {
            return `<strong>${p.title}</strong><br><br>${p.full}<br><br>
              <strong>Stack:</strong> ${p.stack.join(', ')}`;
          }
        }
        return `I'm not sure about that one, but I can tell you about Ichiro's
          <strong>projects</strong>, <strong>skills</strong>, <strong>experience</strong>,
          or help you navigate to any section. What would you like to know?`;
      }
    }
  }

  /* Helper: navigation response text */
  function navigateResponse(sectionId) {
    const map = {
      home:       "Taking you back to the top.",
      about:      "Absolutely. Here's Ichiro's story — his background, mission, and what he's currently building.",
      projects:   "Here are Ichiro's featured projects. Taking you to the Projects section now.",
      skills:     "Sure — here's a breakdown of Ichiro's technical skills. Navigating there now.",
      experience: "Here's Ichiro's professional and academic experience. Scrolling to the timeline.",
      blog:       "There's no writing section right now, so here's the Work section instead.",
      contact:    "You can reach Ichiro by email, GitHub, or LinkedIn — or use the contact form. Taking you there.",
    };
    return map[sectionId] || `Navigating to ${sectionId}…`;
  }

  /* Helper: summarize current section */
  function summarizeSection(section) {
    const KB = KNOWLEDGE_BASE;
    const map = {
      home: `You're on the <strong>Home</strong> section — the hero intro for ${KB.name}, Computer Engineering student at Purdue. Here you can navigate to any section or open the contact page.`,
      about: KB.about.summary,
      projects: `This section showcases ${KB.projects.length} featured projects: ${KB.projects.map(p => p.title).join(', ')}.`,
      skills: `The Skills section highlights Ichiro's strengths across programming, AI workflows, engineering tools, and collaboration.`,
      experience: `The Experience section has two columns: engineering (Purdue Space Program, EPICS, IIT Delhi, ECE Student Society) and leadership (Amplify Purdue, Sustainable Energy Club, Japanese Student Association, PSUB).`,
      blog: KB.blog.summary,
      contact: `The Contact section has Ichiro's email links, GitHub, LinkedIn, and a direct message form.`,
    };
    return map[section] || `You're in the <strong>${section}</strong> section. Ask me anything specific about Ichiro and I'll help.`;
  }

  /* ─────────────────────────────────────────────────────────────
     queryHuggingFace(userText) — returns promise<string>
     Calls HuggingFace Inference API.
     Falls back to local on error.
  ───────────────────────────────────────────────────────────── */
  async function queryHuggingFace(userText) {
    const endpointType = AI_CONFIG.endpointType || 'chat-completions';
    const configuredModel = getConfiguredHFModel();

    if (!configuredModel) {
      throw new Error('Missing Hugging Face model name.');
    }

    const endpoint = endpointType === 'chat-completions'
      ? 'https://router.huggingface.co/v1/chat/completions'
      : `https://api-inference.huggingface.co/models/${AI_CONFIG.model}`;

    const body = endpointType === 'chat-completions'
      ? {
          model: configuredModel,
          messages: [
            { role: 'system', content: buildSystemPrompt() },
            { role: 'user', content: userText },
          ],
          max_tokens: AI_CONFIG.maxTokens,
          temperature: AI_CONFIG.temperature ?? 0.7,
        }
      : {
          inputs: `<|system|>\n${buildSystemPrompt()}\n<|user|>\n${userText}\n<|assistant|>\n`,
          parameters: {
            max_new_tokens: AI_CONFIG.maxTokens,
            return_full_text: false,
            temperature: AI_CONFIG.temperature ?? 0.7,
          },
          options: { wait_for_model: true },
        };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_CONFIG.huggingFaceApiKey}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const apiError = data?.error?.message || data?.error || data?.message;
      throw new Error(apiError || `HF API error ${res.status}`);
    }

    if (endpointType === 'chat-completions') {
      const content = data?.choices?.[0]?.message?.content;
      if (typeof content === 'string' && content.trim()) return content.trim();
      throw new Error('Unexpected HF chat response shape');
    }

    if (Array.isArray(data) && data[0]?.generated_text) return data[0].generated_text.trim();
    if (data?.generated_text) return data.generated_text.trim();
    throw new Error('Unexpected HF text-generation response shape');
  }

  /* ─────────────────────────────────────────────────────────────
     generateAssistantReply(text) — main orchestrator
     1. Always check navigation intent first (instant scroll)
     2. If HF mode, call API for richer response
     3. Otherwise use local knowledge base
  ───────────────────────────────────────────────────────────── */
  async function generateAssistantReply(text) {
    const intent = detectIntent(text);

    /* Navigation — handle immediately regardless of mode */
    if (intent.type === 'navigate') {
      const replyText = navigateResponse(intent.payload);
      addMessage(replyText, 'assistant', { nav: intent.payload });
      handleNavigation(intent.payload);
      return;
    }

    /* For non-nav intents in HF mode, try the LLM */
    if (isAIMode && intent.type !== 'greeting') {
      try {
        const aiText = await queryHuggingFace(text);
        // Still navigate if topic implies a section
        const nav = intent.payload;
        addMessage(aiText, 'assistant', nav ? { nav } : {});
        setPersistentStatus(defaultStatusLabel);
        if (nav) handleNavigation(nav);
        return;
      } catch (err) {
        console.warn('[AI] HuggingFace error, falling back to local:', err.message);
        const localReply = getLocalResponse(text, intent);
        const nav        = intent.payload;
        const fallbackMessage = `
          <div><strong>Model fallback:</strong> Zephyr could not answer right now.</div>
          <div><em>${escapeHTML(err.message)}</em></div>
          <br>
          <div>${localReply}</div>
        `;
        addMessage(fallbackMessage, 'assistant', nav ? { nav } : {});
        setPersistentStatus('AI Fallback');
        if (nav) handleNavigation(nav);
        return;
      }
    }

    /* Local fallback */
    const localReply = getLocalResponse(text, intent);
    const nav        = intent.payload;
    addMessage(localReply, 'assistant', nav ? { nav } : {});
    if (nav) handleNavigation(nav);
  }

  /* ─────────────────────────────────────────────────────────────
     handleSend() — user submits a message
  ───────────────────────────────────────────────────────────── */
  async function handleSend() {
    const text = input.value.trim();
    if (!text || isWaitingReply) return;

    addMessage(escapeHTML(text), 'user');
    input.value = '';
    isWaitingReply = true;
    updateSuggestions([]); // hide chips while loading
    setWaitingState(true);
    showTyping(isAIMode ? 'Thinking' : 'Typing');

    const delay = isAIMode ? 200 : 400 + Math.random() * 400;

    try {
      await new Promise(r => setTimeout(r, delay));
      await generateAssistantReply(text);
    } catch (err) {
      console.error('[AI] Unexpected assistant error:', err);
      if (isAIMode) setPersistentStatus('AI Issue');
      addMessage(
        `Something went wrong while preparing a reply. Please try again in a moment.`,
        'assistant'
      );
    } finally {
      hideTyping();
      isWaitingReply = false;
      setWaitingState(false);
      updateSuggestions();
      if (input) input.focus();
    }
  }

  /* ─────────────────────────────────────────────────────────────
     sendWelcome() — first message on open
  ───────────────────────────────────────────────────────────── */
  function sendWelcome() {
    // Date divider
    const div = document.createElement('div');
    div.className = 'ai-date-divider';
    const now   = new Date();
    const label = document.createElement('span');
    label.textContent = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    div.appendChild(label);
    messagesEl.appendChild(div);

    addMessage(
      `Hi — I'm <strong>Ichibot</strong>. Ask me about his projects, skills, experience,
       or tell me where you'd like to go on this portfolio.`,
      'assistant'
    );
  }

  /* ─────────────────────────────────────────────────────────────
     updateSuggestions(chips?) — rebuild the chips bar
     Chips are section-aware based on currentSection.
  ───────────────────────────────────────────────────────────── */
  const SECTION_CHIPS = {
    home: [
      { label: 'What projects has he built?', q: 'What projects has he built?' },
      { label: 'What does he study?',          q: 'What does Ichiro study?' },
      { label: 'Show me skills',               q: 'Show me the skills section' },
      { label: 'How do I contact him?',        q: 'How can I contact Ichiro?' },
    ],
    about: [
      { label: 'What is he working on?', q: 'What is Ichiro currently working on?' },
      { label: 'Show me his projects',   q: 'Show me his projects' },
      { label: 'Career goals',           q: 'What are his career goals?' },
      { label: 'Summarize this section', q: 'Summarize this section' },
    ],
    projects: [
      { label: 'AI projects',            q: 'What are his AI projects?' },
      { label: 'HandForge',              q: 'What is HandForge?' },
      { label: 'What tech does he use?', q: 'What technologies does he use?' },
      { label: 'Summarize projects',     q: 'Summarize this section' },
    ],
    skills: [
      { label: 'Programming languages', q: 'What programming languages does he know?' },
      { label: 'AI/ML tools',           q: 'What AI and ML tools does he use?' },
      { label: 'Show experience',        q: 'Show me experience section' },
      { label: 'Summarize skills',       q: 'Summarize this section' },
    ],
    experience: [
      { label: 'Club leadership',      q: 'What clubs does he help run?' },
      { label: 'Design Lead role',     q: 'Tell me about his EPICS design lead role' },
      { label: 'Show projects',        q: 'Go to projects section' },
      { label: 'Summarize experience', q: 'Summarize this section' },
    ],
    blog: [
      { label: 'Featured projects',         q: 'What projects has he built?' },
      { label: 'His GitHub',                q: 'What is his GitHub?' },
      { label: 'Go to contact',             q: 'Take me to contact section' },
    ],
    contact: [
      { label: 'Email address',        q: 'What is his email address?' },
      { label: 'GitHub profile',       q: 'What is his GitHub?' },
      { label: 'Is he open to work?',  q: 'Is Ichiro open to new opportunities?' },
    ],
  };

  function updateSuggestions(override) {
    if (!suggestBar) return;
    suggestBar.innerHTML = '';
    const chips = override !== undefined ? override : (SECTION_CHIPS[currentSection] || SECTION_CHIPS.home);
    chips.forEach(chip => {
      const btn = document.createElement('button');
      btn.className = 'ai-chip';
      btn.textContent = chip.label;
      btn.setAttribute('data-query', chip.q);
      btn.setAttribute('type', 'button');
      suggestBar.appendChild(btn);
    });
  }

  /* ─────────────────────────────────────────────────────────────
     Track current section for context-aware chips
  ───────────────────────────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  function trackSection() {
    const pos = window.scrollY + 140;
    sections.forEach(s => {
      if (pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight) {
        if (currentSection !== s.id) {
          currentSection = s.id;
          if (isOpen) updateSuggestions();
        }
      }
    });
  }
  window.addEventListener('scroll', trackSection, { passive: true });

  /* ─────────────────────────────────────────────────────────────
     Event listeners
  ───────────────────────────────────────────────────────────── */

  // FAB click
  fab.addEventListener('click', () => toggleChat());
  fab.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleChat(); } });

  // Close button
  if (closeBtn) closeBtn.addEventListener('click', () => toggleChat(false));

  // Clear button
  if (clearBtn) clearBtn.addEventListener('click', () => {
    messagesEl.innerHTML = '';
    hasGreeted = false;
    if (isOpen) { sendWelcome(); hasGreeted = true; }
    updateSuggestions();
  });

  // Send
  if (sendBtn) sendBtn.addEventListener('click', handleSend);
  if (input) {
    input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } });
    input.addEventListener('input', syncSendButtonState);
  }

  // Suggestion chips (event delegation)
  if (suggestBar) {
    suggestBar.addEventListener('click', e => {
      const chip = e.target.closest('.ai-chip');
      if (!chip || isWaitingReply) return;
      e.preventDefault();
      e.stopPropagation();
      toggleChat(true);
      if (input) { input.value = chip.getAttribute('data-query'); }
      handleSend();
    });
  }

  // Escape key to close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) toggleChat(false);
  });

  // Click outside to close
  document.addEventListener('click', e => {
    if (isOpen && !chat.contains(e.target) && !fab.contains(e.target)) {
      toggleChat(false);
    }
  });

  /* Initial suggestions render */
  updateSuggestions();

})(); // end AI Assistant IIFE
