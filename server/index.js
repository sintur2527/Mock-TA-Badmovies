const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');
const app = express();
const axios = require('axios');
const { save, retrieve, remove } = require('../db/mongodb');

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

app.get('/search/:id', function(req, res) {
  const { id } = req.params;

  axios
    .get('https://api.themoviedb.org/3/discover/movie', {
      params: {
        api_key: api,
        sort_by: 'vote_average.asc',
        with_genres: id,
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
  console.log('req', req.body);
  save(req.body).catch(err => {
    res.sendStatus(500);
  });
});

app.post('/delete', function(req, res) {
  //remove movie from favorites
  remove(req.body).catch(err => {
    res.sendStatus(500);
  });
});

app.get('/faves', function(req, res) {
  retrieve()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.sendStatus(500);
    });
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
