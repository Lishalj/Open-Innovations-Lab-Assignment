//Product Category Model
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductCategorySchema = new Schema({

  pro_cate_id: { type: String, ref: 'product' },
  pro_cate_name: {
    type: String,
    required: true
  }
});

const ProductCategory = mongoose.model('productCategory', ProductCategorySchema);

module.exports = ProductCategory;