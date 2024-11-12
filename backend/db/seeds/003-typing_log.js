/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('typing_log').del();
  await knex('typing_log').insert(typingLog);
};

// initial data
const typingLog = [
  {
    id: 1,
    sentence_id: 1,
    user_id: 1,
    wpm: 30,
    date: '2024-11-08',
  },
];
