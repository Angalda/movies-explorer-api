const router = require('express').Router();

router.get('/', getMovies);
router.post('/', postMovies);
router.delete('/_id ', deleteMovies);
