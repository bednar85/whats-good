import React, { Component } from 'react';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';

import Counter from './components/Counter/Counter';
import FilterBar from './components/FilterBar/FilterBar';
import PlacesList from './components/PlacesList/PlacesList';

import store from './modules/store';

console.log(store);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Provider store={store}>
            <Counter />
            <FilterBar />
            <PlacesList />
          </Provider>
        </header>
      </div>
    );
  }
}

export default App;
