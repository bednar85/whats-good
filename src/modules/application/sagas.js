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

// function yelpBusinessDetails(ids) {
//   console.log('businessIds:', businessIds);
// }

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

function* loadHoursData(action) {
  console.log('loadHoursData was called');
  console.log('  action:', action);
}

// in this loadData worker we'll split the logic based on the key
function* loadDataWorker(action) {
  const { key } = action.meta;

  if (key === 'places') {
    yield* loadPlacesData(action);
  } else if (key === 'hours') {
    yield* loadHoursData(action);
  }
}

export default function* rootSaga() {
  yield takeEvery(types.DATA_LOAD, loadDataWorker);
}
