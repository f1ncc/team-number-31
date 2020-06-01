const Hostel = require('./../models/hostel');
// const timestamp = require('../middleware/timestamp');

exports.getAllhostels = async (req, res) => {
  try {
    const hostels = await Hostel.find();

    res.status(200).json({
      status: 'Success',
      requestedAt: req.timestamp,
      results: hostels.length,
      data: {
        hostels,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.gethostel = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);

    res.status(200).json({
      status: 'Success',
      requestedAt: req.timestamp,
      data: {
        hostel,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.createhostel = async (req, res) => {
  try {
    const newHostel = await Hostel.create(req.body);

    res.status(201).json({
      status: 'Success',
      requestedAt: req.timestamp,
      // message: 'Success',
      data: {
        hostel: newHostel,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.updatehostel = async (req, res) => {
  try {
    const updatedHostel = await Hostel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'Success',
      requestedAt: req.timestamp,
      data: {
        updatedHostel,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.deletehostel = async (req, res) => {
  try {
    await Hostel.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'Success',
      requestedAt: req.timestamp,
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
