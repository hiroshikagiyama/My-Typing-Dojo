const db = require('../knex');

const TYPING_LOG_TABLE = 'typing_log';

module.exports = {
  TYPING_LOG_TABLE,

  async all() {
    return await db(TYPING_LOG_TABLE);
  },

  async find(id) {
    const [userTypingLog] = await db(TYPING_LOG_TABLE).where({ id });
    return userTypingLog || {};
  },

  async save(typingLog) {
    const [newTypingLog] = await db(TYPING_LOG_TABLE)
      .insert({
        sentence_id: typingLog.sentenceId,
        user_id: typingLog.userId,
        wpm: typingLog.wpm,
      })
      .returning('*');
    return newTypingLog;
  },
};
