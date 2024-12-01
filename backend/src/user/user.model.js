const db = require('../knex');
const crypto = require('crypto');

const USER_LIST_TABLE = 'user_list';

function createSalt() {
  // salt 作成
  return crypto.randomBytes(6).toString('hex');
}

function createHash(salt, password) {
  // saltをpasswordに付け加える
  const saltAndPassword = `${salt}${password}`;
  // sha256 を使ってハッシュオブジェクトを作る
  const hash = crypto.createHash('sha256');
  // ハッシュ化したパスワードを取り出し
  const hashedPassword = hash.update(saltAndPassword).digest('hex');
  return { salt, hashedPassword };
}

function checkPassWord(username, password) {}

module.exports = {
  USER_LIST_TABLE,

  async all() {
    return await db(USER_LIST_TABLE);
  },

  async find(username) {
    const [foundUser] = await db(USER_LIST_TABLE).where({ username });
    return foundUser || {};
  },

  async signup(username, password) {
    const salt = createSalt();
    const { hashedPassword } = createHash(salt, password);
    const [newUsername] = await db(USER_LIST_TABLE)
      .insert({
        username,
        salt,
        hashed_password: hashedPassword,
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
