const chai = require('chai');
const chaiHttp = require('chai-http');
const { setupServer } = require('../src/server.js');

const app = setupServer();
const expect = chai.expect;
chai.use(chaiHttp);

describe('GET /api/users', () => {
  let request;

  before(() => {
    request = chai.request(app).keepOpen();
  });

  after(() => {
    request.close();
  });

  it('should return status 200.', async () => {
    const response = await request.get('/api/users');
    expect(response).to.have.status(200);
  });

  it('should return array of wpm.', async () => {
    const response = await request.get('/api/users');
    const { data } = JSON.parse(response.text);
    console.log(data);
    expect(data).to.be.an.instanceOf(Array);
  });

  it('should have expected props', async () => {
    const response = await request.get('/api/users');
    const { data } = JSON.parse(response.text);

    data.forEach((user) => {
      expect(user).to.have.property('id');
      expect(user).to.have.property('name');
      expect(user).to.have.property('target_wpm');
      expect(user).to.have.property('target_date');
    });
  });
});
