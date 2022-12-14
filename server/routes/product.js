//Product API
const express = require('express');
const jwt = require('jsonwebtoken');
const Product = require('../models/product');

const router = express.Router();

router.get('/', (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      res.status(400).json({ message: 'Something went wrong' });
    } else {
      res.status(200).json({ products });
    }
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Product.findById(id, (err, product) => {
    if (err) {
      res.status(400).json({ message: 'Something went wrong' });
    } else {
      res.status(200).json({ product });
    }
  });
});

router.post('/', (req, res) => {
  const { pro_cateId, pro_name, pro_img, pro_price } = req.body;
  const pro_id = 'P' + Math.floor(Math.random() * 1000000);
  const newProduct = new Product({
    pro_id,
    pro_cateId,
    pro_name,
    pro_img,
    pro_price
  });
  newProduct.save((err, product) => {
    if (err) {
      res.status(400).json({ message: 'Something went wrong' });
    } else {
      res.status(200).json({ message: 'Product added successfully' });
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { pro_cateId, pro_name, pro_img, pro_price } = req.body;
  Product.findById(id, (err, product) => {
    if (err) {
      res.status(400).json({ message: 'Something went wrong' });
    } else {
      if (product) {
        product.pro_cateId = pro_cateId;
        product.pro_name = pro_name;
        product.pro_img = pro_img;
        product.pro_price = pro_price;
        product.save((err, product) => {
          if (err) {
            res.status(400).json({ message: 'Something went wrong' });
          } else {
            res.status(200).json({ message: 'Product updated successfully' });
          }
        });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    }
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id, (err, product) => {
    if (err) {
      res.status(400).json({ message: 'Something went wrong' });
    } else {
      if (product) {
        res.status(200).json({ message: 'Product deleted successfully' });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    }
  });
});

module.exports = router;