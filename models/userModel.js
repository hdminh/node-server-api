const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        min: 3,
        max: 30,
      },
      email: {
        type:String,
        required:true,
        unique:true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      },
      password: {
        type: String,
        required: true,
        min: 6,
        max: 128,
      },
      created: {
        type: Date,
        default: Date.now,
      },
    }
  );

module.exports = mongoose.model('users', userSchema);