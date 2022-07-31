const mongoose = require('mongoose');

const validateUrl = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration : {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description : {
    type: String,
    required: true,
  },
  image : {
    type: String,
    validate: {
      validator: (v) => validateUrl.test(v),
    },
    required: true,
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (v) => validateUrl.test(v),
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (v) => validateUrl.test(v),
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },

})

module.exports = mongoose.model('movie', movieSchema);
