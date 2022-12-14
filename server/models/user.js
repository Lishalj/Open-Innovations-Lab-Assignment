const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");

// User Model
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  }
});

const User = mongoose.model('user', UserSchema);

const validate = (data) => {
	const schema = Joi.object({
		fullName: Joi.string().required().label("Full Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		mobile: Joi.number().required().label("Mobile Number"),
		address: Joi.string().required().label("Address"),
	});
	return schema.validate(data);
};


module.exports = {User, validate};