const Hosteler = require('./../models/hosteler');
// const timestamp = require('../middleware/timestamp');

exports.getAllhostelers = async (req, res) => {
  try {
    const hostelers = await Hosteler.find();

    res.status(200).json({
      status: 'Success',
      requestedAt: req.timestamp,
      results: hostelers.length,
      data: {
        hostelers,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.gethosteler = async (req, res) => {
  try {
    const hosteler = await Hosteler.findById(req.params.id);

    res.status(200).json({
      status: 'Success',
      requestedAt: req.timestamp,
      data: {
        hosteler,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.createhosteler = async (req, res) => {
  try {
    const newhosteler = await Hosteler.create(req.body);

    res.status(201).json({
      status: 'Success',
      requestedAt: req.timestamp,
      // message: 'Success',
      data: {
        hosteler: newhosteler,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.updatehosteler = async (req, res) => {
  try {
    const updatedhosteler = await Hosteler.findByIdAndUpdate(
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
        updatedhosteler,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.deletehosteler = async (req, res) => {
  try {
    await Hosteler.findByIdAndDelete(req.params.id);

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
