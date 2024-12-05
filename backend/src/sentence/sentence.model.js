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

  async save(addSentence, addedTag, userId) {
    console.log('🚀🚀🚀🚀 modelの中--->> ', { addSentence, addedTag, userId });
    const [newSentenceList] = await db(SENTENCE_LIST_TABLE).insert({
      sentence: addSentence,
      tag: addedTag,
      add_user_id: userId,
    });
    return newSentenceList;
  },
};
