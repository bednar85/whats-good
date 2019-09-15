// Action Types
const FILTERS_UPDATE = 'application/FILTERS_UPDATE';

// Actions
const updateFilters = payload => ({
  type: FILTERS_UPDATE,
  payload
});

export const actions = {
  updateFilters
};

// Initial State
const initialState = {
  filters: {
    sortBy: 'Highest Rated',
    distance: 1.5,
    isOpenNow: false
  }
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTERS_UPDATE:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default reducer;
