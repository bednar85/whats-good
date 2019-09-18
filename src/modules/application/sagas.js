import { takeEvery, call, put } from 'redux-saga/effects';

function getData() {
  return fetch('https://jsonplaceholder.typicode.com/posts').then(response =>
    response.json()
  );
}

function* workerSaga() {
  try {
    const payload = yield call(getData);
    yield put({ type: 'DATA_LOADED', payload });
  } catch (e) {
    yield put({ type: 'API_ERRORED', payload: e });
  }
}

export default function* apiSaga() {
  yield takeEvery('DATA_REQUESTED', workerSaga);
}
