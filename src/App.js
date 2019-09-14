import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';

import Counter from './components/Counter/Counter';
import FilterBar from './components/FilterBar/FilterBar';
import PlacesList from './components/PlacesList/PlacesList';

const initialState = {
  count: 0
}

const counterReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1 < 0 ? 0 : state.count - 1
      };
    default:
      return state;
  }
}

const store = createStore(counterReducer);

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
