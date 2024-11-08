const customerModel = require('./customer.model');

module.exports = {
  async index(req, res) {
    const customers = await customerModel.all();
    res.render(
      'pages/customers/index',
      {
        customers,
      },
      (err, html) => {
        if (err) {
          res.status(500).redirect('/error');
        } else {
          res.send(html);
        }
      }
    );
  },

  async view(req, res) {
    const customer = await customerModel.find(req.params.id);
    res.render(
      'pages/customers/view',
      {
        customer,
      },
      (err, html) => {
        if (err) {
          res.status(500).redirect('/error');
        } else {
          res.send(html);
        }
      }
    );
  },

  new(req, res) {
    res.render(
      'pages/customers/new',
      {
        customer: {},
      },
      (err, html) => {
        if (err) {
          res.status(500).redirect('/error');
        } else {
          res.send(html);
        }
      }
    );
  },

  async save(req, res) {
    const { id } = req.body;

    if (id) {
      await customerModel.update(id, req.body);
    } else {
      await customerModel.save(req.body);
    }

    res.redirect('/customers');
  },

  async edit(req, res) {
    const customer = await customerModel.find(req.params.id);
    res.render(
      'pages/customers/edit',
      {
        customer,
      },
      (err, html) => {
        if (err) {
          res.status(500).redirect('/error');
        } else {
          res.send(html);
        }
      }
    );
  },

  async delete(req, res) {
    const { id } = req.body;
    const customer = await customerModel.delete(id);
    res.render(
      'pages/customers/edit',
      {
        customer,
      },
      (err, html) => {
        if (err) {
          res.status(500).redirect('/error');
        } else {
          res.redirect('/customers');
        }
      }
    );
    // await customerModel.delete(id);
    // res.redirect('/customers');
  },
};
