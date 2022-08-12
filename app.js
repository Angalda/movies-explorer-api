require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');

const { limiter } = ('./ratelimiter');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { dataMovies, PORT } = require('./utils/config');

const app = express();

const options = {
  origin: [
    'http://localhost:3000',
    'http://movies.angalda.nomoredomains.sbs',
    'https://movies.angalda.nomoredomains.sbs',
    'http://api.movies.angalda.nomoredomains.sbs',
    'https://api.movies.angalda.nomoredomains.sbs',
  ],
  credentials: true,
};

app.use(helmet());

app.use('*', cors(options));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// подключаемся к серверу mongo
mongoose.connect(dataMovies, {
});

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(limiter);
app.use(router);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate

// наш централизованный обработчик
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});
app.listen(PORT);
