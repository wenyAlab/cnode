
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const topicsRouter = require('./topics.js');
const userRouter = require('./user.js');

app.use( bodyParser.json() );

// 解决node跨域问题
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use('/topics', topicsRouter);
app.use('/user', userRouter);

app.listen(3000)