import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import Counter from './components/Counter/Counter';
import FilterBar from './components/FilterBar/FilterBar';
import PlacesList from './components/PlacesList/PlacesList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Counter />
          <FilterBar />
          <PlacesList />
        </header>
      </div>
    );
  }
}

export default App;
