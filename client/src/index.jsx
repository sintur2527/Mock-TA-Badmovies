import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx';
import Movies from './components/Movies.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
      currentGenre: 28,
    };

    this.setGenre = this.setGenre.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  componentDidMount() {
    this.getMovies(this.state.currentGenre);
  }

  getMovies(genre) {
    Axios.get(`/search/${genre}`)
      .then(({ data }) => {
        this.setState({
          movies: data,
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  saveMovie(event) {
    let movie = Object.assign({}, event.currentTarget.dataset);
    Axios.post('/save', movie).then(() => {
      console.log('success');
    });
  }

  deleteMovie() {
    // same as above but do something diff
  }

  setGenre(event) {
    let id = Number(event.target.value);
    this.setState({
      currentGenre: id,
    });
  }

  swapFavorites() {
    //dont touch
    this.setState({
      showFaves: !this.state.showFaves,
    });
  }

  render() {
    return (
      <div className="app">
        <header className="navbar">
          <h1>Bad Movies</h1>
        </header>

        <div className="main">
          <Search
            swapFavorites={this.swapFavorites}
            showFaves={this.state.showFaves}
            handleChange={this.setGenre}
            handleClick={() => {
              this.getMovies(this.state.currentGenre);
            }}
          />
          <Movies
            movies={
              this.state.showFaves ? this.state.favorites : this.state.movies
            }
            showFaves={this.state.showFaves}
            handleClick={this.saveMovie}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
