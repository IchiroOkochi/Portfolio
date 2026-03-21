require('dotenv').config();
const { handleContactRequest } = require('../contact-handler');

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  if (chunks.length === 0) {
    return {};
  }

  const raw = Buffer.concat(chunks).toString('utf8').trim();
  return raw ? JSON.parse(raw) : {};
}

module.exports = async (req, res) => {
  try {
    req.body = await readJsonBody(req);
  } catch {
    return res.status(400).json({ error: 'Invalid request body.' });
  }

  return handleContactRequest(req, res);
};
