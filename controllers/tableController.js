const User = require('../models/userModel');
const Table = require('../models/tableModel');
const base = require('./baseController');

exports.addTable = async (req, res, next) => {
    try {
        await Table.create(
            {
                name: req.body.name,
                user: req.body.userId,
                wentWell: req.body.wentWell,
                toImprove: req.body.toImprove,
                actionItems: req.body.actionItems
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

exports.getAllTable = base.getAll(Table);
exports.getTable = base.getOne(Table);

// Don't update password on this 
exports.updateUser = base.updateOne(User);
exports.deleteUser = base.deleteOne(User);