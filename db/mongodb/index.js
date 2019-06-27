const mongoose = require('mongoose');
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost:27017/badmovies', {
    useNewUrlParser: true,
  });
}

const db = mongoose.connection;

mongoose.Promise = Promise;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to db...');
});

let movieSchema = mongoose.Schema({
  title: String,
  poster: { type: String, unique: true },
  release: String,
  vote: String,
});

let Movie = mongoose.model('Movie', movieSchema);

let save = movie => {
  return Movie.create(movie);
};

let retrieve = () => {
  return Movie.find().exec();
};

let remove = movie => {
  return Movie.deleteOne(movie);
};

module.exports.db = db;
module.exports.save = save;
module.exports.retrieve = retrieve;
module.exports.remove = remove;
