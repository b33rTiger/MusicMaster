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
    var accessToken = 'BQBgy-gnfPOLCgnjB86AEtoj-W704PvMNiVKGcfBkQ2jeGBTgbiO1ZSreud0tioh4A_r1DR8ux0-LXlP9MNIojpoLZ3JGeGEfLTKuzJL9ZlNfZcT0v3zcBKFjExnBsUEjD_wT-a44ixNSlTTl2Tyki78eXKQe1quAJ2H&refresh_token=AQA-n5ClglierbHyGVc54iMe9H5RzyktQRGap8rLomUIo2IiT2z_0xBcZYQVaN64_CTXo3H8x4PAJj54sr_0ju4NEMCA_ZwDg9XVZtzCBTDU83jbXulqtrelpTelRwcLXv4';
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
