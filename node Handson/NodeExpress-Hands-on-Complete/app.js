var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Import Routers
var IndexRouter = require('./routes/');
//========= Task 1.2.1 Start ====================
var TaskRouter = require('./routes/tasks');
//========= Task 1.2.1 End ======================

var app = express();

//Set up mongoose connection

//Import the mongoose module
//========= Task 2.1 Start ====================
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB  = 'mongodb://localhost:27017/TaskDB'
mongoose.connect(mongoDB);
//========= Task 2.1 End ======================

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Mount Routers
app.use('/', IndexRouter);
//========= Task 1.2.2 Start ====================
app.use('/task', TaskRouter);
//========= Task 1.2.2 End ======================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
