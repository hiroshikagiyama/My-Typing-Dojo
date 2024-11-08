const db = require('../knex');

const ORDER_TABLE = 'order_info';
const ORDER_PRODUCT_TABLE = 'order_product';

module.exports = {
  ORDER_TABLE,
  /**
   * @param {number} limit - 注文の最大数（制限）
   * @return {Promise<Array>} - すべての注文データ
   */
  async all(limit = 100) {
    return await db(ORDER_TABLE).limit(limit);
    // return await db(ORDER_TABLE).select('*').limit(limit);
  },

  /**
   * @param {number} id - 注文 ID
   * @return {Promise<Object|undefined>} - id に合致する注文データ、不合致の場合は undefined
   */
  async find(id) {
    const result = await db(ORDER_TABLE)
      .select('*')
      .innerJoin('customer', 'customer.id', '=', 'ORDER_TABLE.customer_id');
    //   try {
    //     const [result] = await db('order_info')
    //       .select(
    //         'order_info.*',
    //         'customer.id as customer_id',
    //         'customer.first_name as customer_first_name',
    //         'customer.last_name as customer_last_name',
    //         'customer.country as customer_country',
    //         'order_product.quantity',
    //         'order_product.product_id'
    //       )
    //       .innerJoin('customer', 'customer.id', '=', 'order_info.customer_id')
    //       .leftOuterJoin(
    //         'order_product',
    //         'order_product.product_id',
    //         '=',
    //         'order_info.id'
    //       )
    //       .where({ 'order_info.id': id });
    //     const productData = await db('product')
    //       .select('id as product_id', 'name', 'sell_price')
    //       .where({ id: result.product_id });

    //     result.products = productData;
    //     if (!result || result.length === 0) {
    //       return undefined;
    //     } else {
    //       return result;
    //     }
    //   } catch (error) {
    //     return undefined;
    //   }
  },

  /**
   * @param {Object} payload - 作成する新規注文データ
   * @return {Promise<Object>} - 作成された新規注文のすべてのデータ
   */
  async save(payload) {
    try {
      const [resultOrderInfo] = await db(ORDER_TABLE)
        .insert({
          customer_id: payload.customer_id,
          date_ordered: payload.date_ordered,
          date_shipped: payload.date_shipped,
        })
        .returning('*');

      const orderProduct = payload.products.map((el) => ({
        ...el,
        order_id: resultOrderInfo.id,
      }));

      await db(ORDER_PRODUCT_TABLE).insert(orderProduct).returning('*');
      const result = await this.find(resultOrderInfo.id);
      return result;
    } catch (error) {
      console.log('error', error);
    }
  },

  /**
   * @param {number} id - 注文 ID
   * @param {Object} payload - 更新する注文データ
   * @return {Promise<Object>} - 更新された注文のすべてのデータ
   */
  async update(id, payload) {
    const [result] = await db(ORDER_TABLE)
      .update(payload)
      .where({ id })
      .returning('*');

    return result;
    // try {
    //   await db(ORDER_TABLE).update(payload).where({ id }).returning('*');
    //   const result = await this.find(id);
    //   return result;
    // } catch (error) {
    //   console.log('error', error);
    // }
  },

  /**
   * @param {number} id - 注文 ID
   * @return {Promise<Object>} - 削除された注文のすべてのデータ
   */
  async delete(id) {
    const [result] = await db(ORDER_TABLE).del().where({ id }).returning('*');
    return result;
    //   try {
    //     const result = await db(ORDER_TABLE).del().where({ id }).returning('*');
    //     return result[0];
    //   } catch (error) {
    //     console.log('error', error);
    //   }
  },
};
