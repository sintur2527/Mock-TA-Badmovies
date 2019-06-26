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
      movies: [{ deway: 'movies' }],
      favorites: [{ deway: 'favorites' }],
      showFaves: false,
      currentGenre: 'Action',
    };

    // you might have to do something important here!
    this.setGenre = this.setGenre.bind(this);
    this.getMovies = this.getMovies.bind(this);
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies() {
    // make an axios request to your server on the GET SEARCH endpoint
    Axios.get('/search').then(({ data }) => {
      console.log('data', data);
      this.setState({
        movies: data,
      });
    });
  }

  saveMovie() {
    // same as above but do something diff
  }

  deleteMovie() {
    // same as above but do something diff
  }

  setGenre(event) {
    this.setState({
      currentGenre: event.target.value,
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
          />
          <Movies
            movies={
              this.state.showFaves ? this.state.favorites : this.state.movies
            }
            showFaves={this.state.showFaves}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
