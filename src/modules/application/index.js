// Action Types
const DATA_LOAD = 'application/DATA_LOAD';
const DATA_LOAD_SUCCESS = 'application/DATA_LOAD_SUCCESS';
const ERROR_HIDE = 'application/ERROR_HIDE';
const ERROR_SHOW = 'application/ERROR_SHOW';
const FILTERS_UPDATE = 'application/FILTERS_UPDATE';
const SEARCH_QUERY_UPDATE = 'application/SEARCH_QUERY_UPDATE';

export const types = {
  DATA_LOAD_SUCCESS,
  DATA_LOAD,
  ERROR_HIDE,
  ERROR_SHOW,
  FILTERS_UPDATE,
  SEARCH_QUERY_UPDATE
};

// Actions
const loadData = (key, payload) => ({
  type: DATA_LOAD,
  meta: {
    key,
    loaded: {
      [key]: false
    }
  },
  payload
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

const showError = (key, message = '') => ({
  type: ERROR_SHOW,
  payload: {
    [key]: {
      show: true,
      message
    }
  }
});

const hideError = key => ({
  type: ERROR_HIDE,
  payload: {
    [key]: {
      show: false
    }
  }
});

const updateFilters = payload => ({
  type: FILTERS_UPDATE,
  payload
});

const updateSearchTerm = payload => ({
  type: SEARCH_QUERY_UPDATE,
  payload
});

export const actions = {
  hideError,
  loadData,
  loadDataSuccess,
  showError,
  updateFilters,
  updateSearchTerm
};

// Initial State
const initialState = {
  loaded: {
    location: false,
    places: false
  },
  data: {
    filters: {
      sortBy: 'Highest Rated',
      maxDistance: 1.5,
      isOpenNow: false
    },
    location: {},
    places: [],
    searchTerm: ''
  },
  errors: {
    location: {
      show: false
    },
    places: {
      show: false
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
    case SEARCH_QUERY_UPDATE:
      return {
        ...state,
        searchTerm: action.payload,
        places: initialState.data.places
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
    case ERROR_SHOW:
    case ERROR_HIDE:
      return {
        ...state,
        errors: { ...state.errors, ...action.payload }
      };
    case FILTERS_UPDATE:
      return {
        ...state,
        data: dataReducer(state.data, action)
      };
    case SEARCH_QUERY_UPDATE:
      // when the search query is updated reset loaded.places and error.places
      return {
        ...state,
        loaded: { ...state.loaded, places: initialState.loaded.places },
        data: dataReducer(state.data, action),
        errors: { ...state.errors, places: initialState.errors.places }
      };
    default:
      return state;
  }
};

export default rootReducer;
