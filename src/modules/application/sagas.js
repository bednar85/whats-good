// eslint-disable-next-line no-unused-vars
import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { actions, types } from '.';

function getData(payload) {
  console.log('getData');
  console.log('  payload:', payload);

  const { latitude, longitude } = payload;

  axios
    .get(
      `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        },
        params: {
          categories: 'breakfast_brunch',
          latitude,
          longitude
        }
      }
    )
    .then(res => {
      console.log(res.data.businesses);
      // this.setState({ results: res.data.businesses, loading: false });
    })
    .catch(error => {
      console.log(error);
      // this.setState({
      //   errorState: `Sorry we coudln't find information related to the location you search, do you want to try something else?`,
      //   loading: false
      // });
    });

    return fetch('https://jsonplaceholder.typicode.com/posts').then(response =>
    response.json()
  );
}

function* loadDataWorker(action) {
  console.log('loadDataWorker');
  console.log('  action:', action);

  

  try {
    const payload = yield call(getData, action.payload);
    yield put(actions.loadDataSuccess('mockUsers', payload));
  } catch (error) {
    yield put(actions.showError('mockUsers', error));
  }
}

export default function* rootSaga() {
  yield takeEvery(types.DATA_LOAD, loadDataWorker);
}
