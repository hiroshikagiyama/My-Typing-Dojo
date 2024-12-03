const authModel = require('./auth.model');
const passport = require('passport');

module.exports = {
  async login(req, res) {
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
  },
};
