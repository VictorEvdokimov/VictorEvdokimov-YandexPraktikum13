const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(users);
app.use((req, res, next) => {
  req.user = {
    _id: '5e53e92d177fb016f8de8201',
  };

  next();
});

app.listen(3000);
