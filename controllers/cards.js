const mongoose = require('mongoose');
const Card = require('../models/card');

const { ObjectId } = mongoose.Types;

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const owner = req.user;
  const { name, link } = req.body;
  const newCard = { name, link, owner };
  const error = new Card(newCard).validateSync();
  if (error) {
    res.status(400).send({ message: `Ошибка валидации ${error}` });
  } else {
    Card.create(newCard)
      .then((card) => res.send({ data: card }))
      .catch((err) => res.status(500).send({ message: err.message }));
  }
};

module.exports.deleteCard = (req, res) => {
  if (!ObjectId.isValid(req.params.cardId)) {
    res.status(400).send({ message: 'Ошибка валидации' });
  } else {
    Card.findOneAndDelete({ _id: req.params.cardId, owner: req.user._id })
      .then((card) => {
        if (card) {
          res.send({ data: card });
        } else {
          res.status(404).send({ message: 'Карточка не найдена' });
        }
      })
      .catch((err) => res.status(500).send({ message: err.message }));
  }
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
).then((card) => {
  res.status(204).send();
})
.catch((err) => res.status(500).send({ message: err.message }));

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
).then((card) => {
  res.status(204).send();
})
.catch((err) => res.status(500).send({ message: err.message }));
