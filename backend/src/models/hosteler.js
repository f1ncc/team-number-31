const { Schema, model, Types } = require('mongoose');
const { isEmail } = require('validator');

const hostelerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: [true, 'Provide your gender'],
    enum: {
      values: ['Female', 'Male'],
    },
  },
  email: {
    type: String,
    validate: [isEmail, 'please provide a valid email id'],
    required: true,
    unique: true,
  },
  mobileNo: {
    type: Number,
    required: true,
  },
  parentNo: {
    type: Number,
    required: true,
  },
  roomDetails: {
    roomNo: String, //room no . allocated
    bedNumber: Number, //bed no. allocated
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  collegeDetails: {
    Id: String, //college Id
    Name: String,
    branch: String,
    year: Number,
  },
  medication: {
    // if frequently suffering from any disease (optional)
    type: String,
  },
  hostel: {
    type: Types.ObjectId,
    ref: 'Hostel',
  },
  localGuardian: {
    // (optional)
    name: String,
    mobileNumber: Number,
  },
});

module.exports = model('Hosteler', hostelerSchema);
