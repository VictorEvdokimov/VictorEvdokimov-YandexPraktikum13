const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/user');

const key = config.get('key');
const timeactivityPeriod = config.get('period');

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  const newUser = {
    name,
    about,
    avatar,
    email,
    password,
  };
  const error = new User(newUser).validateSync();
  if (error) {
    res.status(400).send({ message: 'Ошибка валидации' });
  } else {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }))
      .then((cratedUser) => User.findById(cratedUser._id))
      .then((user) => res.send({ data: user }))
      .catch((err) => res.status(500).send({ message: err.message }));
  }
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, key, { expiresIn: timeactivityPeriod });
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};
