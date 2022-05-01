var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var salariesRouter = require('./routes/salaries');
var entreprisesRouter = require('./routes/entreprises');

var app = express();
var cors = require("cors");
var mongoose = require('mongoose');
const salarie = require('./models/salarie');

// connexion en local
var dev_db_url = "mongodb+srv://dalilayazit:xZbTxlaNaAeMGqUH@cluster0.0auj9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// connexion en cloud si possible si non prend la conx local
// prcess.env : var d'environnement qui se trouve dans le cloud
var mongodb = process.env.MONGO_URI || dev_db_url;
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/salaries', salariesRouter);
app.use('/entreprises', entreprisesRouter);

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
