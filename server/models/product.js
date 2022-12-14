//Product Model
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  pro_id: {
    type: String,
    required: true,
    unique:true
  },
  pro_cateId: {
    type: Schema.Types.ObjectId, ref: 'productCategory'
  },
  pro_name: {
    type: String,
    required: true
  },
  pro_img: {
    type: String
  },
  pro_price: {
    type: Number,
    required: true
  }
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;