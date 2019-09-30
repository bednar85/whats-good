import { createSelector } from 'reselect';

const getData = state => {
  return state.data;
};

const getErrors = state => {
  return state.errors;
};

const getLoadedStatus = state => {
  return state.loaded;
};

const getFilters = createSelector(
  getData,
  data => {
    return data.filters;
  }
);

const getPlacesLoaded = createSelector(
  getLoadedStatus,
  loadedStatuses => {
    return loadedStatuses.places;
  }
);

const getPlacesError = createSelector(
  getErrors,
  errors => {
    return errors.places;
  }
);

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
  getPlacesError,
  getPlacesLoaded,
  getSearchQuery
};

export default selectors;
