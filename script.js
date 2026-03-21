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
  headline: 'Computer Engineering Student @Purdue · AI · Avionics · Systems',
  location: 'Indianapolis, IN',
  email:    'okochi@purdue.edu',
  github:   'github.com/IchiroOkochi',
  linkedin: 'linkedin.com/in/okochi',
  status:   'Open to Opportunities',

  about: {
    summary: `Ichiro is a Computer Engineering student at Purdue University building intelligent systems
      where artificial intelligence, software, and hardware meet, with a focus on turning ideas
      into real-world technology.`,
    currentWork: `VaaniConnect: building an LLM-powered translation app for underrepresented Indian dialects
      and more inclusive multilingual communication.`,
    interests:   'machine learning, embedded systems, avionics, aerospace, multilingual AI, real-world engineering',
    mission:     'Build intelligent, reliable systems that quietly shape the world around them.',
    keywords:    ['about', 'who', 'ichiro', 'bio', 'background', 'story', 'person'],
    section:     'about',
  },

  education: {
    school:   'Purdue University',
    degree:   'Bachelor of Science - BS, Computer Engineering',
    gpa:      '3.68',
    years:    'Aug 2025 - May 2029',
    honors:   'Purdue Space Program, Purdue Student Union Board, and Taekwondo',
    courses:  'Computer Engineering, electromagnetic fields, algorithms, and hands-on engineering work across software and hardware.',
    keywords: ['study', 'major', 'degree', 'school', 'university', 'purdue', 'gpa', 'education', 'course', 'class'],
    section:  'experience',
  },

  projects: [
    {
      title:    'Vaani Connect',
      short:    'Architected the early backend for a multi-model AI pipeline with STT, T2T, and TTS workflows.',
      full:     `Vaani Connect is an AI translation project where Ichiro architected the early backend for a
        multi-model pipeline, integrating speech-to-text, text-to-text, and text-to-speech components.
        The work focused on parallel processing, lower latency, and keeping the mobile and web platforms
        aligned across EPICS and KL University teams.`,
      stack:    ['Python', 'WSL', 'STT/T2T/TTS', 'AI Pipeline'],
      keywords: ['vaani', 'vaani connect', 'translate', 'translation', 'speech', 'language', 'stt', 'tts', 't2t', 'ai pipeline', 'multilingual'],
      type:     'ai',
    },
    {
      title:    'Embedded System Enclosure',
      short:    'Designed and 3D printed a custom Siemens NX enclosure for a Raspberry Pi Pico and LoRa system.',
      full:     `This project involved designing a custom enclosure for an embedded system that uses a
        Raspberry Pi Pico and a 900 MHz LoRa module. Ichiro translated manual measurements, board specs,
        and tolerance calculations into a precise Siemens NX housing that could be physically produced.`,
      stack:    ['Siemens NX', 'Raspberry Pi Pico', 'LoRa', '3D Printing'],
      keywords: ['embedded', 'enclosure', 'raspberry pi pico', 'lora', '3d printing', 'siemens nx', 'hardware'],
      type:     'hardware',
    },
  ],

  skills: {
    programming:  { items: ['Python', 'VPython', 'Algorithms', 'Object-Oriented Programming (OOP)', 'Mobile Application Development'], level: 'strong' },
    ai:           { items: ['Hugging Face Products', 'Parallel Processing', 'Process Modeling', 'AI Pipeline Design', 'Multilingual AI'], level: 'solid' },
    engineering:  { items: ['Computer Engineering', 'Siemens NX', 'Printed Circuit Board (PCB) Design', 'OpenRocket', 'Soldering'], level: 'strong' },
    tools:        { items: ['GitHub', 'Powershell', 'Google Colab', 'Microsoft Office', 'Notion'], level: 'solid' },
    keywords:     ['skill', 'know', 'language', 'tech', 'stack', 'tools', 'experience with', 'familiar', 'proficient', 'use'],
    section:      'skills',
  },

  experience: [
    {
      org:     'EPICS at Purdue',
      role:    'Design Lead',
      years:   'Jan 2026 - Present',
      desc:    'Architected the early backend for a multi-model AI pipeline, integrated STT/T2T/TTS components, reduced latency, and kept the web and mobile app architecture aligned with KL University collaborators.',
    },
    {
      org:     'Indian Institute of Technology, Delhi',
      role:    'Project Liaison',
      years:   'Aug 2025 - Dec 2025',
      desc:    'Coordinated Purdue and IIT Delhi teams, organized meetings, relayed faculty feedback, researched requirements, and supported a low-cost Bhilawa seed decorticator project for rural communities.',
    },
    {
      org:     'Purdue Student Union Board (PSUB)',
      role:    'General Member',
      years:   'Feb 2026 - Present',
      desc:    'Helps plan and execute large-scale campus events, contributes new event ideas, and supports outreach and student experience initiatives.',
    },
    {
      org:     'Purdue Space Program: A SEDS Chapter',
      role:    'Avionics Team Member',
      years:   'Feb 2026 - Present',
      desc:    'Contributes to Purdue Space Program avionics work for high-power rockets.',
    },
  ],

  blog: {
    posts: [
      'Currently working on this!',
    ],
    summary: 'The Writing section is still being built out. Fresh writing and project notes are coming soon.',
    keywords: ['blog', 'writing', 'article', 'post', 'read', 'write', 'publish'],
    section:  'blog',
  },

  contact: {
    email:    'okochi@purdue.edu',
    emailAlt: 'iokochi@purdue.edu',
    github:   'github.com/ichirookochi',
    linkedin: 'linkedin.com/in/okochi',
    keywords: ['contact', 'reach', 'email', 'hire', 'connect', 'linkedin', 'github', 'message', 'touch', 'talk'],
    section:  'contact',
  },

  goals: {
    summary: `Ichiro is building toward opportunities at the intersection of AI, avionics, and systems engineering.
      He is especially interested in real-world technology that blends software, hardware, and intelligent systems.`,
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
   SECTION 3 — CUSTOM CURSOR
   ═══════════════════════════════════════════════════════════════ */
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.addEventListener('mousemove', e => {
    const x = e.clientX;
    const y = e.clientY;
    cursor.style.left = x + 'px';
    cursor.style.top  = y + 'px';
    follower.style.left = x + 'px';
    follower.style.top  = y + 'px';
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0'; follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1'; follower.style.opacity = '1';
  });
})();

(function initContactApiForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const btn = form?.querySelector('.form-submit');
  const fallbackRecipient = 'iokochi@purdue.edu';
  let messageTimer = 0;

  if (!form || !btn) return;

  const setMessage = (text, isError = false) => {
    if (!success) return;

    success.textContent = text;
    success.style.display = 'block';
    success.classList.toggle('is-error', isError);

    window.clearTimeout(messageTimer);
    messageTimer = window.setTimeout(() => {
      success.style.display = 'none';
      success.classList.remove('is-error');
    }, 5000);
  };

  const openEmailFallback = payload => {
    const subject = `Portfolio message from ${payload.name}`;
    const body = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      '',
      payload.message,
    ].join('\n');

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

    if (!payload.name || !payload.email || !payload.message) {
      setMessage('Please fill out your name, email, and message first.', true);
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let data = null;
      try {
        data = await response.json();
      } catch (_) {
        data = null;
      }

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to send message right now.');
      }

      form.reset();
      setMessage(data?.message || "Message sent. I'll get back to you soon.");
    } catch (error) {
      openEmailFallback(payload);
      setMessage('Direct send is unavailable, so your email app was opened instead.');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }
  });
})();

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — HERO CANVAS (Particle constellation)
   ═══════════════════════════════════════════════════════════════ */
(function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles, raf;
  const N = 90, DIST = 140;
  const MOUSE = { x: -9999, y: -9999 };

  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  function mkParticle() {
    return {
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.5, o: Math.random() * 0.4 + 0.1,
    };
  }
  function init() { resize(); particles = Array.from({ length: N }, mkParticle); }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < DIST) {
          ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255,255,255,${(1-d/DIST)*0.17})`;
          ctx.lineWidth = 0.6; ctx.stroke();
        }
      }
      const mdx = particles[i].x - MOUSE.x, mdy = particles[i].y - MOUSE.y;
      const md = Math.sqrt(mdx*mdx + mdy*mdy);
      if (md < 200) {
        ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(MOUSE.x, MOUSE.y);
        ctx.strokeStyle = `rgba(255,255,255,${(1-md/200)*0.35})`;
        ctx.lineWidth = 0.8; ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(particles[i].x, particles[i].y, particles[i].r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${particles[i].o})`; ctx.fill();
    }
  }
  function update() {
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
  }
  function loop() { update(); draw(); raf = requestAnimationFrame(loop); }

  const hero = document.getElementById('home');
  if (hero) {
    hero.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect();
      MOUSE.x = e.clientX - r.left; MOUSE.y = e.clientY - r.top;
    });
    hero.addEventListener('mouseleave', () => { MOUSE.x = -9999; MOUSE.y = -9999; });
  }

  window.addEventListener('resize', () => { cancelAnimationFrame(raf); init(); loop(); });
  init(); loop();
})();

/* ═══════════════════════════════════════════════════════════════
   SECTION 5 — NAVBAR
   ═══════════════════════════════════════════════════════════════ */
(function initNavbar() {
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('navLinks');
  const links      = navLinks ? navLinks.querySelectorAll('.nav-link') : [];
  const sections   = document.querySelectorAll('section[id]');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
    });
    links.forEach(l => l.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    }));
  }

  function setActive() {
    const pos = window.scrollY + 120;
    sections.forEach(s => {
      if (pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight) {
        links.forEach(l => l.classList.remove('active'));
        const a = navLinks ? navLinks.querySelector(`a[href="#${s.id}"]`) : null;
        if (a) a.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();

/* ═══════════════════════════════════════════════════════════════
   SECTION 6 — SCROLL REVEAL
   ═══════════════════════════════════════════════════════════════ */
(function initScrollReveal() {
  const els = document.querySelectorAll('.reveal-up');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = Array.from(entry.target.parentElement.querySelectorAll(':scope > .reveal-up'));
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${Math.min(idx * 80, 300)}ms`;
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
})();

/* ═══════════════════════════════════════════════════════════════
   SECTION 7 — CONTACT FORM
   ═══════════════════════════════════════════════════════════════ */
(function initCurrentFocus() {
  const root = document.querySelector('[data-current-focus]');
  if (!root) return;

  const contentEl  = root.querySelector('.current-focus-content');
  const titleEl    = root.querySelector('[data-focus-title]');
  const descEl     = root.querySelector('[data-focus-desc]');
  const stageEl    = root.querySelector('[data-focus-stage]');
  const indexEl    = root.querySelector('[data-focus-index]');
  const progressEl = root.querySelector('[data-focus-progress]');
  const prevBtn    = root.querySelector('[data-focus-prev]');
  const nextBtn    = root.querySelector('[data-focus-next]');

  if (!contentEl || !titleEl || !descEl || !stageEl || !indexEl || !progressEl || !prevBtn || !nextBtn) return;

  // Intentionally separate from the AI assistant data.
  const FOCUS_ITEMS = [
    {
      title: 'VaaniConnect',
      desc: 'Building an LLM-powered translation app focused on underrepresented Indian dialects and more inclusive multilingual communication.',
      stage: 'Active build',
    },
    {
      title: 'L1 Rocket',
      desc: 'Designing and preparing a high-power rocket with an H motor for L1 certification and launch readiness.',
      stage: 'Flight prep',
    },
    {
      title: 'Air Mouse',
      desc: 'Using hand tracking to control a computer smoothly and seamlessly through natural gestures.',
      stage: 'Prototype',
    },
    {
      title: 'Twin',
      desc: 'Building a voice assistant that can understand commands and control your computer through natural conversation.',
      stage: 'Concept build',
    },
  ];

  const ROTATE_MS = 4800;
  const SWAP_MS = 180;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let activeIndex = 0;
  let rotationTimer = null;
  let swapTimer = null;
  let progressFrame = null;
  let cycleStartedAt = 0;
  let elapsedBeforePause = 0;
  let isPaused = false;

  function formatIndex(index) {
    const current = String(index + 1).padStart(2, '0');
    const total = String(FOCUS_ITEMS.length).padStart(2, '0');
    return `${current} / ${total}`;
  }

  function setProgress(value) {
    progressEl.style.transform = `scaleX(${Math.max(0, Math.min(1, value))})`;
  }

  function stopProgress() {
    if (!progressFrame) return;
    cancelAnimationFrame(progressFrame);
    progressFrame = null;
  }

  function stopRotation() {
    if (rotationTimer) {
      clearTimeout(rotationTimer);
      rotationTimer = null;
    }
    stopProgress();
  }

  function tickProgress(now) {
    if (isPaused) return;

    const elapsed = elapsedBeforePause + (now - cycleStartedAt);
    setProgress(elapsed / ROTATE_MS);

    if (elapsed >= ROTATE_MS) {
      progressFrame = null;
      return;
    }

    progressFrame = requestAnimationFrame(tickProgress);
  }

  function scheduleNext() {
    stopRotation();

    if (prefersReducedMotion || isPaused) {
      setProgress(0);
      return;
    }

    cycleStartedAt = performance.now();
    progressFrame = requestAnimationFrame(tickProgress);
    rotationTimer = setTimeout(() => {
      showItem(activeIndex + 1);
    }, ROTATE_MS - elapsedBeforePause);
  }

  function commitItem(index) {
    const item = FOCUS_ITEMS[index];
    titleEl.textContent = item.title;
    descEl.textContent = item.desc;
    stageEl.textContent = item.stage;
    indexEl.textContent = formatIndex(index);
  }

  function showItem(index, immediate = false) {
    activeIndex = (index + FOCUS_ITEMS.length) % FOCUS_ITEMS.length;
    elapsedBeforePause = 0;

    if (swapTimer) {
      clearTimeout(swapTimer);
      swapTimer = null;
    }

    if (immediate || prefersReducedMotion) {
      contentEl.classList.remove('is-changing');
      commitItem(activeIndex);
      scheduleNext();
      return;
    }

    contentEl.classList.add('is-changing');
    swapTimer = setTimeout(() => {
      commitItem(activeIndex);
      contentEl.classList.remove('is-changing');
      swapTimer = null;
      scheduleNext();
    }, SWAP_MS);
  }

  function pauseRotation() {
    if (prefersReducedMotion || isPaused) return;

    isPaused = true;
    elapsedBeforePause += performance.now() - cycleStartedAt;
    stopRotation();
    setProgress(elapsedBeforePause / ROTATE_MS);
  }

  function resumeRotation() {
    if (prefersReducedMotion || !isPaused) return;
    isPaused = false;
    scheduleNext();
  }

  prevBtn.addEventListener('click', () => {
    showItem(activeIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    showItem(activeIndex + 1);
  });

  root.addEventListener('mouseenter', pauseRotation);
  root.addEventListener('mouseleave', resumeRotation);
  root.addEventListener('focusin', pauseRotation);
  root.addEventListener('focusout', () => {
    if (!root.contains(document.activeElement)) resumeRotation();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseRotation();
    else if (!root.matches(':hover') && !root.contains(document.activeElement)) resumeRotation();
  });

  showItem(0, true);
})();

(function initForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;
  const btn = form.querySelector('.form-submit');
  const recipient = 'okochi@purdue.edu';
  // Legacy mock handler disabled; the API-backed form handler lives below.
  return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!btn) return;

    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    if (!name || !email || !message) {
      if (success) {
        success.textContent = 'Please fill out your name, email, and message first.';
        success.style.display = 'block';
      }
      return;
    }

    const originalLabel = btn.textContent;
    const subject = `Portfolio message from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      message,
    ].join('\n');
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    btn.textContent = 'Opening Email...';
    btn.disabled = true;
    window.location.href = mailtoUrl;

    window.setTimeout(() => {
      btn.textContent = originalLabel;
      btn.disabled = false;
      form.reset();
      if (success) {
        success.textContent = 'Your email draft is ready to send.';
        success.style.display = 'block';
        window.setTimeout(() => { success.style.display = 'none'; }, 5000);
      }
    }, 600);
    return;
    btn.textContent = 'Sending…'; btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message'; btn.disabled = false;
      form.reset();
      if (success) { success.style.display = 'block'; setTimeout(() => { success.style.display = 'none'; }, 5000); }
    }, 1200);
  });
})();

/* ═══════════════════════════════════════════════════════════════
   SMOOTH ANCHOR NAVIGATION
   ═══════════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: id === 'home' ? 0 : target.offsetTop - 72, behavior: 'smooth' });
  });
});

/* ═══════════════════════════════════════════════════════════════
   PAGE LOAD FADE
   ═══════════════════════════════════════════════════════════════ */
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
window.addEventListener('load', () => { document.body.style.opacity = '1'; });

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
      { keywords: KB.education.keywords, type: 'education',  payload: 'experience' },
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
      blog:       "The Writing section is still in progress. Heading there now so you can see what's coming next.",
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
      experience: `The Experience section covers Purdue University, EPICS at Purdue, IIT Delhi collaboration work, PSUB, and the Purdue Space Program.`,
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
      { label: 'Avionics work',          q: 'Tell me about his avionics project' },
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
      { label: 'Purdue Space Program', q: 'Tell me about his role at Purdue Space Program' },
      { label: 'Design Lead role',     q: 'Tell me about his EPICS design lead role' },
      { label: 'Show projects',        q: 'Go to projects section' },
      { label: 'Summarize experience', q: 'Summarize this section' },
    ],
    blog: [
      { label: 'What does he write about?', q: 'What topics does Ichiro write about?' },
      { label: 'AI articles',               q: 'What has he written about AI?' },
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
