import { take, cancel, fork, takeLatest, put, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from '../../utilities/constants';
import { ACTION1 } from './constants';
import { callAction12Action } from './actions';
import SampleApiService from './services';

function* doTest(action) {
    const result = yield call(SampleApiService.get, {
        test: 'Shivanand',
        page: '1',
    });
    console.log(result);
    yield put(callAction12Action());
}

function* testWatcher() {
    yield takeLatest(ACTION1, doTest);
}

export function* test() {
    const watcher = yield fork(testWatcher);

    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

export default [
    test,
];