import React from 'react';

import FilterBar from './components/FilterBar/FilterBar';
import PlacesList from './components/PlacesList/PlacesList';

function App() {
  return (
    <div className="app">
      <FilterBar />
      <PlacesList />
    </div>
  );
}

export default App;
