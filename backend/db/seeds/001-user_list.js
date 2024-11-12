exports.seed = async function (knex) {
  await knex('user_list').del();
  await knex('user_list').insert(userList);
};

// initial data
const userList = [
  { id: 1, name: 'hoge', target_wpm: 50, target_date: '2024-12-30' },
  { id: 2, name: 'moge', target_wpm: 60, target_date: '2024-12-30' },
];
