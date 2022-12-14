//Product Category API
const express = require('express');
const jwt = require('jsonwebtoken');
const ProductCategory = require('../models/productCategory');

const router = express.Router();

router.get('/', (req, res) => {
  ProductCategory.find({}, (err, productCategories) => {
    if (err) {
      res.status(400).json({ message: 'Something went wrong' });
    } else {
      res.status(200).json({ productCategories });
    }
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  ProductCategory.findById(id, (err, productCategory) => {
    if (err) {
      res.status(400).json({ message: 'Something went wrong' });
    } else {
      res.status(200).json({ productCategory });
    }
  });
});

router.post('/', (req, res) => {
  const { pro_cate_name } = req.body;
  const pro_cate_id = 'PC' + Math.floor(Math.random() * 1000000);
  const newProductCategory = new ProductCategory({
    pro_cate_id,
    pro_cate_name
  });
  newProductCategory.save((err, productCategory) => {
    if (err) {
      res.status(400).json({ message: 'Something went wrong' });
    } else {
      res.status(200).json({ message: 'Product category added successfully' });
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { pro_cate_name } = req.body;
  ProductCategory.findById(id, (err, productCategory) => {
    if (err) {
      res.status(400).json({ message: 'Something went wrong' });
    } else {
      if (productCategory) {
        productCategory.pro_cate_name = pro_cate_name;
        productCategory.save((err, productCategory) => {
          if (err) {
            res.status(400).json({ message: 'Something went wrong' });
          } else {
            res
              .status(200)
              .json({ message: 'Product category updated successfully' });
          }
        });
      } else {
        res.status(404).json({ message: 'Product category not found' });
      }
    }
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  ProductCategory.findByIdAndDelete(id, (err, productCategory) => {
    if (err) {
      res.status(400).json({ message: 'Something went wrong' });
    } else {
      if (productCategory) {
        res
          .status(200)
          .json({ message: 'Product category deleted successfully' });
      } else {
        res.status(404).json({ message: 'Product category not found' });
      }
    }
  });
});

module.exports = router;
