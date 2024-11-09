const db = require('../knex');

const SENTENCE_LIST_TABLE = 'sentence_list';

module.exports = {
  SENTENCE_LIST_TABLE,

  async all() {
    return await db(SENTENCE_LIST_TABLE);
  },

  async find(tag) {
    const [sentenceList] = await db(SENTENCE_LIST_TABLE).where({ tag });
    return sentenceList || {};
  },
};
