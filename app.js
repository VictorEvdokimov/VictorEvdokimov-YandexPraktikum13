const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const users = require('./routes/users');
const cards = require('./routes/cards');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '5e53e92d177fb016f8de8201',
  };

  next();
});

app.use(users);
app.use(cards);

app.listen(3000);
