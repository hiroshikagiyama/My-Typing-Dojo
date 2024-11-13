const db = require('../knex');
const crypto = require('crypto');

const USER_LIST_TABLE = 'user_list';

module.exports = {
  USER_LIST_TABLE,

  async all() {
    return await db(USER_LIST_TABLE);
  },

  async find(username) {
    const [foundUser] = await db(USER_LIST_TABLE).where({ username });
    return foundUser || {};
  },

  async add(username, password) {
    // salt 作成
    const salt = crypto.randomBytes(6).toString('hex');
    // saltをpasswordに付け加える
    const saltAndPassword = `${salt}${password}`;
    // sha256 を使ってハッシュオブジェクトを作る
    const hash = crypto.createHash('sha256');
    // ハッシュ化したパスワードを取り出し
    const hashedPassword = hash.update(saltAndPassword).digest('hex');

    const [newUsername] = await db(USER_LIST_TABLE)
      .insert({
        username,
        salt,
        hashed_password: hashedPassword,
      })
      .returning('username');
    console.log('newUsername: ', newUsername);

    return newUsername;
  },
};
