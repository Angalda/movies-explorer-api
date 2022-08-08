const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

// возвращает все фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((films) => res.status(200).send({ data: films }))
    .catch(next);
};

// создаёт фильм
module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,

  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    // вернём записанные в базу данные
    .then((film) => res.send({ data: film }))
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные валидация'));
      } else { next(err); }
    });
};

// удаляет фильм по идентификатору
module.exports.deleteMovies = (req, res, next) => {
  const userId = req.user._id;
  const movieId = req.params;
  Movie.findById(movieId)
    .then((film) => {
      if (!film) {
        throw new NotFoundError('Не найдено');
      }

      if (userId !== film.owner.toString()) {
        throw new ForbiddenError('Доступ запрещен');
      } else {
        Movie.findByIdAndRemove(movieId)
          .then((result) => { res.send({ result }); })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные'));
      } else { next(err); }
    });
};
