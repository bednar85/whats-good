// eslint-disable-next-line no-unused-vars
import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { actions, types } from '.';

function getYelpData(location) {
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

function* loadDataWorker(action) {
  const { latitude, longitude } = action.payload;
  const location = { latitude, longitude };

  try {
    const response = yield call(getYelpData, location);
    yield put(actions.loadDataSuccess('places', response.data.businesses));
  } catch (error) {
    yield put(actions.showError('places', error));
  }
}

export default function* rootSaga() {
  yield takeEvery(types.DATA_LOAD, loadDataWorker);
}
