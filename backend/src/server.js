require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const userController = require('./user/user.controller');
const sentenceController = require('./sentence/sentence.controller');
const typingLogController = require('./typingLog/typingLog.controller');
const userModel = require('./user/user.model');
const path = require('path');

const ORIGIN_URL = process.env.ORIGIN_URL || process.env.VITE_LOCALHOST;

function setupServer() {
  const app = express();
  app.use(express.json());
  // アプリ起動時の参照先
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // cors設定
  app.use(
    cors({
      origin: ORIGIN_URL, //アクセス許可するオリジン
      credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
      optionsSuccessStatus: 200, //レスポンスstatusを200に設定
    })
  );

  // 認証機能 ====================================================
  // セッション設定 express-session
  app.set('trust proxy', true); // Renderでsession idが保存されないので設定
  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 有効期限設定 1日
        secure: process.env.NODE_ENV === 'production', // true->httpsのみを許可、localはhttpなので切り替え
        httpOnly: true, // javascriptからのアクセスを防ぐ
      },
    })
  );

  // passport session
  app.use(passport.initialize());
  app.use(passport.session());

  // LocalStrategy(ユーザー名・パスワードでの認証)の設定
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await userModel.find(username);
      if (user.hashed_password === undefined) {
        // ユーザーが見つからない場合
        return done(null, false);
      }
      // ハッシュ化したPWの突き合わせ。入力されたpasswordから、DBに保存されたハッシュ値を比較する
      const match = await bcrypt.compare(password, user.hashed_password);
      if (match) {
        return done(null, user); // ログイン成功
      } else {
        return done(null, false); // ログイン失敗
      }
    })
  );

  // 認証に成功した時にsessionにusernameを保存するための記述
  passport.serializeUser((user, done) => done(null, user.username));
  // sessionからuserを取り出して検証するための記述
  passport.deserializeUser(async (username, done) => {
    const user = await userModel.find(username);
    done(null, user);
  });

  // 認証状態を確認するミドルウエア
  function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
      return next(); // 認証済みの場合、次のミドルウェアへ
    }
    res.status(401).json({ message: 'ログインが必要です' });
  }

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
        return res.json({ message: `ログイン成功！ Hello, ${user.username}` });
      });
    })(req, res);
  });

  // サインアップ
  app.post('/signup', userController.save);

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

  // エンドポイントの説明
  app.get('/', (req, res) => {
    res.json({
      endpoints: {
        '/users': 'ユーザー一覧',
        '/login?username=<username>&password=<password>': 'ログイン',
        '/signup?username=<username>&password=<password>': 'サインアップ',
        '/logout': 'ログアウト',
      },
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

  app.get('/api/sentence/:tag', checkAuth, sentenceController.tag);
  app.get('/api/sentence', checkAuth, sentenceController.view);

  return app;
}

module.exports = {
  setupServer,
};
