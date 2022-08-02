const router = require('express').Router();

const {
  getMovies, postMovies, deleteMovies,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', postMovies);
router.delete('/_id ', deleteMovies);

module.exports = router;
