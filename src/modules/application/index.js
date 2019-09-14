// Action Types
const COUNTER_INCREMENT = 'application/COUNTER_INCREMENT';
const COUNTER_DECREMENT = 'application/COUNTER_DECREMENT';

// Actions
const incrementCounter = () => ({
  type: COUNTER_INCREMENT
});

const decrementCounter = () => ({
  type: COUNTER_DECREMENT
});

export const actions = {
  incrementCounter,
  decrementCounter
};

// Initial State
const initialState = {
  count: 0
};

// Reducer
const counterReducer = (state = initialState, action) => {
  switch(action.type) {
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
