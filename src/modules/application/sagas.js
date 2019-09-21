// eslint-disable-next-line no-unused-vars
import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { actions, types } from '.';
import { metersToMiles } from '../../utils';

function yelpBusinessSearch(location) {
  return axios.get(
    `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
      },
      params: {
        categories: 'coffee',
        ...location
      }
    }
  );
}

/**
 * I'm not able to get hours data on all of the results at once
 * I tried with an axios.all and got this error
 * Request failed with status code 429 (Too Many Requests)
 * I'll need to either do this call on a detail page
 * or integrate GraphQL to handle making requests that way
 */
// function yelpBusinessDetails(ids) {}

function* loadPlacesData(action) {
  const { latitude, longitude } = action.payload;
  const location = { latitude, longitude };

  try {
    const response = yield call(yelpBusinessSearch, location);

    const processedData = response.data.businesses.map(datum => ({
      ...datum,
      distance: metersToMiles(datum.distance)
    }));

    yield put(actions.loadDataSuccess('places', processedData));
  } catch (error) {
    yield put(actions.showError('places', error.message));
  }
}

// function* loadHoursData(action) {
//   yield* yelpBusinessDetails(action.payload);
// }

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
