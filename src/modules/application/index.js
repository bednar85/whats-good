// Action Types
const DATA_LOAD = 'application/DATA_LOAD';
const DATA_LOAD_SUCCESS = 'application/DATA_LOAD_SUCCESS';
const FILTERS_UPDATE = 'application/FILTERS_UPDATE';

// Actions
const loadData = key => ({
  type: DATA_LOAD,
  meta: {
    key,
    loaded: {
      [key]: false
    }
  }
});

const loadDataSuccess = (key, data) => ({
  type: DATA_LOAD_SUCCESS,
  meta: {
    loaded: {
      [key]: true
    }
  },
  payload: {
    [key]: data
  }
});

const updateFilters = payload => ({
  type: FILTERS_UPDATE,
  payload
});

export const actions = {
  loadData,
  loadDataSuccess,
  updateFilters
};

// Initial State
const initialState = {
  loaded: {
    places: false
  },
  data: {
    filters: {
      sortBy: 'Highest Rated',
      distance: 1.5,
      isOpenNow: false
    },
    places: []
  },
  errors: {
    places: {
      show: false,
      message: ''
    }
  }
};

// Reducers
const dataReducer = (state, action) => {
  switch (action.type) {
    case DATA_LOAD_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
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
    case DATA_LOAD:
      return {
        ...state,
        loaded: { ...state.loaded, ...action.meta.loaded }
      };
    case DATA_LOAD_SUCCESS:
      return {
        ...state,
        loaded: { ...state.loaded, ...action.meta.loaded },
        data: dataReducer(state.data, action)
      };
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
