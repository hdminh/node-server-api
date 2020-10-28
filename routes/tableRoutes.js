const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('./../controllers/authController');
const tableController = require('./../controllers/tableController')


router.post('/add', tableController.addTable);

// Protect all routes after this middleware
router.use(authController.protect);

router.delete('/deleteMe', userController.deleteMe);

router
    .route('/')
    .get(userController.getAllUsers);


router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;