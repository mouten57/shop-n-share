const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  product: String,
  qty: Number,
  unit: String,
  price: String,
  notes: String,
  dateAdded: String,
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('items', itemSchema);
