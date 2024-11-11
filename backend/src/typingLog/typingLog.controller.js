const typingLogModel = require('./typingLog.model');

module.exports = {
  async index(req, res) {
    const userId = req.params.id;
    const userTypingLog = await typingLogModel.find(userId);

    res.send({ data: userTypingLog });
  },

  async view(req, res) {
    const allUserTypingLog = await typingLogModel.all();

    res.send({ data: allUserTypingLog });
  },

  async add(req, res) {
    const newTypingLog = req.body.text;
    const addTypingLog = await typingLogModel.save(newTypingLog);
    res.send(addTypingLog);
  },
};
