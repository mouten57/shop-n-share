const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = require('./User');

const itemSchema = new Schema({
  product: String,
  qty: Number,
  unit: String,
  price: String,
  notes: String,
  dateAdded: String,
  _user: userSchema,
  purchased: Boolean
});

mongoose.model('items', itemSchema);
