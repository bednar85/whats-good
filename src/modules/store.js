import { createStore } from 'redux';

import counterReducer from './application';

const store = createStore(counterReducer);

export default store;