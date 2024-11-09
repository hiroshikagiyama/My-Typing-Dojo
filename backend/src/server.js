const userController = require('./user/user.controller');

const express = require('express');

function setupServer() {
  const app = express();
  app.use(express.json());

  app.get('/api/users', userController.view);

  return app;
}

module.exports = {
  setupServer,
};
