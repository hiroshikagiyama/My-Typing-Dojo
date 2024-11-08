const orderModel = require('./order.model');

module.exports = {
  async index(req, res) {
    const orders = await orderModel.all();
    res.render(
      'pages/orders/index',
      {
        orders,
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
    const order = await orderModel.find(req.params.id);
    res.render(
      'pages/orders/view',
      {
        order,
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
      'pages/orders/new',
      {
        order: {
          products: [],
        },
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
      await orderModel.update(id, req.body);
    } else {
      await orderModel.save(req.body);
    }

    res.redirect('/orders');
  },

  async edit(req, res) {
    const order = await orderModel.find(req.params.id);
    res.render(
      'pages/orders/edit',
      {
        order,
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
    await orderModel.delete(id);
    res.redirect('/orders');
  },
};
