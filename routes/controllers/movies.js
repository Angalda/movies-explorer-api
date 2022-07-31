const Movie = require('../models/movie');

// возвращает все фильмы
module.exports.getCards = (req, res, next) => {
  Movie.find({})
    .then((films) => res.status(200).send({ data: films }))
    .catch(next);
};

// создаёт фильм
module.exports.createFilm = (req, res, next) => {
  const owner = req.user._id;
  const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId
  } = req.body;
  return Film.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId  })
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
module.exports.deleteFilmId = (req, res, next) => {
  const userId = req.user._id;
  const { filmId } = req.params;
  Film.findById(filmId)
    .then((film) => {
      if (!film) {
        throw new NotFoundError('Не найдено');
      }

      if (userId !== card.owner.toString()) {
        throw new ForbiddenError('Доступ запрещен');
      } else {
        Film.findByIdAndRemove(filmId)
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