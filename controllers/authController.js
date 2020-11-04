const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel.js");
const AppError = require("../utils/appError.js");

const {
    promisify
} = require('util');

const createToken = id => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

//REGISTER ACCOUNT thought username password
exports.signup = async (req, res, next) => {

  //Check username
  const email = await User.findOne({ email: req.body.email });
  if (email) {
    return next(new AppError(401, 'fail', 'Email existed'), req, res, next);

  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  try {

  //Save user and return infor for client
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
    res.status(200).json({ 
        status: 'success',
        data: user.email });
  } catch (err) {
    next(err);
  }
};

//LOGIN throught username and password
exports.login = async (req, res,next) => {
  //Check username exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError(401, 'fail', 'Email existed'), req, res, next);
  }

  //Compare password
  const acceptLogin = await bcrypt.compare(req.body.password, user.password);
  if (!acceptLogin) {
    return next(new AppError(401, 'fail', 'Email or password is wrong'), req, res, next);
  }

  //Send token
  const token = createToken(user.id);
  res.header("auth-token", token);
  res.status(200).json({ 
      token: token,
       email: user.email });
};

//Check token of request
exports.protect = async (req, res, next) => {
      //Get token from header
  const token = req.header("auth-token");

  //Check client fill auth-token yet!
  if (!token) {
     return next(new AppError(403, 'fail', 'You are not logged in! Please login in to continue'), req, res, next);
  }

  try {
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) check if the user is exist (not deleted)
    const user = await User.findById(decode.id);
    if (!user) {
        return next(new AppError(401, 'fail', 'This user is no longer exist'), req, res, next);
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  };
}