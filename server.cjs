const express = require('express');
const path = require('path');
const fs = require('fs');
const { createClient } = require('@sanity/client');
require('dotenv').config();

const app = express();
const PORT = 5000;

const client = createClient({
  projectId: 'oqst5cr0',
  dataset: 'production',
  apiVersion: '2023-07-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

app.use(express.json());

app.post('/api/submitQuiz', async (req, res) => {
  console.log('Received POST /api/submitQuiz', req.body);
  try {
    const { name, email, phone, answers } = req.body;
    const doc = {
      _type: 'quizResult',
      name,
      email,
      phone,
      answers,
      submittedAt: new Date().toISOString(),
    };
    const result = await client.create(doc);
    res.json({ success: true, id: result._id });
  } catch (err) {
    console.error('Error in /api/submitQuiz:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// For production: serve static files from dist
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send('Not built yet. Run `npm run build`.');
    }
  });
}

app.listen(PORT, () => {
  console.log(`Express API server running on http://localhost:${PORT}`);
}); 