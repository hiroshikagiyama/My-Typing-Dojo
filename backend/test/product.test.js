const { expect } = require('chai');

const fixtures = require('../src/utils/fixtures');
const db = require('../src/knex');
const productModel = require('../src/product/product.model');
const PRODUCT_TABLE = productModel.PRODUCT_TABLE;

describe('product', () => {
  let productFixture;

  before(async () => {
    await db.migrate
      .forceFreeMigrationsLock()
      .then(() => db.migrate.rollback({ all: true }))
      .then(() => db.migrate.latest())
      .then(() => db.seed.run())
      .catch(console.error);

    await db
      .insert(fixtures.product())
      .into(PRODUCT_TABLE)
      .returning('*')
      .then((res) => (productFixture = res[0]))
      .catch(console.error);
  });

  describe('all', () => {
    it('should return an array of products', async () => {
      const products = await productModel.all();
      expect(products).to.be.an.instanceof(Array);
    });

    it('should have expected props', async () => {
      const products = await productModel.all();

      products.forEach((product) => {
        expect(product).to.exist;
        expect(product).to.have.property('id');
        expect(product).to.have.property('name');
        expect(product).to.have.property('stock');
        expect(product).to.have.property('cost_price');
        expect(product).to.have.property('sell_price');
      });
    });

    it('should accept a limit argument', async () => {
      const products = await productModel.all(3);
      expect(products.length).to.be.at.most(3);
    });
  });

  describe('find', () => {
    describe('when product exists', () => {
      it('should get product by id', async () => {
        const product = await productModel.find(productFixture.id);

        expect(product).to.exist;
        expect(product).to.have.property('id');
        expect(product).to.have.property('name');
        expect(product).to.have.property('stock');
        expect(product).to.have.property('cost_price');
        expect(product).to.have.property('sell_price');

        expect(product.id).to.equal(productFixture.id);
        expect(product.name).to.equal(productFixture.name);
        expect(product.stock).to.equal(productFixture.stock);
        expect(product.cost_price).to.equal(productFixture.cost_price);
        expect(product.sell_price).to.equal(productFixture.sell_price);
      });
    });

    describe("when product doesn't exist", () => {
      it('should return undefined', async () => {
        const product = await productModel.find(0);
        expect(product).to.be.undefined;
      });
    });
  });

  describe('save', () => {
    it('should be able to create a new product', async () => {
      const newProduct = fixtures.product();
      const product = await productModel.save(newProduct);

      expect(product).to.exist;
      expect(product).to.have.property('id');
      expect(product).to.have.property('name');
      expect(product).to.have.property('stock');
      expect(product).to.have.property('cost_price');
      expect(product).to.have.property('sell_price');

      expect(product.name).to.equal(newProduct.name);
      expect(product.stock).to.equal(newProduct.stock);
      expect(parseFloat(product.cost_price)).to.equal(
        parseFloat(newProduct.cost_price)
      );
      expect(parseFloat(product.sell_price)).to.equal(
        parseFloat(newProduct.sell_price)
      );
    });
  });

  describe('update', () => {
    it('should return with new product data', async () => {
      const newData = { name: 'changed' };
      const product = await productModel.update(productFixture.id, newData);

      expect(product).to.have.property('id');
      expect(product).to.have.property('name');
      expect(product).to.have.property('cost_price');
      expect(product).to.have.property('sell_price');
      expect(product).to.have.property('stock');

      expect(product.id).to.equal(productFixture.id);
      expect(product.name).to.equal(newData.name);
      expect(parseFloat(product.cost_price)).to.equal(
        parseFloat(productFixture.cost_price)
      );
      expect(parseFloat(product.sell_price)).to.equal(
        parseFloat(productFixture.sell_price)
      );
      expect(product.stock).to.equal(productFixture.stock);
    });
  });

  describe('delete', () => {
    it('should delete a product by id', async () => {
      const deletedProduct = await productModel.delete(productFixture.id);

      expect(deletedProduct).to.have.property('id');
      expect(deletedProduct).to.have.property('name');
      expect(deletedProduct).to.have.property('stock');
      expect(deletedProduct).to.have.property('cost_price');
      expect(deletedProduct).to.have.property('sell_price');

      const product = await productModel.find(deletedProduct.id);
      expect(product).to.be.undefined;
    });
  });
});
