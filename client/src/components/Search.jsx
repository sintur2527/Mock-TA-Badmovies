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
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
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

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

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
