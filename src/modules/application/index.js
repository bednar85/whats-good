// Action Types
const COUNTER_INCREMENT = 'application/COUNTER_INCREMENT';
const COUNTER_DECREMENT = 'application/COUNTER_DECREMENT';
const FILTERS_UPDATE = 'application/FILTERS_UPDATE';

// Actions
const incrementCounter = () => ({
  type: COUNTER_INCREMENT
});

const decrementCounter = () => ({
  type: COUNTER_DECREMENT
});

const updateFilters = payload => ({
  type: FILTERS_UPDATE,
  payload
});

export const actions = {
  incrementCounter,
  decrementCounter,
  updateFilters
};

// Initial State
const initialState = {
  count: 0,
  filters: {
    sortBy: 'Highest Rated',
    distance: 1.5, 
    hours: 'Show All'
  }
};

// Reducer
const counterReducer = (state = initialState, action) => {
  switch(action.type) {
    case FILTERS_UPDATE:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    case COUNTER_INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };
    case COUNTER_DECREMENT:
      return {
        ...state,
        count: state.count - 1 < 0 ? 0 : state.count - 1
      };
    default:
      return state;
  }
};

export default counterReducer;
