const Board = require("../models/boardModel.js");
const AppError = require("../utils/appError.js");   
const base = require('./baseController');

//Create board
exports.createBoard = async (req, res, next) => {
    try {
        //save data to database
        const board = await Board.create({
            title: req.body.title,
            user: req.user._id
        });

        res.status(201).json({
            status: 'success'
        });
    } catch (err) {
        next(err);
  }
};

exports.getListBoard = async (req, res, next) => {
    try {
      const listBoard = await Board.find({ user: req.user._id });
      res.status(200).json({ 
          total: listBoard.length, 
          data: listBoard 
        });
    } catch (err) {
      next(err);
    }
  };

exports.getOne = base.getOne(Board);

exports.updateOne = base.updateOne(Board);
exports.deleteOne = base.deleteOne(Board);