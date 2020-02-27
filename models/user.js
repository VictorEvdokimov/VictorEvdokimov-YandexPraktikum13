const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\\.-]+)+[\w\-\\._~:/?#[\]@!\\$&'\\(\\)\\*\\+,;=.]+$/gm.test(v),
      message: (props) => `${props.value} is not a valid url!`,
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
