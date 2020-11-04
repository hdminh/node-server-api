const express = require('express');
const authController = require('./../controllers/authController');
const tagController = require('./../controllers/tagController')

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router
    .route('/')
    .post(tagController.addTag);

router
    .route('/:id')
    .get(tagController.getTagByTable)
    .put(tagController.updateOne)
    .delete(tagController.deleteOne);

module.exports = router;