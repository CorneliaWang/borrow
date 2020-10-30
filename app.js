/**
 * creat by WangJiexin on 2020/10/28
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var apisRouter = require('./routes/apis');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

require('./config/passport')(passport);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/public/',express.static(path.join(__dirname, 'public')));
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.use(session({
    secret: 'assetManagement',
    cookie: {maxAge: 12*60*60*1000},
    rolling: true,
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/apis')(app,passport)
//.use('/', indexRouter);
//app.use('/', apisRouter);
app.use('/',indexRouter)
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
app.listen(5000, function () {
    console.log('running...')
})

module.exports = app;
