const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = Number(process.env.PORT || 3000);
const rootDir = __dirname;
const publicDir = path.join(rootDir, 'public');

app.use(express.json({ limit: '32kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDir));

function getRequiredEnv(name) {
  const value = process.env[name];
  return typeof value === 'string' ? value.trim() : '';
}

function buildTransporter() {
  const host = getRequiredEnv('SMTP_HOST');
  const portValue = Number(getRequiredEnv('SMTP_PORT') || 587);
  const user = getRequiredEnv('SMTP_USER');
  const pass = getRequiredEnv('SMTP_PASS');
  const secure = String(process.env.SMTP_SECURE || '').toLowerCase() === 'true' || portValue === 465;

  if (!host || !user || !pass) {
    throw new Error('Missing SMTP configuration. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.');
  }

  return nodemailer.createTransport({
    host,
    port: portValue,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

app.post('/api/contact', async (req, res) => {
  const name = String(req.body?.name || '').trim();
  const email = String(req.body?.email || '').trim();
  const message = String(req.body?.message || '').trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill out your name, email, and message first.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  if (name.length > 120 || email.length > 160 || message.length > 5000) {
    return res.status(400).json({ error: 'Your message is too long. Please shorten it and try again.' });
  }

  try {
    const transporter = buildTransporter();
    const to = getRequiredEnv('CONTACT_TO') || getRequiredEnv('SMTP_USER');
    const from = getRequiredEnv('CONTACT_FROM') || getRequiredEnv('SMTP_USER');

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        message,
      ].join('\n'),
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    return res.json({ message: "Message sent. I'll get back to you soon." });
  } catch (error) {
    console.error('Contact form send failed:', error);
    return res.status(500).json({ error: 'The message could not be sent right now. Please try again later.' });
  }
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

module.exports = app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Portfolio server running on http://localhost:${port}`);
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[character]));
}
