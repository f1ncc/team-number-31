const { Schema, model, Types } = require('mongoose');

const hostelSchema = new Schema({
  location: {
    type: String,
    required: true,
  },
  type: {
    //boys or girls
    type: String,
    required: true,
    enum: {
      values: ['boys', 'girls'],
    },
  },
  warden: {
    type: String,
    required: true,
  },
  floors: {
    //total no. of floors
    type: Number,
    required: true,
  },
  rooms: {
    //total rooms
    type: Number,
    required: true,
  },
  beds: {
    total: {
      type: Number,
      required: true,
    },
    occupied: {
      type: Number,
      required: true,
    },
    vacant: {
      type: Number,
      required: true,
    },
  },
  incharge: {
    type: Types.ObjectId,
    ref: 'Admin',
  },
  facilites: [String],
});
module.exports = model('Hostel', hostelSchema);
