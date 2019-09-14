import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import Counter from './components/Counter/Counter';
import FilterBar from './components/FilterBar/FilterBar';
import PlacesList from './components/PlacesList/PlacesList';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Counter />
        <FilterBar />
        <PlacesList />
      </div>
    );
  }
}

export default App;
