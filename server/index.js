const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');
const app = express();
const axios = require('axios');
// const { API_KEY } = require('../config/keys.js');

// Sign up and get your moviedb API key here:
// https://www.themoviedb.org/account/signup

//Helpers
// const apiHelpers = require('./helpers/apiHelpers.js');

//Middleware
app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));

//OPTION 1: Use regular routes
let api = '';
if (process.env.API_KEY) {
  api = process.env.API_KEY;
} else {
  api = require('../config/keys.js').API_KEY;
}

app.get('/genres', function(req, res) {
  // make an axios request to get the official list of genres from themoviedb

  // use this endpoint. you will need your API key from signup: https://api.themoviedb.org/3/genre/movie/list

  // send back
  axios
    .get('https://api.themoviedb.org/3/genre/movie/list', {
      params: {
        api_key: api,
      },
    })
    .then(({ data }) => {
      res.status(200).send(data.genres);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

app.get('/search', function(req, res) {
  // use this endpoint to search for movies by genres (using API key): https://api.themoviedb.org/3/discover/movie
  // and sort them by votes (worst first) using the search parameters in themoviedb API
  axios
    .get('https://api.themoviedb.org/3/discover/movie', {
      params: {
        api_key: api,
        sort_by: 'vote_average.asc',
      },
    })
    .then(({ data }) => {
      res.status(200).send(data.results);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

app.post('/save', function(req, res) {
  //save movie as favorite
});

app.post('/delete', function(req, res) {
  //remove movie from favorites
});

//OPTION 2: Use Express Router

//IF you decide to go with this option, delete OPTION 1 to continue

//Routes

// const movieRoutes = require('./routes/movieRoutes.js');

// //Use routes
// app.use('/movies', movieRoutes);

let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});
