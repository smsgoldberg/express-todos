const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Mount middle ware into the middleware/request pipeline
//app.use([starts with path], <middleware fn> [, <middleware fn>])

// add middleware below the above line of code
app.use(function(req, res, next) {
  console.log('Hello SEI!');
  // Add a time property to the res.locals object
  // The time property will then be accessible when rendering a view
  res.locals.time = new Date().toLocaleTimeString();
  next();  // Pass the request to the next middleware
});

//log in the terminal the HTTP request info
app.use(logger('dev'));
//processes data sent in the body of the request if it's json data
app.use(express.json());
//Processes data sent in 'form' body of the request
//creates a property on req.body for each <input>, <select> or <textarea>
//in the <form>
app.use(express.urlencoded({ extended: false }));
//Add a cookies property for each cookie sent in the request 
app.use(cookieParser());
//If the request is for a static asset, returns the file
app.use(express.static(path.join(__dirname, 'public')));

//The first arg is the "starts with" path
//The paths within the route modules are appended
//to the starts with paths
app.use('/', indexRouter);
app.use('/todos', todosRouter);

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
