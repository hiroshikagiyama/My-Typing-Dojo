const userModel = require('./user.model');

module.exports = {
  async index(req, res) {
    const userId = Number(req.params.id);
    const user = await userModel.find(userId);

    res.send({ data: user });
  },

  async view(req, res) {
    const users = await userModel.all();

    res.send({ data: users });
  },
};
