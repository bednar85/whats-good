import { createSelector } from 'reselect';

const getData = state => {
  return state.data;
};

const getErrors = state => {
  return state.errors;
};

const getFilters = createSelector(
  getData,
  data => {
    return data.filters;
  }
);

const getLoadedStatus = state => {
  return state.loaded;
};

const getPlaces = createSelector(
  getData,
  data => {
    return data.places;
  }
);

const getSearchQuery = createSelector(
  getData,
  data => {
    return data.searchQuery;
  }
);

const selectors = {
  getData,
  getErrors,
  getFilters,
  getLoadedStatus,
  getPlaces,
  getSearchQuery
};

export default selectors;
