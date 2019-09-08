import React from 'react';

import FilterBar from './FilterBar/FilterBar';
import PlacesList from './PlacesList/PlacesList';

import data from '../api/data';

const App = () => {
  return (
    <div className="app">
      <FilterBar />
      <PlacesList data={data} />
    </div>
  );
};

export default App;
