
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const topicsRouter = require('./topics.js');
const userRouter = require('./user.js');


app.use( bodyParser.json() );

app.use('/topics', topicsRouter);
app.use('/user', userRouter);

app.listen(3000)