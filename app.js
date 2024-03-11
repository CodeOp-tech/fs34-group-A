var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');//
var gamesRouter = require('./routes/games');
var participationRouter = require('./routes/participation');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('api/users', usersRouter);
app.use('/api/games', gamesRouter);
app.use('/api/participation', participationRouter);

module.exports = app;
