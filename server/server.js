
//server.js
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middlewares/auth');
const userRoute =require('./routes/user');
const productRoute =require('./routes/product');
const productCategoryRoute =require('./routes/productCategory');

mongoose.set('strictQuery', false);
const app = express();
app.use(express.json());
//User Auth Routes
app.use('/api/user', userRoute);

//Product Category Routes
app.use('/api/product-category', authMiddleware, productCategoryRoute);

//Product Routes
app.use('/api/product', authMiddleware, productRoute);

//Error Handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});


//Connect to DB
try{
  mongoose.connect('mongodb://localhost/open-innovation-labs-lisha', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  		console.log("Connected to database successfully")
  
} catch (err){
  	console.log(err);
		console.log("Could not connect database!");
}

//Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server running on port ' + port));

