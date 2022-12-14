const express = require('express');
const jwt = require('jsonwebtoken');
const {User} = require('../models/user');
const authenticate = require('../middlewares/auth')
const Joi = require("joi");
const bcrypt = require('bcrypt')
const router = express.Router();


router.post('/login', (req, res) => {
  try{
   
  const { email, password } = req.body;

  User.findOne({ email }, (error, user) => {
    if (error) {
      res.status(400).json({ message: 'Something went wrong' });
    } else {
      if (user) {
        
        bcrypt.compare(password, user.password, (err, result) => {
          if(result) {
            const token = jwt.sign({ email }, 'secret');
            user.token = token;
            user.save((error, user) => {
              if (error) {
                res.status(400).json({ message: 'Something went wrong' });
              } else {
                res.status(200).json({ message: 'Login success', token });
              }
            });
          } else {
            res.status(401).json({ message: 'Unauthorized' });
          }
        });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    }
  });
}catch (error) {
  console.log(error)
  res.status(500).send({ message: "Internal Server Error" });
}
});

router.post('/register', (req, res) => {
  const { name,email, mobile, address, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error) {
      res.status(400).json({ message: 'Something went wrong' });
    } else {
      if (user) {
        res.status(400).json({ message: 'User already exists' });
      } else {
        const newUser = new User({
          name,
          email,
          mobile,
          address
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save((error, user) => {
              if (error) {
                res.status(400).json({ message: 'Something went wrong' });
              } else {
                res.status(200).json({ message: 'User registered successfully',
                newUser
              });
              }
            });
          });
        });
      }
    }
  });
});

//update
router.put('/update', async (req, res) => {
  const { name, email, mobile, address, token } = req.body;
  try {
    const decoded = await jwt.verify(token, 'secret');
    const user = await User.findOne({ email });
    if (user) {
      user.name = name;
      user.mobile = mobile;
      user.address = address;
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      res.status(200).json({ message: 'Profile updated successfully' }, user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Logout (delete token)
// Private
router.delete("/", authenticate, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.email, { token: "" });
    res.json({ msg: "Token deleted" });
  } catch (error) {
    console.erroror(error.message);
    res.status(500).send("Server Erroror");
  }
});
module.exports = router;