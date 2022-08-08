const router = require('express').Router();

const {
  getMovies, createMovie, deleteMovies,
} = require('../controllers/movies');

const { validationCreateMovie, validationMovieId } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', validationCreateMovie, createMovie);
router.delete('/:id', validationMovieId, deleteMovies);

module.exports = router;
