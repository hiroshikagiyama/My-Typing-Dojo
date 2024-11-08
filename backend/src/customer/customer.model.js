const db = require('../knex');

const CUSTOMER_TABLE = 'customer';

module.exports = {
  CUSTOMER_TABLE,

  /**
   * @param {number} limit - 顧客データの最大数（制限）
   * @return {Promise<Array>} - すべての顧客データ
   */
  async all(limit = 100) {
    // return await db.select('*').from(CUSTOMER_TABLE).limit(limit);
    return await db(CUSTOMER_TABLE).limit(limit);
  },

  /**
   * @param {number} id - 顧客の ID
   * @return {Promise<Object|undefined>} id に合致する顧客データ、不合致の場合は undefined
   */
  async find(id) {
    // return await db(CUSTOMER_TABLE).select('*').where({ id }).first();
    return await db(CUSTOMER_TABLE).where({ id }).first();
  },

  /**
   * @param {Object} payload - 作成する新規顧客データ
   * @return {Promise<Object>} - 作成された新規顧客のすべてのデータ
   */
  async save(payload) {
    const [result] = await db(CUSTOMER_TABLE).insert(payload).returning('*');
    return result;
    // try {
    //   const [result] = await db(CUSTOMER_TABLE).insert(payload).returning('*');
    //   return result;
    // } catch (error) {
    //   console.log('error', error);
    // }
  },

  /**
   * @param {number} id - 顧客の ID
   * @param {Object} payload - 更新する顧客データ
   * @return {Promise<Object>} - 更新された顧客のすべてのデータ
   */
  async update(id, payload) {
    const [result] = await db(CUSTOMER_TABLE)
      .update(payload)
      .where({ id })
      .returning('*');

    return result;
    // try {
    //   const result = await db(CUSTOMER_TABLE)
    //     .update(payload)
    //     .where({ id })
    //     .returning('*');
    //   return result[0];
    // } catch (error) {
    //   console.log('error', error);
    // }
  },

  /**
   * @param {number} id - 顧客の ID
   * @return {Promise<Object>} - 削除された顧客のすべてのデータ
   */
  async delete(id) {
    const [result] = await db(CUSTOMER_TABLE)
      .delete()
      .where({ id })
      .returning('*');

    return result;
    // try {
    //   const result = await db(CUSTOMER_TABLE)
    //     .del()
    //     .where({ id })
    //     .returning('*');
    //   return result[0];
    // } catch (error) {
    //   console.log('error', error);
    // }
  },
};
