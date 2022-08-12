const {
  dataMovies = 'mongodb://localhost:27017/bitfilmsdb',
  PORT = 3001,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  dataMovies, PORT, JWT_SECRET, NODE_ENV,
};
