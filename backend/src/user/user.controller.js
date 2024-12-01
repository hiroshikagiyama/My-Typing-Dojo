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

  async save(req, res) {
    const { username, email, password } = req.body.text;
    if (!username || !email || !password) {
      res.status(400).json({
        message: 'usernameとemailとpasswordが必要です',
      });
    } else {
      // usernameの重複check
      const foundUserName = await userModel.find(username);
      if (foundUserName.id) {
        res.status(400).json({
          message: '既に利用されているusernameです',
        });
      } else {
        const newUserName = await userModel.signup(username, email, password);
        res.json({
          message: 'サインアップが完了しました',
          username: newUserName,
        });
      }
    }
  },
};
