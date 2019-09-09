import React, { Component } from 'react';

import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import FilterBar from './FilterBar/FilterBar';
import PlacesList from './PlacesList/PlacesList';

import data from '../api/data';

export class App extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(filters) {
    console.log('');
    console.log('App - handleSubmit');
    console.log('  filters:', filters);
  }

  render() {
    return (
      <ErrorBoundary>
        <div className="app">
          <FilterBar handleSubmit={this.handleSubmit} />
          <PlacesList data={data} />
        </div>
      </ErrorBoundary>
    );
  }
};

export default App;
