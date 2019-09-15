import React, { Component } from 'react';

import FilterBar from './components/FilterBar/FilterBar';
import PlacesList from './components/PlacesList/PlacesList';

class App extends Component {
  render() {
    return (
      <div className="app">
        <FilterBar />
        <PlacesList />
      </div>
    );
  }
}

export default App;
