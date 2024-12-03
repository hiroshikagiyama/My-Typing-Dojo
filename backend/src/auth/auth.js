require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const cors = require('cors');
const userModel = require('../user/user.model');

const ORIGIN_URL = process.env.ORIGIN_URL || process.env.VITE_LOCALHOST;

function setAuth(app) {
  // cors設定
  app.use(
    cors({
      origin: ORIGIN_URL, //アクセス許可するオリジン
      credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
      optionsSuccessStatus: 200, //レスポンスstatusを200に設定
    })
  );

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
}

// 認証状態を確認するミドルウエア
function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // 認証済みの場合、次のミドルウェアへ
  }
  res.status(401).json({ message: 'ログインが必要です' });
}

module.exports = { setAuth, checkAuth };
