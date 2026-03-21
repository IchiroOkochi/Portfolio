const path = require('path');
const express = require('express');
require('dotenv').config();
const { handleContactRequest } = require('./contact-handler');

const app = express();
const port = Number(process.env.PORT || 3000);
const rootDir = __dirname;
const publicDir = path.join(rootDir, 'public');

app.use(express.json({ limit: '32kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDir));

app.post('/api/contact', async (req, res) => {
  return handleContactRequest(req, res);
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
