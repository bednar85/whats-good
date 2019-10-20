// eslint-disable-next-line no-unused-vars
import { call, put, select, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { actions, types } from 'modules/application';
import applicationSelectors from 'modules/application/selectors';
import { metersToMiles } from 'utils';

function yelpBusinessSearch(params) {
  return axios.get(
    `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
      },
      params
    }
  );
}

function googleMapsReverseGeocode(params) {
  const { latitude, longitude } = params;

  return axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
  );
}

function* loadPlacesData(action) {
  // extract data from the payload
  const { term } = action.payload;
  const { latitude, longitude } = yield select(
    applicationSelectors.getCoordinates
  );

  // extract data from the store
  const filters = yield select(applicationSelectors.getFilters);
  const { isOpenNow } = filters;

  // form the search params
  /* eslint-disable camelcase */
  const params = {
    term,
    latitude,
    longitude,
    open_now: isOpenNow
  };
  /* eslint-enable camelcase */

  try {
    const response = yield call(yelpBusinessSearch, params);

    const placesData = response.data.businesses.map(datum => ({
      ...datum,
      reviewCount: datum.review_count,
      distance: metersToMiles(datum.distance)
    }));

    yield put(actions.loadDataSuccess('places', placesData));
  } catch (error) {
    yield put(actions.showError('places', error.message));
  }
}

function* loadLocationData(action) {
  const { latitude, longitude } = action.payload;

  try {
    const googleResponse = yield call(googleMapsReverseGeocode, {
      latitude,
      longitude
    });

    const [neighborhoodResult] = googleResponse.data.results.filter(result =>
      result.types.includes('neighborhood')
    );
    const neighborhood = neighborhoodResult.address_components[0].long_name;
    const city = neighborhoodResult.address_components[1].long_name;

    const locationData = {
      coordinates: {
        latitude,
        longitude
      },
      neighborhood,
      city
    };

    yield put(actions.loadDataSuccess('location', locationData));
  } catch (error) {
    yield put(actions.showError('location', error.message));
  }
}

// Workers
function* loadDataWorker(action) {
  const { key: actionKey } = action.meta;

  if (actionKey === 'places') {
    yield* loadPlacesData(action);
  } else if (actionKey === 'location') {
    yield* loadLocationData(action);
  }
}

// Sagas
export default function* rootSaga() {
  yield takeEvery(types.DATA_LOAD, loadDataWorker);
}
