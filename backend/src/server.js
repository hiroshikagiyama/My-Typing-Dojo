const userController = require('./user/user.controller');
const sentenceController = require('./sentence/sentence.controller');
const typingLogController = require('./typingLog/typingLog.controller');
const cors = require('cors');
const express = require('express');

const url =
  process.env.NODE_ENV === undefined
    ? 'http://localhost:5173'
    : 'https://my-typing-dojo.onrender.com/';

console.log('process.env.NODE_ENV ---> ', process.env.NODE_ENV);

function setupServer() {
  const app = express();
  app.use(express.static(__dirname + '/public'));
  console.log('static dir: ', __dirname + '/public');
  // cors許可の設定 参考：https://zenn.dev/luvmini511/articles/d8b2322e95ff40
  app.use(
    cors({
      origin: url, //アクセス許可するオリジン
      credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
      optionsSuccessStatus: 200, //レスポンスstatusを200に設定
    })
  );

  app.use(express.json());

  app.post('/api/record', typingLogController.add);
  app.get('/api/record/:id', typingLogController.index);
  app.get('/api/record', typingLogController.view);

  app.get('/api/users/:name', userController.index);
  app.get('/api/users', userController.view);

  app.get('/api/sentence/:tag', sentenceController.tag);
  app.get('/api/sentence', sentenceController.view);

  return app;
}

module.exports = {
  setupServer,
};
