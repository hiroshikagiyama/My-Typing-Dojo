const express = require('express');

const passport = require('passport');

const userController = require('./user/user.controller');
const sentenceController = require('./sentence/sentence.controller');
const typingLogController = require('./typingLog/typingLog.controller');
const path = require('path');

const { setAuth, checkAuth } = require('./auth/auth');

function setupServer() {
  const app = express();
  app.use(express.json());
  // アプリ起動時の参照先
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  setAuth(app);

  // ログインエンドポイント
  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: 'usernameとpasswordが必要です',
      });
    }

    // 最初に設定したLocalStrategy(ユーザー名とパスワードでの認証)を使ってログイン
    passport.authenticate('local', (err, user) => {
      if (!user) return res.status(401).json({ message: 'ログイン失敗！' });

      // sessionにログイン情報を格納
      req.logIn(user, () => {
        return res.json({
          message: 'ログイン成功！ Hello,',
          loginUser: { username: user.username, userId: user.id },
        });
      });
    })(req, res);
  });

  // サインアップ
  app.post('/api/signup', userController.save);

  // ログアウトエンドポイント
  app.get('/api/logout', (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err); // エラーハンドリングを適切に行う
      }

      req.session.destroy((err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: 'セッション削除に失敗しました' });
        }
        res.clearCookie('connect.sid', {
          secure: process.env.NODE_ENV === 'production',
          httpOnly: true,
        });

        return res.json({ message: 'ログアウト成功' });
      });
    });
  });

  // 認証状態を確認するためのエンドポイント
  app.get('/api/auth_check', (req, res) => {
    // isAuthenticated() は認証状態をtrue,falseで返すメソッド
    if (req.isAuthenticated()) {
      res.json({ authenticated: true, user: req.user });
    } else {
      res.json({ authenticated: false });
    }
  });

  // ===========================================================
  app.post('/api/record', checkAuth, typingLogController.add);
  app.get('/api/record/:id', checkAuth, typingLogController.index);
  app.get('/api/record', checkAuth, typingLogController.view);

  app.get('/api/users/:name', checkAuth, userController.index);
  app.get('/api/users', checkAuth, userController.view);

  app.get('/api/sentence/:tag', sentenceController.tag);
  app.get('/api/sentence', sentenceController.view);

  return app;
}

module.exports = {
  setupServer,
};
