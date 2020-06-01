const express = require('express');
const hostelerController = require('./../controllers/hostelerController');

const router = express.Router();

router
  .route('/')
  .get(hostelerController.getAllhostelers)
  .post(hostelerController.createhosteler);

router
  .route('/:id')
  .get(hostelerController.gethosteler)
  .patch(hostelerController.updatehosteler)
  .delete(hostelerController.deletehosteler);

module.exports = router;
