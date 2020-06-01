const { sign } = require('jsonwebtoken');
// const mongoose = require('mongoose');
const { hash, compare } = require('bcrypt');
const AdminModel = require('../models/admin');
// const authMiddleware = require('../middleware/checkAuthToken');

const generateAuthToken = async (user) => {
  try {
    const token = await sign(user, process.env.JWT_SECRET);
    return token;
  } catch (err) {
    console.log('generate auth function', err);
  }
};
exports.signupAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailAlreadyExist = await AdminModel.findOne({ email });

    if (emailAlreadyExist) {
      throw new Error({
        msg: 'An account with this email has already been created',
      });
    }

    const hashedPassword = await hash(password, 12);
    const user = await AdminModel({
      ...req.body,
      tokens: [],
      password: hashedPassword,
    });
    const token = await generateAuthToken({ user });
    user.tokens = user.tokens.concat(token);
    await user.save();

    res.status(200).json({
      status: 'success',
      requestedAt: req.timestamp,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(401).send({
      status: 'fail',
      message: err,
    });
  }
};

/***
 * log in user
 */
exports.AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AdminModel.findOne({ email });
    if (!user) {
      throw new Error('Email doesnot Exist');
    }
    const passwordIsCorrect = await compare(password, user.password);
    if (!passwordIsCorrect) {
      throw new Error('invalid credentials');
    }
    const token = await generateAuthToken({ user });
    const tokenArray = user.tokens;

    user.tokens = tokenArray.concat(token);

    user.save();
    res.status(200).json({
      status: 'success',
      requestedAt: req.timestamp,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: err,
    });
  }
};

/**
 * logout user
 */
exports.AdminSignout = async (req, res) => {
  try {
    const user = await AdminModel.findById(req.user._id);
    console.log(user);
    user.tokens = [];
    user.save();
    res.status(200).json({
      status: 'success',
      requestedAt: req.timestamp,
      data: null,
    });
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: err,
    });
  }
};

/**
 * editing the details of admin
 */
exports.AdminUpdate = async (req, res) => {
  try {
    const user = await AdminModel.findByIdAndUpdate(
      { _id: req.user._id },
      req.body
    );
    const updatedUser = await user.save();
    res.status(200).send({
      message: 'success',
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);
  }
};
/**
 * only for testing and debugging
 * hence in development mode
 */
if (process.env.NODE_ENV === 'development') {
  exports.getAllAdmins = async (req, res) => {
    try {
      const admins = await AdminModel.find();

      res.status(200).json({
        status: 'success',
        requestedAt: req.timestamp,
        results: admins.length,
        data: {
          admins,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err,
      });
    }
  };
}
