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
};
