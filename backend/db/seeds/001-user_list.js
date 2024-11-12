exports.seed = async function (knex) {
  await knex('user_list').del();
  await knex('user_list').insert(userList);
};

// initial data
const userList = [
  { id: 1, name: 'kagi', target_wpm: 50, target_date: '2024-12-30' },
  { id: 2, name: 'saya', target_wpm: 60, target_date: '2024-12-30' },
  { id: 3, name: 'ami', target_wpm: 50, target_date: '2024-12-30' },
  { id: 4, name: 'riku', target_wpm: 40, target_date: '2024-12-30' },
  { id: 5, name: 'hoge', target_wpm: 40, target_date: '2024-12-30' },
];
