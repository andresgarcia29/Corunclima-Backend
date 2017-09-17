'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  username: { type: String, trim: true, unique: true, required: true},
  password: { type: String, required: true },
  extraInfo: {
    name : String,
    email : { type: String, trim: true },
  },
  createDate: { type: Date, default: Date.now() },
  lastUpdate: { type: Date, default: Date.now() },
  image: { type: String }
});

UserSchema.pre('save', function (next) {
  let salt = bcrypt.genSaltSync(10)
  let hash = bcrypt.hashSync(this.password, salt)
  this.password = hash
  next()
})

UserSchema.pre('update', function (next) {
  if (!this.isNew) {
    this.lastUpdate = Date.now();
    return next();
  } else {
    next();
  }
})


module.exports = mongoose.model('User', UserSchema);