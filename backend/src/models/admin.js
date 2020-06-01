const { Schema, model, Types } = require('mongoose');
const { isEmail } = require('validator');

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'please provide a valid email id'],
  },
  password: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: Number,
    required: true,
  },
  hostels: [
    //array of hostels
    {
      type: Types.ObjectId,
      ref: 'Hostel',
    },
  ],
  tokens: [
    {
      type: String,
    },
  ],
});

module.exports = model('Admin', adminSchema);
