import React, { Component } from 'react';

import FilterBar from './FilterBar/FilterBar';
import PlacesList from './PlacesList/PlacesList';

// move this to PlacesList
import initialData from '../api/data';

export class App extends Component {
  render() {
    return (
      <div className="app">
        <FilterBar />
        <PlacesList data={initialData} />
      </div>
    );
  }
};

export default App;
