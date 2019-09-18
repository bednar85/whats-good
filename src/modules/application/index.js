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
  loaded: {},
  data: {
    filters: {
      sortBy: 'Highest Rated',
      distance: 1.5,
      isOpenNow: false
    }
  },
  errors: {}
};

// Reducers
const dataReducer = (state, action) => {
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

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTERS_UPDATE:
      return {
        ...state,
        data: dataReducer(state.data, action)
      };
    default:
      return state;
  }
};

export default rootReducer;
