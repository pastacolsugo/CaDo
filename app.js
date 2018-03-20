var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require("helmet");

var index = require('./routes/index');
var users = require('./routes/users');
var contestSetup = require('./routes/contestSetup');
var utility = require('./routes/utility');
var login = require('./routes/login');
var api = require('./routes/api');


var app = express();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'cado';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/contestSetup', contestSetup);
app.use('/login', login);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// catch 403 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Forbidden');
    err.status = 403;
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

global.connReady = { "global": false, "local": false };//Flags that represent wether or not to accept the connections 
//Lines to implement DB connection
//
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    global.db = client.db(dbName);

    db.collection('users').find({ admin: true }).toArray().then(function (r) {
        if (r.length == 0) {
            console.log("Instance isn't configured");
        }
    });
});

module.exports = app;