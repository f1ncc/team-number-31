const express = require('express');
const hostelController = require('./../controllers/hostelController');
// const checkID = require('./../middleware/check_id');

const router = express.Router();

// router.param('id', checkID);

router
  .route('/')
  .get(hostelController.getAllhostels)
  .post(hostelController.createhostel);

router
  .route('/:id')
  .get(hostelController.gethostel)
  .patch(hostelController.updatehostel)
  .delete(hostelController.deletehostel);

module.exports = router;
