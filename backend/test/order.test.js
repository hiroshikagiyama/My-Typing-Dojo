const { expect } = require('chai');

const fixtures = require('../src/utils/fixtures');
const db = require('../src/knex');
const orderModel = require('../src/order/order.model');
const ORDER_TABLE = orderModel.ORDER_TABLE;

describe('order', () => {
  let orderFixture;

  before(async () => {
    await db.migrate
      .forceFreeMigrationsLock()
      .then(() => db.migrate.rollback({ all: true }))
      .then(() => db.migrate.latest())
      .then(() => db.seed.run())
      .catch(console.error);

    await db
      .insert(fixtures.orderInfo())
      .into(ORDER_TABLE)
      .returning('*')
      .then((res) => (orderFixture = res[0]))
      .catch(console.error);

    await db
      .insert(fixtures.orderProduct())
      .into('order_product')
      .catch(console.error);
  });

  describe('all', () => {
    it('should return an array of orders', async () => {
      const orders = await orderModel.all();
      expect(orders).to.be.an.instanceof(Array);
    });

    it('should have expected props', async () => {
      const orders = await orderModel.all();

      orders.forEach((order) => {
        expect(order).to.exist;
        expect(order).to.have.property('id');
        expect(order).to.have.property('customer_id');
        expect(order).to.have.property('date_shipped');
        expect(order).to.have.property('date_ordered');
      });
    });

    it('should accept a limit argument', async () => {
      const orders = await orderModel.all(3);
      expect(orders.length).to.be.at.most(3);
    });
  });

  describe('find', () => {
    describe('when order exists', () => {
      it('should get order by id', async () => {
        const order = await orderModel.find(orderFixture.id);

        expect(order).to.exist;
        expect(order).to.have.property('id');
        expect(order).to.have.property('date_ordered');
        expect(order).to.have.property('date_shipped');
        expect(order).to.have.property('customer_id');
        expect(order).to.have.property('customer_first_name');
        expect(order).to.have.property('customer_last_name');
        expect(order).to.have.property('customer_country');
        expect(order).to.have.property('products');

        order.products.forEach((product) => {
          expect(product).to.have.property('product_id');
          expect(product).to.have.property('name');
          expect(product).to.have.property('sell_price');
          expect(product).to.have.property('quantity');
        });
      });
    });

    describe("when order doesn't exist", () => {
      it('should return undefined', async () => {
        const order = await orderModel.find(0);
        expect(order).to.be.undefined;
      });
    });
  });

  describe('save', () => {
    it('should be able to create a new order', async () => {
      const newOrder = fixtures.newOrder();
      const order = await orderModel.save(newOrder);

      expect(order).to.exist;
      expect(order).to.have.property('id');
      expect(order).to.have.property('customer_id');
      expect(order).to.have.property('date_ordered');
      expect(order).to.have.property('products');

      order.products.forEach((product) => {
        expect(product).to.have.property('product_id');
        expect(product).to.have.property('order_id');
        expect(product).to.have.property('quantity');
      });
    });
  });

  describe('update', () => {
    it('should return with new order data', async () => {
      const newData = { date_shipped: new Date() };
      const order = await orderModel.update(orderFixture.id, newData);

      expect(order).to.have.property('id');
      expect(order).to.have.property('customer_id');
      expect(order).to.have.property('date_ordered');
      expect(order).to.have.property('date_shipped');
      expect(order).to.have.property('products');

      expect(order.products).to.be.an.instanceof(Array);
      order.products.forEach((product) => {
        expect(product).to.have.property('product_id');
        expect(product).to.have.property('order_id');
        expect(product).to.have.property('quantity');
      });

      expect(order.id).to.equal(orderFixture.id);
      expect(order.customer_id).to.equal(orderFixture.customer_id);
      expect(order.date_ordered.toLocaleDateString()).to.equal(
        orderFixture.date_ordered.toLocaleDateString()
      );
      expect(order.date_shipped.toLocaleDateString()).to.equal(
        orderFixture.date_shipped.toLocaleDateString()
      );
    });
  });

  describe('delete', () => {
    it('should delete a order by id', async () => {
      const deletedOrder = await orderModel.delete(orderFixture.id);

      expect(deletedOrder).to.have.property('id');
      expect(deletedOrder).to.have.property('customer_id');
      expect(deletedOrder).to.have.property('date_ordered');
      expect(deletedOrder).to.have.property('date_shipped');

      const order = await orderModel.find(deletedOrder.id);
      expect(order).to.be.undefined;
    });
  });
});
