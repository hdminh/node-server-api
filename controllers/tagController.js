const User = require('../models/userModel');
const Table = require('../models/tagModel');
const base = require('./baseController');

exports.addTag = async (req, res, next) => {
    try {
        await Table.create(
            {
                board: req.body.table,
                column: req.body.column,
                content: req.body.content
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

exports.getTagByTable = async (req, res, next) => {
    try {
      const listTag = await Tag.find({board: req.params.id });
      res.status(200).json({ 
          total: listTag.length, 
          data: listTag });
    } catch (err) {
      next(err);
    }
  };
  
exports.getOne = base.getOne(Table);

exports.updateOne = base.updateOne(Table);
exports.deleteOne = base.deleteOne(Table);