const sentenceModel = require('./sentence.model');

module.exports = {
  async tag(req, res) {
    const tagName = req.params.tag;
    const sentenceList = await sentenceModel.find(tagName);

    res.send({ data: sentenceList });
  },

  async view(req, res) {
    const sentenceList = await sentenceModel.all();

    res.send({ data: sentenceList });
  },
};
