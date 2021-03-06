'use strict';

const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 3000,
  passport = require('passport'),
  cors = require('cors'),
  Routes = require('./routes/routes');

const app = express();

app

  .use(cors())

  .use(passport.initialize())

  .set('port', port)

  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())


  .use(morgan('dev'))

  .use(Routes);


module.exports = app;