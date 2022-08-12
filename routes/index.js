const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validationCreateUser, validationLogin } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use(() => {
  throw new NotFoundError('Не найдено');
});

module.exports = router;
