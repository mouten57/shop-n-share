const mongoose = require('mongoose');
const Item = mongoose.model('items');
const convertTimeStamp = require('../helpers/convertTimeStamp');

module.exports = {
  async getAllItems(callback) {
    try {
      const items = await Item.find({});
      callback(null, items);
    } catch (err) {
      res.status(422).send(err);
    }
  },
  async getItem(id, callback) {
    const item = await Item.find({ _id: id });
    try {
      callback(null, item);
    } catch (err) {
      callback(err);
    }
  },
  async createItem(newItem, callback) {
    const { product, qty, unit, price, notes, _user } = newItem;
    const item = new Item({
      product,
      qty,
      unit,
      price,
      notes,
      _user,
      dateAdded: convertTimeStamp(Date.now())
    });
    try {
      const savedItem = await item.save();
      callback(null, savedItem);
    } catch (err) {
      callback(err);
    }
  },
  async updateItem(req, updatedItem, callback) {
    const item = await Item.findOne({ _id: req.params.id });
    const { product, qty, unit, price, notes } = updatedItem;
    (item.product = product),
      (item.qty = qty),
      (item.unit = unit),
      (item.price = price),
      (item.notes = notes);
    try {
      item.save();
      callback(null, item);
    } catch (err) {
      callback(err);
    }
  },
  async deleteItem(id, callback) {
    const result = await Item.deleteOne({ _id: id });
    try {
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  }
};
