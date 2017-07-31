import React, { Component } from 'react';
import './app.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './profile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null
    };
  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    var accessToken = 'BQAWPPoDisPYVM3uMumcfCUmylh5mSL85xE8R6-fDvbo-m4t13-RZsl9d0gRQMywdRpM9_UnHx_H5FtwF4Kg5pQclRJEheLXUGRdI-SbqQgld5rGNYdnJtgSwSMQL9j7H_7WCL7tFrvzpN01QGpHxwTp9aJaEOn6Wnvo&refresh_token=AQDKv4P02UKakeh2YXMrU-Aa5YcfPg15rkdYeM9nECk0B8hbD7Ag9qlVIDCiLlnQNmdUZ-hjz4c_pJcTEa1nFOS7qssMi-1Ly6FDmqY-DIDr3NHTGft7OQhVjCl2DR7mcYY';
    var myHeaders = new Headers();
    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };
    fetch(FETCH_URL, myOptions)
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      this.setState({artist});
      console.log('artist', artist);
    });
  }

  render () {
    return (
      <div className="app">
        <div className="app-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search()
                }
              }}
            />
          <InputGroup.Addon onClick={() => this.search()}>
            <Glyphicon glyph="search"></Glyphicon>
          </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <Profile
          artist={this.state.artist}
        />
        <div className="gallery">
          Gallery
        </div>
      </div>
    )
  }
}

export default App;
