const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve index.html on root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'public', 'index.html'));
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Frontend server running on http://localhost:${PORT}`);
});
