const express = require('express');
const authController = require('../controllers/authController');
const boardController = require('../controllers/boardController')

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router
    .route('/')
    .get(boardController.getListBoard)
    .post(boardController.createBoard);

router
    .route('/:id')
    .get(boardController.getOne)
    .delete(boardController.deleteOne);

module.exports = router;