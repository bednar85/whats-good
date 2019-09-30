// eslint-disable-next-line no-unused-vars
import { takeEvery, call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import { actions, types } from '.';
import applicationSelectors from './selectors';
import { metersToMiles } from '../../utils';

function yelpBusinessSearch(params) {
  return axios.get(
    `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
      },
      params
    }
  );
}

function* loadPlacesData(action) {
  // extract data from the payload
  const { term, position } = action.payload;
  const { latitude, longitude } = position;

  // extract data from the store
  const filters = yield select(applicationSelectors.getFilters);
  const { isOpenNow } = filters;

  // form the search params
  const params = {
    term,
    latitude,
    longitude,
    open_now: isOpenNow
  };

  try {
    const response = yield call(yelpBusinessSearch, params);

    const processedData = response.data.businesses.map(datum => ({
      ...datum,
      distance: metersToMiles(datum.distance)
    }));

    yield put(actions.loadDataSuccess('places', processedData));
  } catch (error) {
    yield put(actions.showError('places', error.message));
  }
}

/**
 * if I need to handle loading data in different ways
 * split the logic here based on the key in action
 */
function* loadDataWorker(action) {
  yield* loadPlacesData(action);
}

export default function* rootSaga() {
  yield takeEvery(types.DATA_LOAD, loadDataWorker);
}
