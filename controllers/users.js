const mongoose = require('mongoose');
const User = require('../models/user');

const { ObjectId } = mongoose.Types;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUsersId = (req, res) => {
  if (!ObjectId.isValid(req.params.userId)) {
    res.status(400).send({ message: 'Ошибка валидации' });
  } else {
    User.findOne({ _id: req.params.userId })
      .then((user) => {
        if (user) {
          res.send({ data: user });
        } else {
          res.status(404).send({ message: 'Пользователь не найден' });
        }
      })
      .catch((err) => res.status(500).send({ message: err.message }));
  }
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  const newUser = { name, about, avatar };
  const error = new User(newUser).validateSync();
  if (error) {
    res.status(400).send({ message: 'Ошибка валидации' });
  } else {
    User.create({ name, about, avatar })
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
};
