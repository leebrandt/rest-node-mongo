import createError from "http-errors";
import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
const mongoose = require('mongoose');

import indexRouter from "./routes/index";
import speakersRouter from "./routes/speakers";

const app = express();

// mongoose setup
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kcdc');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});
mongoose.Promise = global.Promise;

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/speakers', speakersRouter)

// catch 404 and forward to error handler
app.use(function(next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error
  res.status(err.status || 500).send(err);
});

export default app;
