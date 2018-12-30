const itemQueries = require('../db/queries.items');

module.exports = {
  index(req, res, next) {
    itemQueries.getAllItems((err, items) => {
      if (err) throw err;
      res.send(items);
    });
  },
  create(req, res, next) {
    let newItem = {
      product: req.body.product,
      qty: req.body.qty,
      unit: req.body.unit,
      price: req.body.price,
      notes: req.body.notes,
      _user: req.user.id
    };
    itemQueries.createItem(newItem, (err, item) => {
      if (err) throw err;
      res.send(item);
    });
  },
  destroy(req, res, next) {
    itemQueries.deleteItem(req.params.id, (err, item) => {
      if (err) throw err;
      res.send(item);
    });
  },
  edit(req, res, next) {
    itemQueries.getItem(req.params.id, (err, item) => {
      if (err) throw err;
      res.send(item);
    });
  },
  update(req, res, next) {
    itemQueries.updateItem(req, req.body, (err, item) => {
      if (err) throw err;
      res.send(item);
    });
  }
};
