// eslint-disable-next-line no-unused-vars
import { call, put, select, takeEvery } from 'redux-saga/effects';

import { actions, types } from 'modules/application';
import applicationSelectors from 'modules/application/selectors';
import { metersToMiles } from 'utils';

/* eslint-disable camelcase */
function yelpBusinessSearch(params) {
  const { term, latitude, longitude, open_now } = params;

  const openNowParam = open_now ? `&open-now=${open_now}` : '';

  return fetch(
    `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?$term=${term}&latitude=${latitude}&longitude=${longitude}${openNowParam}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
      }
    }
  ).then(response => response.json());
}
/* eslint-enable camelcase */

function googleMapsReverseGeocode(params) {
  const { latitude, longitude } = params;

  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
  ).then(response => response.json());
}

function* loadPlacesData(action) {
  // extract data from the payload
  const { term } = action.payload;
  // replace spaces with + so it is safe for using in the fetch url
  const querySafeTerm = term.replace(/\s/g, '+');

  const coordinates = yield select(applicationSelectors.getCoordinates);
  const { latitude, longitude } = coordinates;

  // extract data from the store
  const filters = yield select(applicationSelectors.getFilters);
  const { isOpenNow } = filters;

  // form the search params
  /* eslint-disable camelcase */
  const params = {
    term: querySafeTerm,
    latitude,
    longitude,
    open_now: isOpenNow
  };
  /* eslint-enable camelcase */

  try {
    const { businesses } = yield call(yelpBusinessSearch, params);

    const placesData = businesses.map(datum => ({
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
    const { results } = yield call(googleMapsReverseGeocode, {
      latitude,
      longitude
    });

    const [neighborhoodResult] = results.filter(result =>
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
