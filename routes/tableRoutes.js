const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('./../controllers/authController');
const tableController = require('./../controllers/tableController')


// Protect all routes after this middleware
// router.use(authController.protect);

router
    .route('/')
    .get(tableController.getAllTable)
    .post(tableController.addTable);

router
    .route('/:id')
    .get(tableController.getTable)
    .patch(tableController.updateTable)
    .delete(tableController.deleteTable);

module.exports = router;