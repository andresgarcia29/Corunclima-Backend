'use strict';

const passport = require('passport'),
  passportJwt = require('passport-jwt'),
  ExtractJwt = passportJwt.ExtractJwt,
  JwtStrategy = passportJwt.Strategy,
  mongoose = require('mongoose'),
  User = require('../models/user.model'),
  jwtOptions = require('../config/jwtOptions');

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  User.findById(jwt_payload.user, (err, user) => {
    if (err) return (err, false)
    next(null, user)
  })
});

module.exports = strategy
