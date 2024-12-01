const db = require('../knex');
const bcrypt = require('bcrypt');

const USER_LIST_TABLE = 'user_list';

module.exports = {
  USER_LIST_TABLE,

  async all() {
    return db(USER_LIST_TABLE);
  },

  async find(username) {
    const [foundUser] = await db(USER_LIST_TABLE).where({ username });
    return foundUser || {};
  },

  async signup(username, email, password) {
    const [newUsername] = await db(USER_LIST_TABLE)
      .insert({
        username,
        email,
        hashed_password: bcrypt.hashSync(password, 10),
      })
      .returning('username');
    return newUsername;
  },

  async login(username, password) {
    const userData = this.find(username);
    if (!userData.id) {
      return false;
    } else {
      // パスワードのハッシュ化
      const { hashedPassword } = createHash(userData.salt, password);
      // パスワードチェック
      return userData.hashedPassword === hashedPassword;
    }
  },
};
