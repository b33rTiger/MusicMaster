import React, { Component } from 'react';

class App extends Component {
  render () {
    return (
      <div>
        <div className="app-title">Music Master</div>
        <div>
          <input placeholder="search for an artist...."/>
          <button>Submit</button>
        </div>
        <div className="profile">
          <div>Artist Picture</div>
          <div>Artist Name</div>
        </div>
        <div className="gallery">
          Gallery
        </div>
      </div>
    )
  }
}

export default App;
