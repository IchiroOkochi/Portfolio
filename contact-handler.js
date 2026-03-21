const nodemailer = require('nodemailer');

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

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[character]));
}

async function sendContactMessage(body) {
  const name = String(body?.name || '').trim();
  const email = String(body?.email || '').trim();
  const message = String(body?.message || '').trim();

  if (!name || !email || !message) {
    return { status: 400, payload: { error: 'Please fill out your name, email, and message first.' } };
  }

  if (!isValidEmail(email)) {
    return { status: 400, payload: { error: 'Please enter a valid email address.' } };
  }

  if (name.length > 120 || email.length > 160 || message.length > 5000) {
    return { status: 400, payload: { error: 'Your message is too long. Please shorten it and try again.' } };
  }

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

  return { status: 200, payload: { message: "Message sent. I'll get back to you soon." } };
}

async function handleContactRequest(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const result = await sendContactMessage(req.body);
    return res.status(result.status).json(result.payload);
  } catch (error) {
    console.error('Contact form send failed:', error);
    return res.status(500).json({ error: 'The message could not be sent right now. Please try again later.' });
  }
}

module.exports = {
  handleContactRequest,
  sendContactMessage,
};
