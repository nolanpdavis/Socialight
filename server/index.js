var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var assert = require('assert')
var sessions = require('client-sessions')
require('dotenv').config()

var index = require('../routes/index');
var api = require('../routes/api');
var account = require('../routes/account');

var app = express();


// Use connect method to connect to the Server

mongoose.connect('mongodb://localhost/socialight', function(err, res){
    if (err) {
        console.log('DB CONNECTION FAILED: '+err)
    }
    else {
        console.log('DB CONNECTION SUCCESSFUL')
    }
})


// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hjs');



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessions({
    cookieName: 'session',
    secret: process.env.SESSION_SECRET,
    duration: 1000*60*60*24,
    activeDuration: 30
}))
app.use('/static', express.static(path.join(__dirname, '../dist')));

app.use('/', index);
app.use('/api', api);
app.use('/account', account);

// run server
app.listen(3000, function () {
  console.log('Listening on port 3000!')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
