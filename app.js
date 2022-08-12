var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');

var app = express();

dbConnect().catch(err => console.log(err));

async function dbConnect() {
  await mongoose.connect('mongodb+srv://andrii:efEaQeofIm2fcl4d@cluster0.v3c0ect.mongodb.net/?retryWrites=true&w=majority');
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.sendStatus(err.status || 500);
});

module.exports = app;
