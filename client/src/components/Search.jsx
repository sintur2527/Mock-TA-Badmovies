import React from 'react';
import Axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
    };
    this.getGenres = this.getGenres.bind(this);
  }

  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    Axios.get('/genres').then(({ data }) => {
      this.setState({
        genres: data,
      });
    });
  }

  render() {
    return (
      <div className="search">
        <button
          onClick={() => {
            this.props.swapFavorites();
          }}>
          {this.props.showFaves ? 'Show Results' : 'Show Favorites'}
        </button>
        <br />
        <br />

        <select
          value={this.props.currentGenre}
          onChange={this.props.handleChange}>
          {this.state.genres.map(genre => (
            <option value={genre.id} key={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <br />
        <br />

        <button onClick={this.props.handleClick}>Search</button>
      </div>
    );
  }
}

export default Search;
