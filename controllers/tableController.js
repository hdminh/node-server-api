const User = require('../models/userModel');
const base = require('./baseController');

exports.addTable = async (req, res, next) => {
    try {
        await User.create(
            {
                name: req.body.name,
                user: req.body.userId,
                wentWell: req.body.wentWell,
                toImprove: req.body.toImprove,
                actionItems: req.body.actionItems,
            }
            );

        res.status(204).json({
            status: 'success',
            data: null
        });


    } catch (error) {
        next(error);
    }
};

exports.getAllUsers = base.getAll(User);
exports.getUser = base.getOne(User);

// Don't update password on this 
exports.updateUser = base.updateOne(User);
exports.deleteUser = base.deleteOne(User);