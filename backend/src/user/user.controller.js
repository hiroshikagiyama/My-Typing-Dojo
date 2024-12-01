const userModel = require('./user.model');

module.exports = {
  async index(req, res) {
    const userName = req.params.name;
    const user = await userModel.find(userName);
    res.send({ data: user });
  },

  async view(req, res) {
    const users = await userModel.all();
    res.send({ data: users });
  },

  async search(req, res) {
    const { username, password } = req.body.text;
    if (!username || !password) {
      res.status(400).json({
        message: 'usernameとpasswordが必要です',
      });
    } else {
      // usernameの重複check
      const isLogin = await userModel.login(username, password);
      if (!isLogin) {
        res.status(401).json({
          message: 'ログインが失敗しました',
        });
      } else {
        res.json({
          message: 'ログインが完了しました',
        });
      }
    }
  },

  async save(req, res) {
    const { username, password } = req.body.text;
    if (!username || !password) {
      res.status(400).json({
        message: 'usernameとpasswordが必要です',
      });
    } else {
      // usernameの重複check
      const foundUserName = await userModel.find(username);
      if (foundUserName.id) {
        res.status(400).json({
          message: '既に利用されているusernameです',
        });
      } else {
        const newUserName = await userModel.signup(username, password);
        res.json({
          message: 'サインアップが完了しました',
          username: newUserName,
        });
      }
    }
  },
};
