// eslint-disable-next-line no-unused-vars
import { takeEvery, call, put } from 'redux-saga/effects';

import { actions, types } from '.';

function getData() {
  return fetch('https://jsonplaceholder.typicode.com/posts').then(response =>
    response.json()
  );
}

function* loadDataWorker(action) {
  try {
    const payload = yield call(getData);
    yield put(actions.loadDataSuccess('mockUsers', payload));
  } catch (error) {
    yield put(actions.showError('mockUsers', error));
  }
}

export default function* rootSaga() {
  yield takeEvery(types.DATA_LOAD, loadDataWorker);
}
