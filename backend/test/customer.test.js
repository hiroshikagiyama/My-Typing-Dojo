const { expect } = require('chai');

const fixtures = require('../src/utils/fixtures');
const db = require('../src/knex');
const customerModel = require('../src/customer/customer.model');
const CUSTOMER_TABLE = customerModel.CUSTOMER_TABLE;

describe('customer', () => {
  let customerFixture;

  before(async () => {
    await db.migrate
      .forceFreeMigrationsLock()
      .then(() => db.migrate.rollback({ all: true }))
      .then(() => db.migrate.latest())
      .then(() => db.seed.run())
      .catch(console.error);

    await db
      .insert(fixtures.customer())
      .into(CUSTOMER_TABLE)
      .returning('*')
      .then((res) => (customerFixture = res[0]))
      .catch(console.error);
  });

  describe('all', () => {
    it('should return an array of customers', async () => {
      const customers = await customerModel.all();
      expect(customers).to.be.an.instanceof(Array);
    });

    it('should have expected props', async () => {
      const customers = await customerModel.all();

      customers.forEach((customer) => {
        expect(customer).to.exist;
        expect(customer).to.have.property('id');
        expect(customer).to.have.property('email');
        expect(customer).to.have.property('first_name');
        expect(customer).to.have.property('last_name');
        expect(customer).to.have.property('address');
        expect(customer).to.have.property('city');
        expect(customer).to.have.property('region');
        expect(customer).to.have.property('postal_code');
        expect(customer).to.have.property('country');
      });
    });

    it('should accept a limit argument', async () => {
      const customers = await customerModel.all(3);
      expect(customers.length).to.be.at.most(3);
    });
  });

  describe('find', () => {
    describe('when customer exists', () => {
      it('should get customer by id', async () => {
        const customer = await customerModel.find(customerFixture.id);

        expect(customer).to.exist;
        expect(customer).to.have.property('id');
        expect(customer).to.have.property('email');
        expect(customer).to.have.property('first_name');
        expect(customer).to.have.property('last_name');
        expect(customer).to.have.property('address');
        expect(customer).to.have.property('city');
        expect(customer).to.have.property('region');
        expect(customer).to.have.property('postal_code');
        expect(customer).to.have.property('country');

        expect(customer.id).to.equal(customerFixture.id);
        expect(customer.email).to.equal(customerFixture.email);
        expect(customer.first_name).to.equal(customerFixture.first_name);
        expect(customer.last_name).to.equal(customerFixture.last_name);
        expect(customer.address).to.equal(customerFixture.address);
        expect(customer.city).to.equal(customerFixture.city);
        expect(customer.region).to.equal(customerFixture.region);
        expect(customer.postal_code).to.equal(customerFixture.postal_code);
        expect(customer.country).to.equal(customerFixture.country);
      });
    });

    describe("when customer doesn't exist", () => {
      it('should return undefined', async () => {
        const customer = await customerModel.find(0);
        expect(customer).to.be.undefined;
      });
    });
  });

  describe('save', () => {
    it('should be able to create a new customer', async () => {
      const newCustomer = fixtures.customer();
      const customer = await customerModel.save(newCustomer);

      expect(customer).to.exist;
      expect(customer).to.have.property('id');
      expect(customer).to.have.property('email');
      expect(customer).to.have.property('first_name');
      expect(customer).to.have.property('last_name');
      expect(customer).to.have.property('address');
      expect(customer).to.have.property('city');
      expect(customer).to.have.property('region');
      expect(customer).to.have.property('postal_code');
      expect(customer).to.have.property('country');

      expect(customer.email).to.equal(newCustomer.email);
      expect(customer.first_name).to.equal(newCustomer.first_name);
      expect(customer.last_name).to.equal(newCustomer.last_name);
      expect(customer.address).to.equal(newCustomer.address);
      expect(customer.city).to.equal(newCustomer.city);
      expect(customer.region).to.equal(newCustomer.region);
      expect(customer.postal_code).to.equal(newCustomer.postal_code);
    });
  });

  describe('update', () => {
    it('should return with new customer data', async () => {
      const newData = { first_name: 'changed' };
      const customer = await customerModel.update(customerFixture.id, newData);

      expect(customer).to.have.property('id');
      expect(customer).to.have.property('email');
      expect(customer).to.have.property('first_name');
      expect(customer).to.have.property('last_name');
      expect(customer).to.have.property('address');
      expect(customer).to.have.property('city');
      expect(customer).to.have.property('region');
      expect(customer).to.have.property('postal_code');
      expect(customer).to.have.property('country');

      expect(customer.id).to.equal(customerFixture.id);
      expect(customer.first_name).to.equal(newData.first_name);
      expect(customer.email).to.equal(customerFixture.email);
      expect(customer.last_name).to.equal(customerFixture.last_name);
      expect(customer.address).to.equal(customerFixture.address);
      expect(customer.city).to.equal(customerFixture.city);
      expect(customer.region).to.equal(customerFixture.region);
      expect(customer.postal_code).to.equal(customerFixture.postal_code);
      expect(customer.country).to.equal(customerFixture.country);
    });
  });

  describe('delete', () => {
    it('should delete a customer by id', async () => {
      const deletedCustomer = await customerModel.delete(customerFixture.id);

      expect(deletedCustomer).to.have.property('id');
      expect(deletedCustomer).to.have.property('email');
      expect(deletedCustomer).to.have.property('first_name');
      expect(deletedCustomer).to.have.property('last_name');
      expect(deletedCustomer).to.have.property('address');
      expect(deletedCustomer).to.have.property('city');
      expect(deletedCustomer).to.have.property('region');
      expect(deletedCustomer).to.have.property('postal_code');
      expect(deletedCustomer).to.have.property('country');

      const customer = await customerModel.find(deletedCustomer.id);
      expect(customer).to.be.undefined;
    });
  });
});
