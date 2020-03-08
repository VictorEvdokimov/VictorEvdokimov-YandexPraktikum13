const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const users = require('./routes/users');
const cards = require('./routes/cards');

const { login, createUser } = require('./controllers/auth');
const auth = require('./middlewares/auth');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use(users);
app.use(cards);

app.listen(3000);
