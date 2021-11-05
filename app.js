const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const passport = require("passport")
const session = require('express-session')

const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const cardRouter = require('./routes/card');

const app = express();


app.use(require('connect-flash')())
app.use(function (req , res , next) {
  res.locals.messages = require('express-messages')(req , res)
  next()
})

app.use(session({
  secret: 'secretApiKey',
  resave: true,
  saveUninitialized: true,
}))

mongoose.connect('mongodb+srv://Admin:XsrdSy5geCA1Ml2y@cluster0.yd8u7.mongodb.net/OtabekOlx');
const db = mongoose.connection
db.on('open' , () => {
  console.log(`MongoDb running`);
})
 
db.on('error' , (err) => {
  console.log(`MongoDb ERROR running` , err);
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/card/more' , express.static(path.join(__dirname, 'public')) )
app.use('/card/poster' , express.static(path.join(__dirname, 'public')) )
app.use('/card/userAllPoster' , express.static(path.join(__dirname, 'public')) )
require("./middleware/Passport")(passport)
app.use(passport.initialize());
app.use(passport.session());

app.get('*' , (req , res , next) => {
  res.locals.user = req.user || null
  next()
})

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/card', cardRouter);

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
