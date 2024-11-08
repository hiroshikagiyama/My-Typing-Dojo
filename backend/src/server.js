const express = require('express');

function setupServer() {
  const app = express();
  app.use(express.json());

  app.get('/api/sentence', (req, res) => {
    res.send('first response!');
  });

  return app;
}

module.exports = {
  setupServer,
};
