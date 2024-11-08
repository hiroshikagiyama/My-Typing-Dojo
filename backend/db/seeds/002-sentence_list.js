exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('sentence_list').del();
  await knex('sentence_list').insert(sentenceList);
};

// initial data
const sentenceList = [
  {
    id: 1,
    sentence: 'console.log() console.table()',
    tag: 'console',
    add_user_id: 1,
  },
  {
    id: 2,
    sentence: 'await async request response then try catch error',
    tag: 'javascript',
    add_user_id: 1,
  },
];
