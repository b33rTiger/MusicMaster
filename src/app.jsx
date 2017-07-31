import React, { Component } from 'react';
import './app.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './profile';
import Gallery from './gallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    };
  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    var accessToken = 'BQABoUvRvMrGDvj8My1SrIGwQcJeeEYPs-PnLEKq-yG13i0_qdVieTf0I1ZK4THoqilY5Vb4t8Ww8MHAvXvtC-KGMxiYNEqanmkEfFm4rac350MO7FgBzTo5rBUr05O1EcZ9uPbmVtd-3mUbakn9EvwAC_CxL03MpeUa&refresh_token=AQBRXWGaBADLlXuqA-ojm3K9wwPBr9PMSN8J1RuU_GzhfvPkgrTsLCrcwFQvuyDdD8Is3oaRXr0MEq4kfrAk9MBwvs2GELtqdWQ1_ROowqePUGWEk_BuF4IuTvlLcf91_K4';
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

      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`

      fetch(FETCH_URL, myOptions)
        .then(response => response.json())
        .then(json => {
          const {tracks} = json;
          this.setState({tracks})
        })
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
        {
          this.state.artist !== null
          ?
            <div>
              <Profile
                artist={this.state.artist}
              />
              <Gallery
                tracks={this.state.tracks}
              />
            </div>
          : <div></div>
        }
      </div>
    )
  }
}

export default App;
